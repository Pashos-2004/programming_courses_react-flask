import json;
from dbm import dumb
from flask import Blueprint
from jinja2 import TemplateNotFound
from flask import request
from datetime import date
from decimal import Decimal
from pymongo import MongoClient

from static.utils.utils import get_post_data, unpack_fetch,create_access_token,verify_token;

auth_user = Blueprint('auth_user', __name__)

@auth_user.route('/auth_user', methods=['POST'])
def auth():
    request_data = get_post_data(request.form.to_dict())
    #print(request_data)
    
    con = MongoClient("mongodb://localhost:27017")
    db = con["CoursesDB"]
    users = db.Users
    #print(users.find_one({"email":request_data["email"]}))
    user = users.find_one({"email":request_data["email"]})
    if(user == None):
        return json.dumps({"status":401,"info":"Не найден пользователь с такой почтой"})
    if(user["password"]!=request_data["password"]):
        return json.dumps({"status":401,"info":"Пароль неверен"})
    data = {
        "_id" : str(user["_id"]),
        'device': request_data["device"]
    }
    token = create_access_token(data=data)
    #print({'token': token})
    
    #print(verify_token(token))
    return json.dumps( {"status":200,"user_id":str(user["_id"]),"email":user["email"],"token":token,"isAdmin":user["isAdmin"]})

