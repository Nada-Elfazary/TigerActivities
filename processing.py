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

def main():

    if len(sys.argv) != 1:
        print('Usage: python display.py', file=sys.stderr)
        sys.exit(1)

    #try:
    database_url = DATABASE_URL

    with psycopg2.connect(database_url) as connection:
        
        with connection.cursor() as cursor:
            day = 4
            statementOne = "SELECT * FROM events WHERE day = %s AND starttime > %s"
            cursor.execute(statementOne, (day, get_time()))
            row = cursor.fetchone()
            print(day, ": ")
            while row is not None:
                print(row)
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

                print(curr_day, ": ")
                while row is not None:
                    print(row)
                    row = cursor.fetchone()

                curr_day += 1
                curr_day = curr_day % 7

                if (curr_day == 0):
                    curr_day = 7


                

   # except Exception as ex:
  #      print(ex, file=sys.stderr)
  #      sys.exit(1)

#-----------------------------------------------------------------------

if __name__ == '__main__':
    main()
