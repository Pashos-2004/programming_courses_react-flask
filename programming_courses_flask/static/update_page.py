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

update_page = Blueprint('update_page', __name__)

@update_page.route('/update_page', methods=['POST'])
def update():
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
    
    if(course==None):
        return json.dumps({"status":404,"info":"Страница не найдена"})
    
    page_id=request_data["page_id"]

    print(request_data["page"])
    corretion = 0
    pages=[]
    find = False
    for el in course["pages"]:
        
        if(el["page_id"]==page_id):
            pages.append(request_data["page"])
            find=True
            continue
        pages.append(el)
        
    print(pages)
    
    if(not find):
        return json.dumps({"status":404,"info":"Страница не найдена 1"})
    
    
    courses.update_one({"_id":ObjectId(request_data["course_id"])},{"$set":{"pages":pages}})
    
   
    return json.dumps({"status":200})

