import json;
from dbm import dumb
from flask import Blueprint
from jinja2 import TemplateNotFound
from flask import request
from datetime import date
from decimal import Decimal
from pymongo import MongoClient


from static.utils.utils import get_post_data, unpack_fetch,create_access_token,verify_token,check_token;


reg_user = Blueprint('reg_user', __name__)

@reg_user.route('/reg_user', methods=['POST'])
def auth():
    
    
    request_data = get_post_data(request.form.to_dict())
    #print(request_data)
    
    con = MongoClient("mongodb://localhost:27017")
    db = con["CoursesDB"]
    users = db.Users
    #print(users.find_one({"email":request_data["email"]}))
    user = users.find_one({"email":request_data["email"]})
    if(user != None):
        return json.dumps({"status":401,"info":"Такой пользователь уже существует"})
    
    users.insert_one({"email":request_data["email"],"password":request_data["password"],"isAdmin":False}).inserted_id

    user = users.find_one({"email":request_data["email"]})
    data = {
        "_id" : str(user["_id"]),
        'device': request_data["device"]
    }
    token = create_access_token(data=data)
    #print({'token': token})
    
    #print(verify_token(token))
    return json.dumps( {"status":200,"user_id":str(user["_id"]),"email":user["email"],"token":token,"isAdmin":user["isAdmin"]})
