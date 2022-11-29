#from flask import Flask, request, render_template
import flask
import processing as proc
import parseargs
import os
import auth 
from flask_cors import CORS


app = flask.Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = os.environ['APP_SECRET_KEY']
CORS(app)

@app.route('/logoutapp', methods=['GET'])
@app.route('/logoutcas', methods=['GET'])
def logout():
    return auth.logoutapp()

@app.route('/' , methods=['GET'])
def nishan():
    print('I am here')
    return ('Hello Nishan!')

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response


#@app.route("/dummy", methods = ['GET'])
# cross_origin()
#def dummy_route():
  #  username = auth.authenticate()
   # return("Hello " + username)

@app.route("/events", methods = ['GET'])
# cross_origin()
#
def index():
   auth.authenticate()
   # res = request.json
  # print("request: ")
   # print("before title")
    #title = res['title']
    #print("after title")
    #print(title)
   title = flask.request.args.get("title") or ''
   day = flask.request.args.get("day") or ''
   category = flask.request.args.get("category") or ''
   print("Received arguments: title={} day={} category={}".format(title,day,category))
   events = proc.fetch_activities(title, day, category)
   print("events route has been called. Fetching events: {}".format(events))
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
            "week_day": event[11],
            "end_date":event[12],
            "signup_number":event[13],
            
        }
        results.append(response_body)
   return results

@app.route("/user-sign-ups", methods = ['GET'])
def sign_ups():
  username = auth.authenticate()
  events = proc.fetch_user_sign_ups()
  results = []
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

@app.route('/attendees', methods=['GET'])
# cross_origin()
def get_attendees():
    username = auth.authenticate()
    #res = request.json
    id = flask.request.args.get("event_id")
    attendees = proc.get_activity_attendees(id)
    return attendees

@app.route('/create-event', methods = ['POST'])
# cross_origin()
def createEvent():
    username = auth.authenticate()
    res = flask.request.json
    print("response", res['event_name'])
    print("Recieved request: {}".format(flask.request.json))
    print("Body", flask.request.form)
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
# cross_origin()
def signUp():
    username = auth.authenticate()
    res = flask.request.json
    print("json")
    print(res)
    proc.store_sign_up(res)
    return res

@app.route('/cancel-sign-up', methods = ['POST'])
# cross_origin()
def cancelSignUp():
    username = auth.authenticate()
    res = flask.request.json
    print("json")
    print(res)
    id = res["event_id"]
    print(id)
    proc.delete_signup(id)
    return res