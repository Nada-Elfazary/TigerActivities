#from flask import Flask, request, render_template
import flask
import processing as proc
import parseargs
import os
import auth 
#from flask_cors import CORS


app = flask.Flask(__name__)
#app.config['CORS_HEADERS'] = 'Content-Type'
#os.environ['APP_SECRET_KEY'] = 'asoidfhaslkdfjhaljdfal'
#app.secret_key = os.environ['APP_SECRET_KEY']
#CORS(app)

@app.route('/logoutapp', methods=['GET'])
@app.route('/logoutcas', methods=['GET'])
def logout():
    return auth.logoutapp()

@app.route('/' , methods=['GET'])
def nishan():
    print('I am here')
    return ('Hello Nishan!')

#@app.after_request
#def after_request(response):
#  response.headers.add('Access-Control-Allow-Origin', '*')
#  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#  return response


#@app.route("/dummy", methods = ['GET'])
# cross_origin()
#def dummy_route():
  #  username = auth.authenticate()
   # return("Hello " + username)

@app.route("/events", methods = ['GET'])
# cross_origin()
#
def index():
   #auth.authenticate()
   title = flask.request.args.get("title") or ''
   day = flask.request.args.get("day") or ''
   category = flask.request.args.get("category") or ''
   cost = flask.request.args.get("cost") or 'all'
   capMin = flask.request.args.get("capMin") or '1'
   capMax = flask.request.args.get("capMax") or '99999'
  
   print("Received arguments: title={} day={} category={} cost={} capMin={} capMax={}".format(title, day, category, cost, capMin, capMax))
   events = proc.fetch_activities(title, day, category, cost, capMin, capMax)
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
        print("This is response from proc: " + str(response_body))
        results.append(response_body)
   return results

@app.route("/user-sign-ups", methods = ['GET'])
def sign_ups():
  #username = auth.authenticate()
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
            "week_day": event[11],
            "end_date":event[12],
            "signup_number":event[13]
        }
        results.append(response_body)
  return results

@app.route('/attendees', methods=['GET'])
# cross_origin()
def get_attendees():
    #username = auth.authenticate()
    #res = request.json
    id = flask.request.args.get("event_id")
    attendees_response = []
    attendees = proc.get_activity_attendees(id)
    for attendee in attendees:
        response_body = {
            "name": attendee.get_name(),
            "netid": attendee.get_netid(),
            "email": attendee.get_email(),
            "number": attendee.get_number()
        }
        attendees_response.append(response_body)
    return attendees_response

@app.route('/create-event', methods = ['POST'])
# cross_origin()
def createEvent():
    #username = auth.authenticate()
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
   # username = auth.authenticate()
    res = flask.request.json
    print("json")
    print(res)
    proc.store_sign_up(res)
    return res

@app.route('/cancel-sign-up', methods = ['POST'])
# cross_origin()
def cancelSignUp():
   # username = auth.authenticate()
    res = flask.request.json
    print("json")
    print(res)
    id = res["event_id"]
    print(id)
    proc.delete_signup(id)
    return res

@app.route('/update-profile', methods = ['POST'])
def updateProfile():
    res = flask.request.json
    print("Inside /update-profile. Request data: {}".format(res))
    
    netid = res["netid"]
    name = res["name"]
    phone = res["phone"]
    email = res["email"]
    class_year = "" #tbd

    proc.store_student([netid,name,phone,email,class_year])
    return res

@app.route('/profile', methods = ['GET'])
def getProfileInfo():
    netid = flask.request.args.get("netid")
    print("Inside /profile. Request data: {}".format(netid))
    student_row = proc.student_details(netid)
    print("received Student infomation: {}".format(student_row))
    if student_row is None:
        response_body = {
            "name": "",
            "phone": "",
            "email": "",
            "class_year": ""
        }
    else:
        response_body = {
            "name": student_row[1],
            "phone": student_row[2],
            "email": student_row[3],
            "class_year":student_row[4]
        }
    return response_body
   
