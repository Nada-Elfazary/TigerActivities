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
    currDay = datetime.datetime.now(pytz.timezone('US/Central'))
    currDay = currDay.strftime("%Y/%m/%d")
    return currDay

def get_current_time():
    currTime = datetime.datetime.now(pytz.timezone('US/Central'))
    currTime = currTime.strftime("%H:%M")
    return currTime

def convert_date(year, month, day):
    date = datetime.date(year, month, day)
    return date

def convert_time(hour, minute):
    time = datetime.time(hour, minute)
    return time

def get_date_limit():
    currDay = datetime.datetime.now(pytz.timezone('US/Central'))
    year = currDay.year
    month = currDay.month
    newDay = currDay.day + 6
    if newDay > 30:
        month += 1
        newDay = newDay - 30
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
                statementOne = "SELECT * FROM events WHERE date = %s AND starttime > %s"
                cursor.execute(statementOne, [currDate, currTime])
                row = cursor.fetchone()
                print("Date: ", get_current_date())
                while row is not None:
                    print(row)
                    activities.append(row)
                    row = cursor.fetchone()

                statementTwo = "SELECT * FROM events WHERE %s < date AND date < %s ORDER BY RANDOM() LIMIT 1000"
                cursor.execute(statementTwo, [currDate, dateLimit])
                row = cursor.fetchone()
                print("Date: ", get_current_date(), "+ 5 days")
                while row is not None:
                    print(row)
                    activities.append(row)
                    row = cursor.fetchone()

        return activities              

    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

# this is workinggggggggggggggggg
def store_activity():
    title = "New Activity"
    location = "New Location"
    date = convert_date(2022, 11, 8)
    start_time = convert_time(15, 30)
    end_time = convert_time(16, 30)
    cap = 10
    cost = 100
    description = "Haha haha haha haha"
    category = "Category7"

    #******
    creator = 'choppercabras'

    try:
        database_url = DATABASE_URL
        event_id = 11
        with psycopg2.connect(database_url) as connection:
            
            with connection.cursor() as cursor:
                statement = "INSERT INTO events VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)" 
                # how to actually check if the event id is unique and not duplicate
                # statement += " ON CONFLICT (events.eventid) DO NOTHING"
                cursor.execute(statement, [event_id, title, start_time,
                end_time, cap, creator, category, location, description,
                cost, date, 0])            

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
                statement = "INSERT INTO students VALUES(%s, %s, %s, %s, %s)"  
                cursor.execute(statement, (netid, name, phone_num, email, classyear))    

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

    store_sign_up()
    store_activity() 
    fetch_activities()

#-----------------------------------------------------------------------

if __name__ == '__main__':
    main()
