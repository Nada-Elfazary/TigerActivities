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
       
    print("Inside get_date: year: {}, month: {}, \
    day: {}".format(year, month, newDay))
    currDay = convert_date(year, month, newDay)
   
 
    return currDay

def fetch_activities(title, day, category, cost, capCondition, cap):
    title = '%' + title + '%'
    category = '%' + category + '%'
    if cap == '':
        cap = '%'
    try:
        database_url = DATABASE_URL
        activities = []
        currDate = get_current_date()
        currTime = get_current_time()
        print("Date: {}, time: {}".format(currDate, currTime) )
        dateLimit = get_date_limit()
        with psycopg2.connect(database_url) as connection:            
            with connection.cursor() as cursor:
                statementOne = "SELECT * FROM events WHERE startdate = %s AND starttime > %s "
                statementOne += "AND eventname LIKE %s AND category LIKE %s"
                # AND maxcap %s %s"
                if cost != "all":
                    statementOne += "AND COST <= %s"
                    cursor.execute(statementOne, [currDate, currTime, title, category, cost])
                
                else:
                    cursor.execute(statementOne, [currDate, currTime, title, category])  

                row = cursor.fetchone()
                print("row is", row)
                while row is not None:
                    weekday = row[10].weekday()
                    print("The day of the week for date {} is {}\n. Current day: {}".format(row[10], weekday, day))
                    print("**********weekday: ", weekday)
                    if day != "" and weekday != int(day):
                        row = cursor.fetchone()
                        continue
                    print("Appending row")
                    newStartTime = row[2].strftime("%H:%M")
                    newEndTime = row[3].strftime("%H:%M")
                    newStartDate = row[10].strftime("%Y/%m/%d")
                    newEndDate = row[11].strftime("%Y/%m/%d")
                  
                    copy_row = (row[0], row[1], newStartTime, newEndTime, row[4],
                    row[5], row[6], row[7], row[8], row[9], newStartDate, weekday, newEndTime, row[12])
                    print("copy rowwwww: ", copy_row)
                    activities.append(copy_row)
                    row = cursor.fetchone()

                statementTwo = "SELECT * FROM events WHERE %s < startdate AND startdate < %s"
                statementTwo += "AND eventname LIKE %s AND category LIKE %s" 
                #AND maxcap %s %s"
                statementOne += "ORDER BY RANDOM() LIMIT 1000"
               # AND eventname LIKE %s
                if cost != "all":
                    statementTwo += "AND COST <= %s"
                    cursor.execute(statementTwo, [currDate, dateLimit, title, category, cost])
                
                else:
                    cursor.execute(statementTwo, [currDate, dateLimit, title, category]) 
                print ("after second execute")
                row = cursor.fetchone()
                print("Date: ", get_current_date(), "+ 5 days")
                while row is not None:
                    weekday = row[10].weekday()
                    print("The day of the week for date {} is {}. Current day: {}\n".format(row[10], weekday, day))
                    if day != "" and weekday != int(day):
                        row = cursor.fetchone()
                        continue
                    print("Appending row")
                    newStartTime = row[2].strftime("%H:%M")
                    newEndTime = row[3].strftime("%H:%M")
                    newStartDate = row[10].strftime("%Y/%m/%d")
                    newEndDate = row[11].strftime("%Y/%m/%d")
                    copy_row = (row[0], row[1], newStartTime, newEndTime, row[4],
                    row[5], row[6], row[7], row[8], row[9], newStartDate, weekday, newEndDate, row[12])
                   # print(copy_row)
                    activities.append(copy_row)
                    row = cursor.fetchone()

        return activities              

    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

def fetch_user_sign_ups():
    netid = "fifth" #hardcoded for now

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
                    print("event id :" , row[0])
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

        return activities
    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)  

    
# this is workinggggggggggggggggg
def store_activity(activity):
    title = activity['event_name']
    location = activity['location']

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
                # how to actually check if the event id is unique and not duplicate
                # statement += " ON CONFLICT (events.eventid) DO UPDATE SET events.title = %s, 
                # events.location = %s, events.startdate = %s, events.enddate = %s, events.starttime = %s, 
                # events.endtime = %s, events.capacity = %s, events.cost = %s, events.description = %s, 
                # events.category = %s, events.creator = %s"
                cursor.execute(statement, [str(EVENT_ID), title, start_time,
                end_time, str(cap), creator, category, location, description,
                str(cost), start_date, end_date, signedup_number])  

                stmtputeventid = "UPDATE eventid SET eventid = eventid + 1"
                cursor.execute(stmtputeventid)    
    except Exception as ex:
        print(ex, file=sys.stderr) 
        sys.exit(1)
    
# this is workinnggggggggggggggggg
def store_sign_up(activity):
    netid = 'last' #hardcoded for now
    eventid = activity['event_id']
    name = activity['name']
    phone_num = activity['phone']
    email = activity['email']
    classyear = "junior"

    try:
        database_url = DATABASE_URL
        with psycopg2.connect(database_url) as connection:
            
            with connection.cursor() as cursor:
               # day = get_day()
               # statement = "SELECT "

               # UPDATE EVENTS TABLE
                statement = "UPDATE events SET signedup_number = signedup_number + 1 WHERE eventid = %s"

                cursor.execute(statement, [eventid])

                # UPDATE SIGNUP TABLE  
                store_signup(eventid, netid)
                
                # UPDATE STUDENTS TABLE
                store_student([netid, name, phone_num, email, classyear])   

    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

def delete_signup(event_id):
    eventid = event_id
    netid = "fifth"
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

def store_student(student_info):
    netid = student_info[0]
    name = student_info[1]
    phone_num = student_info[2]
    email = student_info[3]
    classyear = student_info[4]

    try:
        database_url = DATABASE_URL
        with psycopg2.connect(database_url) as connection:
            
            with connection.cursor() as cursor:
                
                # UPDATE STUDENTS TABLE
                statement = "INSERT INTO students VALUES(%s, %s, %s, %s, %s) "
                # statement += "ON CONFLICT (netid) DO UPDATE SET students.name = %s, "
                # statement += "students.phone_num = %s, students.email = %s, students.classyear = %s"  
                cursor.execute(statement, (netid, name, phone_num, email, classyear))    

    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)
        
def student_details():
    netid = 'rauniyar'
    try:
        database_url = DATABASE_URL
        with psycopg2.connect(database_url) as connection:
            
            with connection.cursor() as cursor:
                statement = "SELECT * FROM students WHERE netid = %s"
                cursor.execute(statement, [netid])
                row = cursor.fetchone()
              #  print(row)
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
