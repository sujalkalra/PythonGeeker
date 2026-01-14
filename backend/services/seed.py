from core.database import modules_collection, topics_collection, snippets_collection

def seed():
    # Clear existing data to ensure fresh seed matches our structure
    # NOTE: In a real production environment, be careful not to wipe user data!
    # For this development task, we are aligning the DB with the user's requested structure.
    modules_collection.delete_many({})
    topics_collection.delete_many({})
    snippets_collection.delete_many({})
    
    print("Cleared existing data")

    # Sample Data matching frontend's SAMPLE_MODULES but formatted to User's Schema
    # User Schema:
    # {
    #   "_id": "python_01_basics_01_print",
    #   "language": "python",
    #   "level": "beginner",
    #   "module": { "order": 1, "slug": "01_basics", "title": "Basics" },
    #   "lesson": { "order": 1, "filename": "01_print.py", "title": "Print Statement" },
    #   "editor": { "defaultCode": "...", "readonly": false }
    # }

    modules_data = [
      {
        "slug": "01_basics",
        "title": "Python Basics",
        "order": 1,
        "topics": [
          {
            "id": "python_01_basics_01_print",
            "title": "Print & Variables",
            "filename": "01_print.py",
            "order": 1,
            "defaultCode": "print('Hello, PythonGeeker!')\n\nname = 'Python'\nprint(f'I am learning {name}')",
          },
          {
            "id": "python_01_basics_02_datatypes",
            "title": "Data Types",
            "filename": "02_datatypes.py",
            "order": 2,
            "defaultCode": "x = 10\ny = 3.14\nz = 'Hello'\n\nprint(type(x))\nprint(type(y))\nprint(type(z))",
          },
          {
            "id": "python_01_basics_03_input",
            "title": "Input / Output",
            "filename": "03_input.py",
            "order": 3,
            "defaultCode": "# Note: In this sandbox, input() might be simulated or limited.\nname = 'Developer'\nprint(f'Hello, {name}!')",
          },
          {
            "id": "python_01_basics_04_comments",
            "title": "Comments",
            "filename": "04_comments.py",
            "order": 4,
            "defaultCode": "# This is a single line comment\n\n'''\nThis is a \nmulti-line comment\n'''\nprint('Comments are ignored by Python')",
          },
        ],
      },
      {
        "slug": "02_control_flow",
        "title": "Control Flow",
        "order": 2,
        "topics": [
          {
            "id": "python_02_control_01_if_else",
            "title": "If / Else Statements",
            "filename": "01_if_else.py",
            "order": 1,
            "defaultCode": "age = 18\n\nif age >= 18:\n    print('You are an adult')\nelse:\n    print('You are a minor')",
          },
          {
            "id": "python_02_control_02_loops",
            "title": "Loops",
            "filename": "02_loops.py",
            "order": 2,
            "defaultCode": "for i in range(5):\n    print(f'Iteration {i}')",
          },
          {
            "id": "python_02_control_03_break",
            "title": "Break & Continue",
            "filename": "03_break.py",
            "order": 3,
            "defaultCode": "for i in range(10):\n    if i == 5:\n        break\n    print(i)",
          },
        ],
      },
    ]

    for m_data in modules_data:
        # We don't strictly need the modules collection if everything is in snippets,
        # but it's good practice to keep it for metadata.
        module_doc = {
            "title": m_data["title"],
            "slug": m_data["slug"],
            "order": m_data["order"],
            "description": f"Module: {m_data['title']}"
        }
        modules_collection.insert_one(module_doc)
        
        for t_data in m_data["topics"]:
            # Insert Snippet (The Source of Truth)
            snippet_doc = {
                "_id": t_data["id"],
                "language": "python",
                "level": "beginner",
                "module": {
                    "order": m_data["order"],
                    "slug": m_data["slug"],
                    "title": m_data["title"]
                },
                "lesson": {
                    "order": t_data["order"],
                    "filename": t_data["filename"],
                    "title": t_data["title"]
                },
                "editor": {
                    "defaultCode": t_data["defaultCode"],
                    "readonly": False
                }
            }
            snippets_collection.insert_one(snippet_doc)

    print("Seed data inserted successfully with User Schema")

if __name__ == "__main__":
    seed()
