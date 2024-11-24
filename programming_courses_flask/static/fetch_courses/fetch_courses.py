import json;
from dbm import dumb
from flask import Blueprint;
from jinja2 import TemplateNotFound;
from flask import request;
from datetime import date;
from decimal import Decimal;

fetch_courses = Blueprint('fetch_courses', __name__)

@fetch_courses.route('/get_courses', methods=['GET'])
def test():
    count=[1,2,2,24]
    res = ["sdf","sdfsdf","dsfegr","rfger"]
    
    return json.dumps({"count":count,"res":res})

