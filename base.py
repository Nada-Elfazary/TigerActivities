from flask import Flask, request, render_template
import processing as proc
import parseargs
import os
import auth 

app = Flask(__name__)

# @app.route('/logoutapp', methods=['GET'])
# def logoutapp():
#     return auth.logoutapp()

# @app.route('/logoutcas', methods=['GET'])
# def logoutcas():
#     return auth.logoutcas()


@app.route("/events", methods = ['POST'])
def index():
   # username = auth.authenticate()
    res = request.json
    print("request: ", res)
    print("before title")
    title = res['title']
    print("after title")
    print(title)
    events = proc.fetch_activities(title)
   # print(events)
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
            "start_date":event[10],
            "end_date":event[11],
            "signup_number":event[12]
        }
        results.append(response_body)
    
    return results

@app.route('/attendees', methods=['POST'])
def get_attendees():
    # username = auth.authenticate()
    res = request.json
    id = res['event_id']
    attendees = proc.get_activity_attendees(id)
    return attendees

@app.route('/create-event', methods = ['POST'])
def createEvent():
    # username = auth.authenticate()
    res = request.json
    print("response", res['event_name'])
    print("Recieved request: {}".format(request.json))
    print("Body", request.form)
    print("Event Name", res["event_name"])
    print("Location", res["location"])
    # return {'name':res['event_name'], 'location': res['location']}
    proc.store_activity(res)
    return res
    # return request
    # @api.route('/create-event', methods = ["POST"])
    # def createEvent():  
    #     print("Recieved request: {}".format(request))


@app.route('/sign-up', methods = ['POST'])
def signUp():
    # username = auth.authenticate()
    res = request.json
    print("json")
    print(res)
    proc.store_sign_up(res)
    return res
