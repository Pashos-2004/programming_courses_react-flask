import json;
from dbm import dumb
from flask import Blueprint
from jinja2 import TemplateNotFound
from flask import request
from datetime import date
from decimal import Decimal
from pymongo import MongoClient
from bson.objectid import ObjectId

from static.utils.utils import get_post_data, unpack_fetch,create_access_token,verify_token,check_token;

fetch_courses = Blueprint('fetch_courses', __name__)

@fetch_courses.route('/get_courses', methods=['POST'])
def get_courses():
    request_data = get_post_data(request.form.to_dict())
    con = MongoClient("mongodb://localhost:27017")
    db = con["CoursesDB"]
   
    
    courses = db.Courses
    cursor = courses.find()
    
    _id=[]
    title=[]
    description = []
    picture = []
    
    for course in cursor:
        _id.append(str(course["_id"]))
        title.append(course["title"])
        description.append(course["description"])
        picture.append(course["picture"])
   
    return json.dumps({"_id":_id,"title":title,"description":description,"picture":picture })

