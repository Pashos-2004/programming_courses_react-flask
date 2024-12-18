import os
from flask import Flask
from flask_cors import CORS;
from flask_wtf import *;
from static.fetch_courses import fetch_courses
from static.auth_user import auth_user
from static.reg_user import reg_user
from static.change_information import change_information
from static.create_course import create_course
from static.fetch_pages import fetch_pages
from static.fetch_page import fetch_page
from static.change_course_main_info import change_course_main_info
from static.create_page import create_page
from static.delete_course import delete_course
from static.delete_page import delete_page
from static.update_page import update_page

from pymongo import MongoClient

app = Flask(__name__) 
app.register_blueprint(fetch_courses)
app.register_blueprint(fetch_pages)
app.register_blueprint(fetch_page)
app.register_blueprint(auth_user)
app.register_blueprint(reg_user)
app.register_blueprint(change_information)
app.register_blueprint(create_course)
app.register_blueprint(change_course_main_info)
app.register_blueprint(create_page)
app.register_blueprint(delete_course)
app.register_blueprint(delete_page)
app.register_blueprint(update_page)

CORS(app)



if __name__ == "__main__":
    status = True
    
    
    
    if status:
        try:
            app.run(debug=True, port=5000)
        except:
            status=False
    #con.close()
   
