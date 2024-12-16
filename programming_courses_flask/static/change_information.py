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

change_information = Blueprint('change_information', __name__)


@change_information.route('/change_information', methods=['POST'])
def change():
    request_data = get_post_data(request.form.to_dict())
    #print(request_data)
    
    con = MongoClient("mongodb://localhost:27017")
    db = con["CoursesDB"]
    users = db.Users
    user = users.find_one({"_id":ObjectId(request_data["_id"])})
    comp = check_token(request_data)
    if(comp!="OK"):
        return comp
    data = {
        "_id" : str(user["_id"]),
        'device': request_data["device"]
    }
    token = create_access_token(data=data)
    user = users.find_one({"_id":ObjectId(request_data["_id"])})
    
    
    
    return json.dumps( {"status":200,"user_id":str(user["_id"]),"email":user["email"],"token":token,"isAdmin":user["isAdmin"]})

