#from flask import Flask, request, render_template
import flask
from flask.json import jsonify
from flask import abort, redirect
import processing as proc
import parseargs
import os
import auth 
from flask_cors import CORS
from flask_cors import cross_origin
import urllib.request
import CasClient
#-----------------------------------------------------------------------

APP_URL = 'https://tigeractivities-iqwe.onrender.com/homeTo'
#username = ''
#-----------------------------------------------------------------------
app = flask.Flask(__name__, static_folder="build/static", template_folder="build")
#app.config['CORS_HEADERS'] = 'Content-Type'
os.environ['APP_SECRET_KEY'] = 'asdfasdfasdfadf'
app.secret_key = os.environ['APP_SECRET_KEY']
#CORS(app)
cors = CORS(app, resources={r"/*": {'origins': "http://tigeractivities-iqwe.onrender.com"}}, supports_credentials=True)

@app.route('/api/logoutapp', methods=['GET'])
@app.route('/api/logoutcas', methods=['GET'])
def logout():
    authResult = CasClient.CASClient().logout()
    return jsonify(redirect = authResult)

@app.route('/' , methods=['GET'])
def shree():
    print('I am here')
    return flask.render_template('index.html')

#@app.after_request
#def after_request(response):
#    response.headers.set('Access-Control-Allow-Origin', '*')
 #response.headers.set('Access-Control-Allow-Origin', 'https://tigeractivities-iqwe.onrender.com')
 #response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
 # response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
 # return response

@app.route('/api/authenticate', methods=['GET'])
def authenticate():
   authResult = CasClient.CASClient().authenticate()
   return jsonify(
        username=authResult['username'],
        redirect=authResult['redirect'])

#-----------------------------------------------------------------------

@app.route('/api/authenticate2', methods=['GET'])
def authenticate2():
    authResult = CasClient.CASClient().authenticate()
    if authResult['username'] == '':
        return 'Something is badly wrong.'
    
    student_row = proc.student_details(authResult['username'])
    if student_row is None or student_row[1]== "":
        proc.store_student([authResult['username'],"","",""])

   # global username
  #  username = authResult['username']
    html_code = flask.render_template('index.html')
    return html_code
    #abort(redirect(APP_URL))
    #abort(redirect(request.url_root))

#-----------------------------------------------------------------------

@app.route("/api/dummy", methods = ['GET'])
def dummy_route():
  print("inside dummy")
  username = auth.authenticate()
  return (username)

@app.route("/api/events", methods = ['GET'])
#
def index():
   #username = auth.authenticate()
   authResult = CasClient.CASClient().authenticate()
   if authResult['username'] == '':
        return "Not found"
   title = flask.request.args.get("title") or ''
   day = flask.request.args.get("day") or ''
   category = flask.request.args.get("category") or ''
   cost = flask.request.args.get("cost") or 'all'
   capMin = flask.request.args.get("capMin") or '1'
   capMax = flask.request.args.get("capMax") or '99999'
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
            "start_week_day": event[11],
            "end_week_day": event[12],
            "end_date":event[13],
            "signup_number":event[14],
        }
        results.append(response_body)
   return results

@app.route("/api/user-sign-ups", methods = ['GET'])
def sign_ups():
  authResult = CasClient.CASClient().authenticate()
  username = authResult['username']
  if username == '':
    return "Not found"
  events = proc.fetch_user_sign_ups(username)
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

@app.route('/api/attendees', methods=['GET'])
def get_attendees():
    #username = auth.authenticate()
    #res = request.json
    authResult = CasClient.CASClient().authenticate()
    username = authResult['username']
    if username == '':
        return "Not found"
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

@app.route('/api/create-event', methods = ['POST'])
@cross_origin(origins= ['https://tigeractivities-iqwe.onrender.com'])
# cross_origin()
def createEvent():
    authResult = CasClient.CASClient().authenticate()
    username = authResult['username']
    if username == '':
        return "Not found"
    res = flask.request.json
    print("response", res['event_name'])
    print("Recieved request: {}".format(flask.request.json))
    print("Body", flask.request.form)
    print("Event Name", res["event_name"])
    print("Location", res["location"])
    print("start time before format", res['start_time'])


    result = res['start_time'].split(' ')
    print("result", result)
    result = result[1: 5]
    print("converted", result)
    res['start_time']= result

    result = res['end_time'].split(' ')
    print("result", result)
    result = result[1: 5]
    print("converted", result)
    res['end_time']= result

    print("start date: ", type(res['start_time']))
    print("end date: ", type(res['end_time']))
    # return {'name':res['event_name'], 'location': res['location']}
    proc.store_activity(res)
    return res
  
'''
@app.route('/api/validate', methods=['GET'])
@cross_origin(origins= ['https://tigeractivities-iqwe.onrender.com'])
def validate():
    #res = flask.request.json
    #ticket = flask.request.args.get('ticket')
    url = flask.request.args.get('url')
    with urllib.request.urlopen(url) as flo:
        lines = flo.readlines()
    return lines[0].decode('utf-8')
'''
@app.route('/api/hello', methods = ['GET'])
def hello():
    return "Hello, worlds!"

@app.route('/api/sign-up', methods = ['POST'])
def signUp():
    authResult = CasClient.CASClient().authenticate()
    username = authResult['username']
    if username == '':
        return "Not found"
    res = flask.request.json
    print("json")
    print(res)
    proc.store_sign_up(res, username)
    return res

@app.route('/api/cancel-sign-up', methods = ['POST'])
def cancelSignUp():
    authResult = CasClient.CASClient().authenticate()
    username = authResult['username']
    if username == '':
        return "Not found"
    res = flask.request.json
    print("json")
    print(res)
    id = res["event_id"]
    print(id)
    proc.delete_signup(id, username)
    return res

@app.route('/api/update-profile', methods = ['POST'])
def updateProfile():
    res = flask.request.json
    authResult = CasClient.CASClient().authenticate()
    username = authResult['username']
    if username == '':
        return "Not found"
    #netid = res["netid"]
    name = res["name"] or ""
    phone = res["phone"] or ""
    email = res["email"] or ""
    # print("phone: {}, integer: {}".format(phone,type(phone)))
    proc.store_student([username,name,phone,email])
    return res

@app.route('/api/edit-activity', methods = ['POST'])
def editActivity():
    authResult = CasClient.CASClient().authenticate()
    username = authResult['username']
    if username == '':
        return "Not found"
    res = flask.request.json
    print("**********edit backend json: *************")
    print(res)
    result = res['start_time'].split(' ')
    print("result", result)
    result = result[1: 5]
    print("converted", result)
    res['start_time']= result

    result = res['end_time'].split(' ')
    print("result", result)
    result = result[1: 5]
    print("converted", result)
    res['end_time']= result
    
    proc.edit_event(res)
    return res

@app.route('/api/delete-activity', methods = ['POST'])
def deleteActivity():
    authResult = CasClient.CASClient().authenticate()
    username = authResult['username']
    if username == '':
        return "Not found"
    res = flask.request.json
    id = res["event_id"]
    proc.delete_event(id)
    return res

@app.route('/api/profile', methods = ['GET'])
def getProfileInfo():
    authResult = CasClient.CASClient().authenticate()
    username = authResult['username']
    if username == '':
        return "Not found"
    netid = flask.request.args.get("netid")
    print("Inside /profile. Request data: {}".format(netid))
    student_row = proc.student_details(netid)
    print("received Student infomation: {}".format(student_row))
    if student_row is None:
        response_body = {
            "name": "",
            "phone": "",
            "email": "",
        }
    else:
        response_body = {
            "name": student_row[1],
            "phone": student_row[2],
            "email": student_row[3]
        }
    return response_body
   
