import os
from flask import Flask
from flask_cors import CORS;
from flask_wtf import *;
from static.fetch_courses import fetch_courses
import psycopg2

app = Flask(__name__) 
app.register_blueprint(fetch_courses)
con = psycopg2.connect(user="postgres", password='123456', host='127.0.0.1', port="5432", database="courses")
    

if __name__ == "__main__":
    status = True
    
    if status:
        try:
            app.run(debug=True, port=5000)
        except:
            status=False
    con.close()
   
