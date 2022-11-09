#!/usr/bin/env python

#-----------------------------------------------------------------------
# displaydb.py
# Author: Sriyans Rauniyar
#-----------------------------------------------------------------------
from audioop import tomono
import sys
import psycopg2
import datetime
import pytz
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
    if newDay > 31:
        month += 1
        newDay = newDay - 31
    currDay = convert_date(year, month, newDay)
    return currDay

def fetch_activities():
    try:
        database_url = DATABASE_URL
        activities = []
        currDate = get_current_date()
        currTime = get_current_time()
        dateLimit = get_date_limit()
        with psycopg2.connect(database_url) as connection:            
            with connection.cursor() as cursor:
                statementOne = "SELECT * FROM events WHERE startdate = %s AND starttime > %s"
                cursor.execute(statementOne, [currDate, currTime])
                row = cursor.fetchone()
                print("Date: ", get_current_date())
                while row is not None:
                    newStartTime = row[2].strftime("%H:%M")
                    newEndTime = row[3].strftime("%H:%M")
                    newStartDate = row[10].strftime("%Y/%m/%d")
                    newEndDate = row[11].strftime("%Y/%m/%d")
                    copy_row = (row[0], row[1], newStartTime, newEndTime, row[4],
                    row[5], row[6], row[7], row[8], row[9], newStartDate, newEndTime, row[12])
                    print(copy_row)
                    activities.append(copy_row)
                    row = cursor.fetchone()

                statementTwo = "SELECT * FROM events WHERE %s < startdate AND startdate < %s ORDER BY RANDOM() LIMIT 1000"
                cursor.execute(statementTwo, [currDate, dateLimit])
                row = cursor.fetchone()
                print("Date: ", get_current_date(), "+ 5 days")
                while row is not None:
                    newStartTime = row[2].strftime("%H:%M")
                    newEndTime = row[3].strftime("%H:%M")
                    newStartDate = row[10].strftime("%Y/%m/%d")
                    newEndDate = row[11].strftime("%Y/%m/%d")
                    copy_row = (row[0], row[1], newStartTime, newEndTime, row[4],
                    row[5], row[6], row[7], row[8], row[9], newStartDate, newEndDate, row[12])
                    print(copy_row)
                    activities.append(copy_row)
                    row = cursor.fetchone()

        return activities              

    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

# this is workinggggggggggggggggg
def store_activity(res):
    title = res['event_name']
    location = res['location']
    
    time = res['start_time']
    print(time)
    split_time = time.split('T')
    start_date = split_time[0].split('-')
    split_time_start = split_time[1].split(':')
    print("split",start_date )
    start_date = convert_date(int(start_date[0]), int(start_date[1]), int(start_date[2]))
    end_date = convert_date(2022, 11, 11)
    start_time = convert_time(int(split_time_start[0]), int(split_time_start[1]))
    end_time = convert_time(16, 30)
    cap = 10
    cost = 100
    description = res['description']
    category = res['category']
    EVENT_ID = 100

    #******
    creator = 'reubenSriyans'

    try:
        database_url = DATABASE_URL
        with psycopg2.connect(database_url) as connection:
            
            with connection.cursor() as cursor:
                statement = "INSERT INTO events VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)" 
                # how to actually check if the event id is unique and not duplicate
                # statement += " ON CONFLICT (events.eventid) DO UPDATE SET events.title = %s, events.location = %s, events.startdate = %s, events.enddate = %s, events.starttime = %s, events.endtime = %s, events.capacity = %s, events.cost = %s, events.description = %s, events.category = %s, events.creator = %s"
                cursor.execute(statement, [str(EVENT_ID), title, start_time,
                end_time, str(cap), creator, category, location, description,
                str(cost), start_date, end_date])  
                print("done")
        EVENT_ID += 1          
    except Exception as ex:
        print(ex, file=sys.stderr) 
        sys.exit(1)

# this is workinnggggggggggggggggg
def store_sign_up():
    netid = 'checkcheck' #hardcoded for now
    eventid = 10
    name = "I am check"
    phone_num = "1212141414"
    email = "hahahaha@gmail.haha"
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
                statement = "INSERT INTO signup VALUES(%s, %s, %s)"  
                cursor.execute(statement, (eventid, netid, 0))
                
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
                print(row)
    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

def get_activity_attendees():
    eventid = 1
    try:
        database_url = DATABASE_URL
        with psycopg2.connect(database_url) as connection:
            
            with connection.cursor() as cursor:
                statement = "SELECT signup_netid FROM signup WHERE eventid = %s"
                cursor.execute(statement, [eventid])
                row = cursor.fetchone()
                while row is not None:
                    print(row[0])
                    row = cursor.fetchone()
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

    # store_sign_up()
    # store_activity() 
    # fetch_activities()
    # get_activity_attendees()
    # student_details()
    return

#-----------------------------------------------------------------------

if __name__ == '__main__':
    main()