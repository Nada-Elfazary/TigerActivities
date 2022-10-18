#!/usr/bin/env python

#-----------------------------------------------------------------------
# displaydb.py
# Author: Sriyans Rauniyar
#-----------------------------------------------------------------------
import sys
import psycopg2
#-----------------------------------------------------------------------
DATABASE_URL = 'postgres://hwwlwcbv:hyNZQS9_LH8CSD3yQoc5IpDHkBJeSlhF@peanut.db.elephantsql.com/hwwlwcbv'

def main():

    if len(sys.argv) != 1:
        print('Usage: python display.py', file=sys.stderr)
        sys.exit(1)

    try:
        database_url = DATABASE_URL

        with psycopg2.connect(database_url) as connection:

            with connection.cursor() as cursor:

                print('-------------------------------------------')
                print('events')
                print('-------------------------------------------')
                cursor.execute("SELECT * FROM events")
                row = cursor.fetchone()
                while row is not None:
                    print(row)
                    row = cursor.fetchone()

                print('-------------------------------------------')
                print('signup')
                print('-------------------------------------------')
                cursor.execute("SELECT * FROM signup")
                row = cursor.fetchone()
                while row is not None:
                    print(row)
                    row = cursor.fetchone()

                print('-------------------------------------------')
                print('students')
                print('-------------------------------------------')
                cursor.execute("SELECT * FROM students")
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
