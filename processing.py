#!/usr/bin/env python

#-----------------------------------------------------------------------
# displaydb.py
# Author: Sriyans Rauniyar
#-----------------------------------------------------------------------
from audioop import tomono
import sys
import psycopg2
import datetime
#-----------------------------------------------------------------------
DATABASE_URL = 'postgres://hwwlwcbv:hyNZQS9_LH8CSD3yQoc5IpDHkBJeSlhF@peanut.db.elephantsql.com/hwwlwcbv'

DICT_DAY = {0: "Monday", 1: "Tuesday", 2: "Wednesday", 3: "Thursday", 4: "Friday", 5: "Saturday", 6: "Sunday"}

EVENT_ID = 10 #??

def get_day():
    return datetime.datetime.now().weekday()

def get_time():
    current_time = datetime.datetime.now().time()
    current_hour = current_time.hour
    return current_hour

def fetch_activities():
    try:
        database_url = DATABASE_URL

        activities = []
        with psycopg2.connect(database_url) as connection:
            
            with connection.cursor() as cursor:
                day = get_day()
                statementOne = "SELECT * FROM events WHERE day = %s AND starttime > %s"
                cursor.execute(statementOne, (day, get_time()))
                row = cursor.fetchone()
                print("Day", day, ": ")
                while row is not None:
                    print(row)
                    activities.append(row)
                    row = cursor.fetchone()

                tomorrow = (day + 1)%7
                endDay = (day + 5)%7
                if tomorrow == 0:
                    tomorrow =7
                if endDay == 0:
                    endDay = 7

                curr_day = tomorrow
                while (curr_day != endDay):
                    # select at random from DB instead of shuffling...which is faster?
                    statementTwo = "SELECT * FROM events WHERE day = %s ORDER BY RANDOM() LIMIT 1000"
                    cursor.execute(statementTwo, [curr_day, ])
                    row = cursor.fetchone()

                    print("Day", curr_day, ": ")
                    while row is not None:
                        print(row)
                        activities.append(row)
                        row = cursor.fetchone()

                    curr_day += 1
                    curr_day = curr_day % 7

                    if (curr_day == 0):
                        curr_day = 7  

        return activities              

    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

def store_activity(activity):
    title = activity[0]
    location = activity[1]
    date = activity[2]
    start_time = activity[3]
    end_time = activity[4]
    cap = activity[5]
    cost = activity[6]
    description = activity[7]
    category = activity[8]

    #******
    creator = 'elfazary'

    try:
        database_url = DATABASE_URL
        event_id = EVENT_ID+1
        with psycopg2.connect(database_url) as connection:
            
            with connection.cursor() as cursor:
                day = get_day()
                statement = "INSERT INTO events VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(statement, (event_id, title, start_time,
                end_time, cap, creator, category, location, description,
                cost, date, 0))            

    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

def store_sign_up(sign_up):
    netid = 'elfazary' #hardcoded for now
    eventid = sign_up[0]
    name = sign_up[1]
    phone_num = sign_up[2]
    email = sign_up[3]


    try:
        database_url = DATABASE_URL
        with psycopg2.connect(database_url) as connection:
            
            with connection.cursor() as cursor:
                day = get_day()
               # statement = "SELECT "

               # UPDATE EVENTS TABLE
                statement = "UPDATE events SET signedup_number"
                + "= %s WHERE eventid = %s"

                cursor.execute(statement, ('signedup_number + 1', eventid))

                # UPDATE SIGNUP TABLE
                statement = "INSERT INTO signup VALUES"
                + "(%s, %s, %s)"  
                cursor.execute(statement, (eventid, netid, 0))       

    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)






def main():

    if len(sys.argv) != 1:
        print('Usage: python display.py', file=sys.stderr)
        sys.exit(1)

    start_time = datetime.time(12, 30)
    end_time = datetime.time(13, 30)
    date = datetime.date(2022, 11, 8)

    store_activity(['Canoeing', 'Carnegie Lake', date, start_time, end_time, 20,
    100, 'Canoeing at carnegie lake', 'Off-campus'])

    fetch_activities()

    

#-----------------------------------------------------------------------

if __name__ == '__main__':
    main()
