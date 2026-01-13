from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("MONGO_DB")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

modules_collection = db["modules"]
topics_collection = db["topics"]