from flask import Flask
from processing import get_all

api = Flask(__name__)

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Anca",
        "about" :"Hello! I'm basically a full stack developer now."
    }

    return response_body

@api.route('/home')
@api.route('/')
def index():
    ans = get_all()
    print(ans)
    one_event = ans[0]
    response_body = {
        "id": one_event[0],
        "event_name":one_event[1],
        "start_time":one_event[2],
        "end_time":one_event[3],
        "maxcap":one_event[4],
        "creator":one_event[5],
        "category":one_event[6],
        "location":one_event[7],
        "description":one_event[8],
        "cost":one_event[9],
        "day":one_event[10],
        "signup_number":one_event[11]

    }

    return response_body