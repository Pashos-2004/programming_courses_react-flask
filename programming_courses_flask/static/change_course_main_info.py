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

change_course_main_info = Blueprint('change_course_main_info', __name__)

@change_course_main_info.route('/change_course_main_info', methods=['POST'])
def change():
    request_data = get_post_data(request.form.to_dict())
    con = MongoClient("mongodb://localhost:27017")
    db = con["CoursesDB"]
    
    comp = check_token(request_data,False)
    
    if(comp!="OK"):
        return comp
    
    courses = db.Courses
    try:    
        course = courses.find_one({"_id":ObjectId(request_data["course_id"])})
    except:
        return json.dumps({"status":404,"info":"Страница не найдена"})
    print(course)
    if(course==None):
        return json.dumps({"status":404,"info":"Страница не найдена"})
    
    courses.update_one({"_id":ObjectId(request_data["course_id"])},{"$set":{"title":request_data["title"],"description":request_data["description"]}})
    
   
    return json.dumps({"status":200})


