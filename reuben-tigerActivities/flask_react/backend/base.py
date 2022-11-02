from flask import Flask
import processing as proc

api = Flask(__name__)

@api.route('/profile')
@api.route('/')
def my_profile():
    response_body = {
        "name": "Reuben",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

@api.route("/events", methods = ['GET'])
def index():
    events = proc.get_all()
    print(events)
    results =[]
    for event in events:
        response_body={
            "id": event[0],
            "event_name":event[1],
            "start_time":event[2],
            "end_time":event[3],
            "maxcap":event[4],
            "creator":event[5],
            "category":event[6],
            "location":event[7],
            "description":event[8],
            "cost":event[9],
            "day":event[10],
            "signup_number":event[11]
        }
        results.append(response_body)
    
    return results