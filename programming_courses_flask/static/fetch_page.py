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
    
    page_num=request_data["num"]
    print(page_num)
    print(not (str(page_num)).isdigit())
    if (not (str(page_num)).isdigit()):
       return json.dumps({"status":404,"info":"Страница не найдена"})
    page_num =int(page_num)
    if (page_num>course["countOfPages"]):
        return json.dumps({"status":404,"info":"Страница не найдена"})
    
    for el in course["pages"]:
        if(el["pageNum"]==page_num):
            page=el
            break
    
    #if(page["type"]=="text_page"):
    #    return json.dumps({"status":200,"title":page["title"],"text":page["text"],"countOfPages":course["countOfPages"]})
    #if(page["type"]=="video_page"):
    #    return json.dumps({"status":200,"title":page["title"],"_url":page["_url"],"countOfPages":course["countOfPages"]})
    
    

    
   
    return json.dumps({"status":200,"countOfPages":course["countOfPages"],"page":page })

