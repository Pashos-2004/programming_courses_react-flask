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

create_page = Blueprint('create_page', __name__)

@create_page.route('/create_page', methods=['POST'])
def crate():
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
  

    if(request_data["page_type"]=="text_page"):
        courses.update_one({"_id":ObjectId(request_data["course_id"])},{"$push": { "pages": {"title":"title","type":request_data["page_type"],"text":"text","pageNum":(course["countOfPages"]+1)}} } )
    if(request_data["page_type"]=="video_page"):
        courses.update_one({"_id":ObjectId(request_data["course_id"])},{"$push": { "pages": {"title":"title","type":request_data["page_type"],"_url":"_url","pageNum":(course["countOfPages"]+1)}} } )
    if(request_data["page_type"]=="question_page_with_one_answer"):
        courses.update_one({"_id":ObjectId(request_data["course_id"])},{"$push": { "pages": {"title":"title","type":request_data["page_type"],"question":"question","right_answer":"right_answer","pageNum":(course["countOfPages"]+1)}} } )
    
    courses.update_one({"_id":ObjectId(request_data["course_id"])},{"$set":{"countOfPages":(course["countOfPages"]+1)}})
   
    return json.dumps({"status":200})


