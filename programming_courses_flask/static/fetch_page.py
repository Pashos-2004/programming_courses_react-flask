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

fetch_page = Blueprint('fetch_page', __name__)

@fetch_page.route('/get_page', methods=['POST'])
def get_page():
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
    
    page_num=request_data["_url"].replace("http://localhost:3000/","").split("/")[3]

    
    
    find = False 
    prev = next = None

    for el in course["pages"]:
        if(find):
            next = el["page_id"]
            break
        if(el["page_id"]==page_num):
            page=el
            find=True
            continue
        
        prev = el["page_id"]
    if(not find):
        return json.dumps({"status":404,"info":"Страница не найдена"})
    #if(page["type"]=="text_page"):
    #    return json.dumps({"status":200,"title":page["title"],"text":page["text"],"countOfPages":course["countOfPages"]})
    #if(page["type"]=="video_page"):
    #    return json.dumps({"status":200,"title":page["title"],"_url":page["_url"],"countOfPages":course["countOfPages"]})
    
    
  
    
   
    return json.dumps({"status":200,"countOfPages":course["countOfPages"],"page":page,"next_id":next,"prev_id":prev })

