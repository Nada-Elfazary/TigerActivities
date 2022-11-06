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

def get_day():
    return datetime.datetime.now().weekday()

def get_time():
    current_time = datetime.datetime.now().time()
    current_hour = current_time.hour
    return current_hour

def get_all():
    ans = []
    try:
        database_url = DATABASE_URL

        with psycopg2.connect(database_url) as connection:

            with connection.cursor() as cursor:
                print("Hello", cursor)
                statementOne = "SELECT * FROM events"
                cursor.execute(statementOne)
                print("was able to execute statement", cursor)
                row = cursor.fetchone()
                print("row", row)
                while row is not None:
                    print(row)
                    ans.append(row)
                    row = cursor.fetchone()
    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)
    return ans



def main():

    if len(sys.argv) != 1:
        print('Usage: python display.py', file=sys.stderr)
        sys.exit(1)
    
    get_all()
    print("**Finished querrying db**")

    try:
        database_url = DATABASE_URL

        with psycopg2.connect(database_url) as connection:

            with connection.cursor() as cursor:
                print("Hello", cursor)
                statementOne = "SELECT * FROM events WHERE day = %s AND starttime > %s"
                cursor.execute(statementOne, (str(get_day()), str(get_time())))
                print("was able to execute statement", cursor)
                row = cursor.fetchone()
                print("row", row)
                while row is not None:
                    print(row)
                    row = cursor.fetchone()
                tomorrow = str((get_day() + 1)%7)
                endDay = str((get_day() + 5)%7)
                print("dates: ", tomorrow, endDay)
                
                # I don't think this will work either. If we log in on Friday, Saturday
                # intervals would be (5 2), (6 3) and we would still have the same problem 

                # if tomorrow == 0:
                #     tomorrow =7
                # if endDay == 0:
                #     endDay = 7

                # statementTwo = "SELECT * FROM events WHERE day >= %s" 
                # + "AND day  <= %s GROUP BY day"

                if tomorrow > endDay:
                    statementTwo = "SELECT * FROM events WHERE day >= %s" \
                + "OR day  <= %s GROUP BY day"

                else:
                    statementTwo = "SELECT * FROM events WHERE day >= %s" \
                + "AND day  <= %s GROUP BY events.eventid, day"
                
                cursor.execute(statementTwo, [tomorrow, endDay])
                row = cursor.fetchone()
                while row is not None:
                    print(row)
                    row = cursor.fetchone()

    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

#-----------------------------------------------------------------------

if __name__ == '__main__':
    main()
