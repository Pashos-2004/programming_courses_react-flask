import json;
from dbm import dumb
from flask import Blueprint
from jinja2 import TemplateNotFound
from flask import request
from datetime import date
from decimal import Decimal
from pymongo import MongoClient


reg_user = Blueprint('reg_user', __name__)

@reg_user.route('/reg_user', methods=['POST'])
def test():
    

    count=[1,2,2,24]
    res = ["sdf","sdfsdf","dsfegr","rfger"]
    
   
    return json.dumps({"count":count,"res":res})
