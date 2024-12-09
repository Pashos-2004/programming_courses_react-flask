import json;
from dbm import dumb
from flask import Blueprint
from jinja2 import TemplateNotFound
from flask import request
from datetime import date
from decimal import Decimal
from pymongo import MongoClient
from static.utils.utils import get_post_data, unpack_fetch;

auth_user = Blueprint('auth_user', __name__)

@auth_user.route('/auth_user', methods=['POST'])
def test():
    request_data = get_post_data(request.form.to_dict())
    print(request_data)
    
    con = MongoClient("mongodb://localhost:27017")
    db = con["CoursesDB"]
    users = db.Users
    #print(users.find("email":request_data["email"]))



    
    return json.dumps({"count":count,"res":res})

