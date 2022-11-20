from flask import Flask, request, jsonify
import processing as proc
import parseargs
import auth 
from flask_cors import CORS

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

# @app.route('/logoutapp', methods=['GET'])
# def logoutapp():
#     return auth.logoutapp()

# @app.route('/logoutcas', methods=['GET'])
# def logoutcas():
#     return auth.logoutcas()

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route("/https://tigeractivities.onrender.com/events", methods = ['GET'])
#@cross_domain(origin='*')
@app.after_request
def index():
    print("in index")
    # username = auth.authenticate()
    events = proc.fetch_activities()
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
        response = jsonify(results)
        response.headers.add('Access-Control-Allow-Origin', '*')
        print(response)
    return response

@app.route('/https://tigeractivities.onrender.com/attendees', methods=['POST'])
#@cross_origin()
@app.after_request
def get_attendees():
    # username = auth.authenticate()
    res = request.json
    id = res['event_id']
    attendees = proc.get_activity_attendees(id)
    return attendees

@app.route('/https://tigeractivities.onrender.com/create-event', methods = ['POST'])
#@cross_origin()
@app.after_request
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


@app.route('/https://tigeractivities.onrender.com/sign-up', methods = ['POST'])
#@cross_origin()
@app.after_request
def signUp():
    # username = auth.authenticate()
    res = request.json
    print("json")
    print(res)
    proc.store_sign_up(res)
    return res
