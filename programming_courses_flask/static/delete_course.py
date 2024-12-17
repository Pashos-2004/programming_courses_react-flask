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

delete_course = Blueprint('delete_course', __name__)

@delete_course.route('/delete_course', methods=['POST'])
def delete():
    request_data = get_post_data(request.form.to_dict())
    con = MongoClient("mongodb://localhost:27017")
    db = con["CoursesDB"]
    
    comp = check_token(request_data,True)
    
    if(comp!="OK"):
        return comp
    
    courses = db.Courses
    try:    
        course = courses.find_one({"_id":ObjectId(request_data["course_id"])})
    except:
        return json.dumps({"status":404,"info":"Страница не найдена"})
    
    if(course==None):
        return json.dumps({"status":404,"info":"Страница не найдена"})
    
    db.Log.insert_one({"deleted_info":courses.find_one({"_id":ObjectId(request_data["course_id"])}), "who_did_it":request_data["_id"] })
    courses.delete_one({"_id":ObjectId(request_data["course_id"])})
    return json.dumps({"status":200})


