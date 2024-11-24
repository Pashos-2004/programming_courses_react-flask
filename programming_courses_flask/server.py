import os


from flask import Flask
from flask_cors import CORS;
from flask_wtf import *;
from static.fetch_courses.fetch_courses import fetch_courses
app = Flask(__name__) 
app.register_blueprint(fetch_courses)

    

if __name__ == "__main__":
    status = True
    
    if status:
        try:
            app.run(debug=True, port=5000)
        except:
            status=False
   
