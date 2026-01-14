from fastapi import APIRouter
from core.database import modules_collection, topics_collection, snippets_collection

router = APIRouter(prefix="/api")

@router.get("/modules")
def get_modules():
    # Deprecated or use get_roadmap logic
    modules = []
    for m in modules_collection.find():
        m["_id"] = str(m["_id"])
        modules.append(m)
    return modules

@router.get("/modules/{module_id}/topics")
def get_topics(module_id: str):
    # Deprecated
    topics = []
    for t in topics_collection.find({"module_id": module_id}):
        t["_id"] = str(t["_id"])
        topics.append(t)
    return topics

@router.get("/topic/{slug}")
def get_topic_default_code(slug: str, module: str | None = None):
    # 1. Try Exact Match by _id (The primary method now)
    snippet = snippets_collection.find_one({"_id": slug})
    
    if snippet:
        editor = snippet.get("editor", {})
        return {
            "id": snippet.get("_id"),
            "language": snippet.get("language"),
            "title": (snippet.get("lesson", {}) or {}).get("title"),
            "description": (snippet.get("lesson", {}) or {}).get("title"), # fallback
            "code": editor.get("defaultCode", ""),
        }

    # 2. Fallback: Fuzzy Logic (Legacy support or flexible URLs)
    tokens = [t for t in slug.split("-") if t]
    synonyms = {"function": "statement"}
    and_clauses = []
    for t in tokens:
        alts = [t]
        if t in synonyms:
            alts.append(synonyms[t])
        or_fields = []
        for a in alts:
            rx = {"$regex": a, "$options": "i"}
            or_fields.extend([
                {"lesson.title": rx},
                {"lesson.filename": rx},
                {"_id": rx},
            ])
        and_clauses.append({"$or": or_fields})

    query = {"$and": and_clauses} if and_clauses else {}
    if module:
        mr = {"$regex": module, "$options": "i"}
        query = {"$and": [{"$or": [{"module.slug": module}, {"module.title": mr}]}, query]}

    snippet = snippets_collection.find_one(query)
    if snippet:
        editor = snippet.get("editor", {})
        return {
            "id": snippet.get("_id"),
            "language": snippet.get("language"),
            "title": (snippet.get("lesson", {}) or {}).get("title"),
             "description": (snippet.get("lesson", {}) or {}).get("title"), # fallback
            "code": editor.get("defaultCode", ""),
        }

    return {"error": "Topic not found"}

@router.get("/roadmap")
def get_roadmap():
    modules = {}
    # Fetch snippets to build the tree.
    # Note: Sorting by module.order and lesson.order would be good here.
    snippets = snippets_collection.find({}, {
        "module": 1, 
        "lesson": 1, 
        "_id": 1
    }).sort([("module.order", 1), ("lesson.order", 1)])

    for s in snippets:
        m = s.get("module", {}) or {}
        l = s.get("lesson", {}) or {}
        
        mslug = m.get("slug") or (m.get("title") or "module").lower().replace(" ", "-")
        mtitle = m.get("title") or mslug
        
        # Use _id as the topic slug/id for navigation
        tslug = s.get("_id")
        ttitle = l.get("title") or tslug

        if mslug not in modules:
            modules[mslug] = {
                "id": mslug, # Frontend uses id/slug
                "title": mtitle, 
                "topics": []
            }
        
        modules[mslug]["topics"].append({
            "id": tslug, # This MUST match what's passed to /topic/{id}
            "title": ttitle
        })
    
    return list(modules.values()) # Return array directly, or object {"modules": ...} depending on frontend

@router.get("/search")
def search(q: str):
    rx = {"$regex": q, "$options": "i"}
    results = {"modules": set(), "topics": []}
    for s in snippets_collection.find({"$or": [{"module.title": rx}, {"module.slug": rx}, {"lesson.title": rx}, {"lesson.filename": rx}, {"_id": rx}]}, {"module": 1, "lesson": 1, "_id": 1}):
        m = s.get("module", {}) or {}
        l = s.get("lesson", {}) or {}
        mslug = m.get("slug") or (m.get("title") or "module").lower().replace(" ", "-")
        mtitle = m.get("title") or mslug
        ttitle = l.get("title") or s.get("_id")
        tslug = s.get("_id") # Use ID
        
        results["modules"].add((mslug, mtitle))
        results["topics"].append({"title": ttitle, "slug": tslug, "module": {"slug": mslug, "title": mtitle}})
    
    return {
        "modules": [{"slug": slug, "title": title} for slug, title in results["modules"]],
        "topics": results["topics"],
    }
