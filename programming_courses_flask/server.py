import os
from flask import Flask
from flask_cors import CORS;
from flask_wtf import *;
from static.fetch_courses import fetch_courses
from static.auth_user import auth_user
from static.reg_user import reg_user
from static.change_information import change_information
from static.create_course import create_course
from pymongo import MongoClient

app = Flask(__name__) 
app.register_blueprint(fetch_courses)
app.register_blueprint(auth_user)
app.register_blueprint(reg_user)
app.register_blueprint(change_information)
app.register_blueprint(create_course)

CORS(app)



if __name__ == "__main__":
    status = True
    
    
    
    if status:
        try:
            app.run(debug=True, port=5000)
        except:
            status=False
    #con.close()
   
