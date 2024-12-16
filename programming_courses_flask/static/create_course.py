import json;
from dbm import dumb
from flask import Blueprint
from jinja2 import TemplateNotFound
from flask import request
from datetime import date
from decimal import Decimal
from pymongo import MongoClient
from bson.objectid import ObjectId

from static.utils.utils import get_post_data, unpack_fetch,create_access_token,verify_token,compare_token_and_user_data,check_token;


create_course = Blueprint('create_course', __name__)

@create_course.route('/create_course', methods=['POST'])
def create():
    
    
    request_data = get_post_data(request.form.to_dict())
    #print(request_data)
    
    con = MongoClient("mongodb://localhost:27017")
    db = con["CoursesDB"]
    comp = check_token(request_data)
    if(comp!="OK"):
        return comp

    courses = db.Courses
    courses.insert_one({"title":request_data["title"],"description":request_data["description"],"picture":request_data["picture"],"countOfPages":0,"pages":[]}).inserted_id


    return json.dumps( {"status":200})
