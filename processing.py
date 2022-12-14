#!/usr/bin/env python

#-----------------------------------------------------------------------
# displaydb.py
# Author: Sriyans Rauniyar
#-----------------------------------------------------------------------
import sys
import psycopg2
import datetime
import pytz
import pickle
import attendee as attendeemod
#-----------------------------------------------------------------------
DATABASE_URL = 'postgres://hwwlwcbv:hyNZQS9_LH8CSD3yQoc5IpDHkBJeSlhF@peanut.db.elephantsql.com/hwwlwcbv'

def get_current_date():
    currDate = datetime.datetime.now(pytz.timezone('US/Central'))
    currDate = currDate.strftime("%Y/%m/%d")
    return currDate

def get_current_time():
    currTime = datetime.datetime.now(pytz.timezone('US/Central'))
    currTime = currTime.strftime("%H:%M")
    return currTime

def convert_date(year, month, day):
    date = datetime.date(year, month, day)
    date = date.strftime("%Y/%m/%d")
    return date

def convert_time(hour, minute):
    time = datetime.time(hour, minute)
    time = time.strftime("%H:%M")
    return time

def format_time(time):
    print("start date in store activity: ", time)

    converted_month_start = convert_month(time[0])

    splitTime = time[3].split(':')
    format_Date = convert_date(int(time[2]), converted_month_start, int(time[1]))
    format_time = convert_time(int(splitTime[0]), int(splitTime[1]))

    return format_Date, format_time

def get_date_limit():
    
    currDay = datetime.datetime.now(pytz.timezone('US/Central'))
    year = currDay.year
    month = currDay.month
    newDay = currDay.day + 6

    month_numDays = {1: 31, 
                    2:(29 if year % 4 == 0 else 28),
                    3: 31, 
                    4: 30,
                    5: 31,
                    6: 30,
                    7: 31,
                    8: 31,
                    9: 30,
                    10: 31,
                    11: 30,
                    12: 31
                    }
    # day overflow
    if newDay > month_numDays[month]:
        newDay = newDay - month_numDays[month]
        month += 1
        # month overflow
        if(month > 12):
            month = 1
            year += 1
    currDay = convert_date(year, month, newDay)
    return currDay

def convert_month(month):
    dict = {"Jan": 1, 
            "Feb": 2,
            "Mar": 3,
            "Apr": 4, 
            "May": 5,
            "Jun": 6, 
            "Jul": 7, 
            "Aug": 8,
            "Sep": 9, 
            "Oct": 10, 
            "Nov": 11, 
            "Dec": 12}
    return dict[month]

def fetch_activities(title, day, category, cost, capMin, capMax):
    title = '%' + title + '%'
    category = '%' + category + '%'


    try:
        database_url = DATABASE_URL
        activities = []
        currDate = get_current_date()
        currTime = get_current_time()
        dateLimit = get_date_limit()
        with psycopg2.connect(database_url) as connection:            
            with connection.cursor() as cursor:
                statementOne = "SELECT * FROM events WHERE startdate = %s AND starttime > %s "
                statementOne += "AND LOWER(eventname) LIKE %s AND category LIKE %s AND maxcap BETWEEN %s AND %s "
                if cost != "all":
                    statementOne += "AND cost <= %s"
                    cursor.execute(statementOne, [currDate, currTime, title.lower(), category, capMin, capMax, cost])
                
                else:
                    cursor.execute(statementOne, [currDate, currTime, title.lower(), category, capMin, capMax])  
                row = cursor.fetchone()
                while row is not None:
                    weekday = row[10].weekday()
                    print("*************** start weekday, ", row[10].weekday())
                    print("*************end weekday: ", row[11].weekday())
                    if day != "" and weekday != int(day):
                        row = cursor.fetchone()
                        continue
                    newStartTime = row[2].strftime("%H:%M")
                    newEndTime = row[3].strftime("%H:%M")
                    newStartDate = row[10].strftime("%Y/%m/%d")
                    newEndDate = row[11].strftime("%Y/%m/%d")
                    
                    copy_row = (row[0], row[1], newStartTime, newEndTime, row[4],
                    row[5], row[6], row[7], row[8], row[9], newStartDate, weekday, newEndDate, row[12])
                    activities.append(copy_row)
                    row = cursor.fetchone()

                statementTwo = "SELECT * FROM events WHERE %s < startdate AND startdate < %s"
                statementTwo += "AND LOWER(eventname) LIKE %s AND category LIKE %s AND maxcap BETWEEN %s AND %s " 
                #AND maxcap %s %s"
                #  statementOne += "ORDER BY RANDOM() LIMIT 1000"
                # AND eventname LIKE %s
                if cost != "all":
                    statementTwo += "AND cost <= %s"
                    cursor.execute(statementTwo, [currDate, dateLimit, title.lower(), category, capMin, capMax, cost])
                
                else:
                    cursor.execute(statementTwo, [currDate, dateLimit, title.lower(), category, capMin, capMax]) 
                row = cursor.fetchone()
                while row is not None:
                    weekday = row[10].weekday()
                    print("*************** start weekday, ", row[10].weekday())
                    print("*************end weekday: ", row[11].weekday())
                    if day != "" and weekday != int(day):
                        row = cursor.fetchone()
                        continue
                    newStartTime = row[2].strftime("%H:%M")
                    newEndTime = row[3].strftime("%H:%M")
                    newStartDate = row[10].strftime("%Y/%m/%d")
                    newEndDate = row[11].strftime("%Y/%m/%d")
                    copy_row = (row[0], row[1], newStartTime, newEndTime, row[4],
                    row[5], row[6], row[7], row[8], row[9], newStartDate, weekday, newEndDate, row[12])
                    activities.append(copy_row)
                    print(copy_row)
                    row = cursor.fetchone()
                if len(activities) == 0:
                    copy_row = ("", "No Activities Created", "", "", "", "", "", "", "", "", "", "", "", "")
                    activities.append(copy_row)
        return activities              

    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

def fetch_user_sign_ups(username):
    netid = username #hardcoded for now

    eventids = []
    activities = []
    currDate = get_current_date()
    currTime = get_current_time()

    try:
        database_url = DATABASE_URL
        with psycopg2.connect(database_url) as connection:
            
            with connection.cursor() as cursor:
                statement = "SELECT eventid FROM signup WHERE signup_netid = %s"
                cursor.execute(statement, [netid])
                row = cursor.fetchone()
                while row is not None:
                    # print("event id :" , row[0])
                    eventids.append(row[0])
                    row = cursor.fetchone()

                statement = "SELECT * FROM events WHERE eventid = ANY(%s) AND ((startdate = %s AND starttime > %s)"
                statement += "OR %s < startdate)"
                cursor.execute(statement, [eventids, currDate, currTime, currDate])
                row = cursor.fetchone()
                while row is not None:
                    weekday = row[10].weekday()
                    newStartTime = row[2].strftime("%H:%M")
                    newEndTime = row[3].strftime("%H:%M")
                    newStartDate = row[10].strftime("%Y/%m/%d")
                    newEndDate = row[11].strftime("%Y/%m/%d")
                    copy_row = (row[0], row[1], newStartTime, newEndTime, row[4],
                    row[5], row[6], row[7], row[8], row[9], newStartDate, weekday, newEndDate, row[12])
                   # print(copy_row)
                    activities.append(copy_row)
                    row = cursor.fetchone()
                if len(activities) == 0:
                    copy_row = ("", "No User Sign Ups Yet", "", "", "",
                    "", "", "", "", "", "", "", "","")
                activities.append(copy_row)
        return activities
    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)  

    
# this is workinggggggggggggggggg
def store_activity(activity):
    title = activity['event_name']
    location = activity['location']

    print("start date in store activity: ", activity['start_time'])
    print("end time date in store activity", activity['end_time'])
    
    start_date, start_time = format_time(activity['start_time'])

    end_date, end_time = format_time(activity['end_time'])
    #endDateTime = activity['end_time']
    #converted_month_end = convert_month(endDateTime[0])
    #endDateTime = endDateTime
    #startDate = startDateTime[0].split("-")
    #endTime = endDateTime[3].split(':')
    #end_date = convert_date(int(endDateTime[2]), converted_month_end, int(endDateTime[1]))
    #end_time = convert_time(int(endTime[0]), int(endTime[1]))
    

    cap = activity['maxcap']
    cost = activity['cost']
    description = activity['description']
    category = activity['category']
    signedup_number = activity['signup_number']
    creator = activity['creator']

    try:
        database_url = DATABASE_URL
        with psycopg2.connect(database_url) as connection:
            
            with connection.cursor() as cursor:
                stmtfetcheventid = "SELECT eventid FROM eventid"
                cursor.execute(stmtfetcheventid)
                EVENT_ID = cursor.fetchone()
                EVENT_ID = EVENT_ID[0]

                statement = "INSERT INTO events VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)" 
                cursor.execute(statement, [str(EVENT_ID), title, start_time,
                end_time, str(cap), creator, category, location, description,
                str(cost), start_date, end_date, signedup_number])  

                stmtputeventid = "UPDATE eventid SET eventid = eventid + 1"
                cursor.execute(stmtputeventid)    
    except Exception as ex:
        print(ex, file=sys.stderr) 
        sys.exit(1)
    
# this is workinnggggggggggggggggg
def store_sign_up(request):
    netid = request["user_id"]
    eventid = request['event_id']
    name = request['name']
    phone_num = request['phone']
    email = request['email']
    classyear = "junior"

    try:
        database_url = DATABASE_URL
        with psycopg2.connect(database_url) as connection:
            
            with connection.cursor() as cursor:
               # day = get_day()
               # statement = "SELECT "
                statement = "SELECT signedup_number, maxcap FROM events WHERE eventid =%s "
                cursor.execute(statement, [eventid])
                row = cursor.fetchone()
                if row[0] == row[1]:
                    return "FULL"
               # UPDATE EVENTS TABLE
                statement = "UPDATE events SET signedup_number = signedup_number + 1 WHERE eventid = %s"

                cursor.execute(statement, [eventid])

                # UPDATE SIGNUP TABLE  
                store_signup(eventid, netid)
                
                # UPDATE STUDENTS TABLE
                store_student([netid, name, phone_num, email, classyear])   
        return "SUCCESSFUL"
    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

def delete_signup(event_id, username):
    eventid = event_id
    netid = username
    try:
        database_url = DATABASE_URL
        with psycopg2.connect(database_url) as connection:
            
            with connection.cursor() as cursor:
                 # UPDATE EVENTS TABLE
                statement = "UPDATE events SET signedup_number = signedup_number - 1 WHERE eventid = %s"
                cursor.execute(statement, [eventid])

                statement = "DELETE FROM signup WHERE eventid = %s AND signup_netid = %s"
                cursor.execute(statement, [eventid, netid])
    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)
        
def store_signup(event_id, net_id):

    eventid = event_id
    netid = net_id
    try:
        database_url = DATABASE_URL
        with psycopg2.connect(database_url) as connection:
            
            with connection.cursor() as cursor:
              
                # UPDATE SIGNUP TABLE  
                statement = "INSERT INTO signup VALUES(%s, %s, %s)"  
                cursor.execute(statement, (eventid, netid, 0))

    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

# def upsertStudent(netid,name, phone, email):
#     print("Inside upsertStudent()")
#     try: 
#         DATABASE_URL = DATABASE_URL
#         with psycopg2.connect(database_url) as connection:
            
#             with connection.cursor() as cursor:
#                 statement = "SELECT netid,number,name,email FROM students WHERE netid=%s"
#                 cursor.execute(statement, [netid])
#                 row = cursor.fetchone()
#                 if row is None:
#                     insertStatement = "INSERT INTO students"
#     except Exception as ex:
#         print(ex, file=sys.stderr)
#         sys.exit(1) 
#     #query student table for netid
#     #if netid in db, update fields
#     #if not, create new row in student

def store_student(student_info):
    netid = student_info[0]
    name = student_info[1]
    phone_num = student_info[2]
    email = student_info[3]
    class_year = student_info[4]
    # print("Inside store student: netid:{}, name: {}, phone: {}, email: {},  year: {}".format(netid,
    # name, phone_num, email, class_year))

    try:
        database_url = DATABASE_URL
        with psycopg2.connect(database_url) as connection:
            
            with connection.cursor() as cursor:
                
                # UPDATE STUDENTS TABLE
                statement = "INSERT INTO students VALUES(%s, %s, %s, %s, %s) "
                statement += "ON CONFLICT (netid) DO UPDATE SET name = %s, "
                statement += "number = %s, email = %s, classyear = %s"  
                cursor.execute(statement, (netid, name, phone_num, email, class_year, name,phone_num, email, class_year))
                # print("YOLO")    
                statement2 = "SELECT * FROM students WHERE netid = %s"  
                cursor.execute(statement2, [netid])  
                # print("YOLO2")   
                row = cursor.fetchone()
                if row is None:
                    print("ERROR: netid was not inserted")
                else:
                    print("Info fetched from db: {}".format(row))

    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)
        
def student_details(netid):
    # netid = 'rauniyar'
    try:
        database_url = DATABASE_URL
        with psycopg2.connect(database_url) as connection:
            
            with connection.cursor() as cursor:
                statement = "SELECT * FROM students WHERE netid LIKE %s"
                cursor.execute(statement, [netid])
                row = cursor.fetchone()
              #  print(row)
                return row
    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

def get_activity_attendees(eventid):
    #eventid = activity['event_id']
    print("in Attendees")
    attendees = []
    try:
        database_url = DATABASE_URL
        with psycopg2.connect(database_url) as connection:
            
            with connection.cursor() as cursor:
                statement = "SELECT signup_netid, name, email, number FROM signup, students WHERE eventid = %s AND signup_netid = netid"
                cursor.execute(statement, [eventid])
                row = cursor.fetchone()
                while row is not None:
                    attendee = attendeemod.Attendee(row[0], row[1], row[2], row[3])
                    attendees.append(attendee)
                    row = cursor.fetchone()
                if len(attendees) == 0:
                    text = "No Sign Ups Yet"
                    attendee = attendeemod.Attendee(text, text, text, text)
                    attendees.append(attendee)
        return attendees
    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)   

def edit_event(activity):
    eventid = activity['event_id']
    title = activity['event_name']
    location = activity['location']

    start_date, start_time = format_time(activity['start_time'])
    '''
    startDateTime = activity['start_time']
    startDateTime = startDateTime.split("T")
    startDate = startDateTime[0].split("-")
    startTime = startDateTime[1].split(":")
    start_date = convert_date(int(startDate[0]), int(startDate[1]), int(startDate[2]))
    start_time = convert_time(int(startTime[0]), int(startTime[1]))

    
    endDateTime = activity['end_time']
    endDateTime = endDateTime.split("T")
    endDate = endDateTime[0].split("-")
    endTime = endDateTime[1].split(":")
    end_date = convert_date(int(endDate[0]), int(endDate[1]), int(endDate[2]))
    end_time = convert_time(int(endTime[0]), int(endTime[1]))
    '''

    end_date, end_time = format_time(activity['end_time'])
    cap = activity['maxcap']
    cost = activity['cost']
    description = activity['description']
    category = activity['category']
    signedup_number = activity['signup_number']
    
    print("edited activity :", activity)
    try:
        database_url = DATABASE_URL
        with psycopg2.connect(database_url) as connection:
            
            with connection.cursor() as cursor:
                statement = "UPDATE events SET eventname = %s, starttime = %s, endtime = %s, maxcap = %s, category = %s, location = %s, description = %s, cost = %s, startdate = %s, enddate = %s, signedup_number = %s WHERE eventid = %s"
                cursor.execute(statement, [title, start_time, end_time, cap, category, location, description, cost, start_date, end_date, signedup_number, eventid])
                return True
    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

def delete_event(eventid):
    try:
        database_url = DATABASE_URL
        with psycopg2.connect(database_url) as connection: 
            with connection.cursor() as cursor:
                statement1 = "DELETE FROM events WHERE eventid = %s"
                cursor.execute(statement1, [eventid])

                statement2 = "DELETE FROM signup WHERE eventid = %s"
                cursor.execute(statement2, [eventid])
                return True
    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

def cancel_signup(eventid, netid):
    try:
        database_url = DATABASE_URL
        with psycopg2.connect(database_url) as connection: 
            with connection.cursor() as cursor:
                statement1 = "DELETE FROM signup WHERE eventid = %s AND signup_netid = %s"
                cursor.execute(statement1, [eventid, netid])

                statement2 = "UPDATE events SET signedup_number = signedup_number - 1 WHERE eventid = %s"
                cursor.execute(statement2, [eventid])
                return True
    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

def main():

    # if len(sys.argv) != 1:
    #     print('Usage: python display.py', file=sys.stderr)
    #     sys.exit(1)

    # start_time = datetime.time(12, 30)
    # end_time = datetime.time(13, 30)
    # date = datetime.date(2022, 11, 8)

    # store_activity(['Canoeing', 'Carnegie Lake', date, start_time, end_time, 20,
    # 100, 'Canoeing at carnegie lake', 'Off-campus'])


    res = {'start_time' : '2021-11-10T19:32:00', 
    'end_time' : '2021-11-11T20:32:00', 
    'event_name' : 'Mass Cricket', 
    'location' : 'Carnegie Lake', 
    'maxcap' : 20, 'cost' : 100, 
    'description' : 'Mass Canoeing at carnegie lake', 
    'category' : 'Off-campus', 'signup_number' : 0, 
    'creator' : 'rauniyar'}

    # store_sign_up()
    #store_activity(res) 
    # fetch_activities()
    # get_activity_attendees()
    # student_details()
    return

#-----------------------------------------------------------------------

if __name__ == '__main__':
    main()
