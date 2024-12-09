import json;
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
