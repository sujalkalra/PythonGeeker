import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from app.core.database import modules_collection, topics_collection

def seed():
    if modules_collection.count_documents({}) > 0:
        print("Data already exists")
        return

    module = {
        "title": "Python Basics",
        "order": 1,
        "description": "Fundamental syntax and core concepts of Python."
    }

    module_id = modules_collection.insert_one(module).inserted_id

    topics = [
        {
            "module_id": str(module_id),
            "title": "Print Function",
            "explanation": "Learn how to print output in Python.",
            "code": 'print("Hello, World!")'
        },
        {
            "module_id": str(module_id),
            "title": "Variables",
            "explanation": "Understand variables and assignment.",
            "code": 'x = 10\nprint(x)'
        }
    ]

    topics_collection.insert_many(topics)
    print("Seed data inserted")

if __name__ == "__main__":
    seed()