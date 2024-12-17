import json;
from jose import JWTError, jwt
from pydantic import BaseModel
from datetime import datetime, timedelta
from pymongo import MongoClient
from bson.objectid import ObjectId

SECRET_KEY = "b6qT591hTeoCbkgq/y2+aCp7ct0Y89B15p91njlohOTqkNvbQme7ub5Fzswocnb+"
 
ALGORITHM = "HS256"
con = MongoClient("mongodb://localhost:27017")
db = con["CoursesDB"]

def get_post_data(post):    
    dict_data = post.keys()
    tmp = None
    for v in dict_data:
        tmp = json.loads(str(v))
    return tmp

def unpack_fetch(fetch):
    return [cort[0] for cort in fetch]

def validate_id(_id: str)->bool:
    non_valid = ['', 'undefined', 'null', None]
    if _id in non_valid or (not (_id.isdigit())): return False
    return True;    

def check_token(request_data,isAdmin=False):
    users = db.Users
    
    try:
        user = users.find_one({"_id":ObjectId(request_data["_id"])})
    except:
        return json.dumps({"status":403,"info":"Не найден пользователь"})
    
    if(user["isAdmin"]!=True and isAdmin):
        return json.dumps({"status":403,"info":"Нет прав администратора"})
    ver_token = verify_token(request_data["token"])
    comp = compare_token_and_user_data(ver_token,user,request_data)
    if(comp !="OK"):
        return comp
    return "OK"
    
def compare_token_and_user_data(token,user,request_data):
    if(user == None):
        return json.dumps({"status":403,"info":"Не найден пользователь"})
    if(token):
        if(token["_id"]!=str(user["_id"])  or token["device"]!=request_data["device"]):
            return json.dumps({"status":403,"info":"Ошибка идентификации"})
        data = {
        "_id" : str(user["_id"]),
        'device': request_data["device"]
        }
       
    else:
        return json.dumps({"status":403,"info":"Ошибка идентификации"})

    return "OK"



def create_access_token(data: dict):
    to_encode = data.copy()
    
    expire = datetime.utcnow() + timedelta(minutes=600)
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
     
   
    return encoded_jwt
def verify_token(token: str):
    try:
        # try to decode the token, it will 
        # raise error if the token is not correct
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return False