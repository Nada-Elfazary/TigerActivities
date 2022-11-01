#!/usr/bin/env python

#-----------------------------------------------------------------------
# prepopulate.py
# Author: Sriyans Rauniyar
#-----------------------------------------------------------------------
import sys
import psycopg2
#-----------------------------------------------------------------------
DATABASE_URL = 'postgres://hwwlwcbv:hyNZQS9_LH8CSD3yQoc5IpDHkBJeSlhF@peanut.db.elephantsql.com/hwwlwcbv'

def main():

    if len(sys.argv) != 1:
        print('Usage: python create.py', file=sys.stderr)
        sys.exit(1)

    try:
        database_url = DATABASE_URL

        with psycopg2.connect(database_url) as connection:

            with connection.cursor() as cursor:

                #-------------------------------------------------------

                cursor.execute("INSERT INTO events VALUES (1, 'Event 1', 1, 2, 3, 'Sriyans', 'Category 1', 'Location 1', 'Description 1', 1, 1, 1)")
                cursor.execute("INSERT INTO events VALUES (2, 'Event 2', 1, 2, 3, 'Sriyans', 'Category 1', 'Location 1', 'Description 1', 1, 2, 1)")
                cursor.execute("INSERT INTO events VALUES (3, 'Event 3', 1, 2, 3, 'Sriyans', 'Category 1', 'Location 1', 'Description 1', 1, 1, 1)")
                cursor.execute("INSERT INTO events VALUES (4, 'Event 4', 1, 2, 3, 'Sriyans', 'Category 1', 'Location 1', 'Description 1', 1, 2, 1)")
                cursor.execute("INSERT INTO events VALUES (5, 'Event 5', 1, 2, 3, 'Sriyans', 'Category 1', 'Location 1', 'Description 1', 1, 1, 1)")
                cursor.execute("INSERT INTO events VALUES (6, 'Event 6', 1, 2, 3, 'Sriyans', 'Category 1', 'Location 1', 'Description 1', 1, 2, 1)")
                cursor.execute("INSERT INTO events VALUES (7, 'Event 7', 1, 2, 3, 'Sriyans', 'Category 1', 'Location 1', 'Description 1', 1, 1, 1)")
                cursor.execute("INSERT INTO events VALUES (8, 'Event 8', 1, 2, 3, 'Sriyans', 'Category 1', 'Location 1', 'Description 1', 1, 2, 1)")
                cursor.execute("INSERT INTO events VALUES (9, 'Event 9', 1, 2, 3, 'Sriyans', 'Category 1', 'Location 1', 'Description 1', 1, 1, 1)")
                cursor.execute("INSERT INTO events VALUES (10, 'Event 10', 1, 2, 3, 'Sriyans', 'Category 1', 'Location 1', 'Description 1', 1, 2, 1)")

                cursor.execute("INSERT INTO signup VALUES (1, 'srauniyar', 0, 1)")
                cursor.execute("INSERT INTO signup VALUES (2, 'srauniyar', 0, 1)")
                cursor.execute("INSERT INTO signup VALUES (3, 'srauniyar', 0, 1)")
                cursor.execute("INSERT INTO signup VALUES (4, 'srauniyar', 0, 1)")
                cursor.execute("INSERT INTO signup VALUES (5, 'srauniyar', 0, 1)")
                cursor.execute("INSERT INTO signup VALUES (6, 'srauniyar', 0, 1)")
                cursor.execute("INSERT INTO signup VALUES (7, 'srauniyar', 0, 1)")
                cursor.execute("INSERT INTO signup VALUES (8, 'srauniyar', 0, 1)")
                cursor.execute("INSERT INTO signup VALUES (9, 'srauniyar', 0, 1)")
                cursor.execute("INSERT INTO signup VALUES (10, 'srauniyar', 0, 1)")

                cursor.execute("INSERT INTO students VALUES('rauniyar', 1, 'Sriyans', '9999999999', 'rauniyar@princeton.edu')")
                cursor.execute("INSERT INTO students VALUES('rauniyar', 2, 'Sriyans', '9999999999', 'rauniyar@princeton.edu')")
                cursor.execute("INSERT INTO students VALUES('rauniyar', 3, 'Sriyans', '9999999999', 'rauniyar@princeton.edu')")
                cursor.execute("INSERT INTO students VALUES('rauniyar', 4, 'Sriyans', '9999999999', 'rauniyar@princeton.edu')")
                cursor.execute("INSERT INTO students VALUES('rauniyar', 5, 'Sriyans', '9999999999', 'rauniyar@princeton.edu')")
                cursor.execute("INSERT INTO students VALUES('rauniyar', 6, 'Sriyans', '9999999999', 'rauniyar@princeton.edu')")
                cursor.execute("INSERT INTO students VALUES('rauniyar', 7, 'Sriyans', '9999999999', 'rauniyar@princeton.edu')")
                cursor.execute("INSERT INTO students VALUES('rauniyar', 8, 'Sriyans', '9999999999', 'rauniyar@princeton.edu')")
                cursor.execute("INSERT INTO students VALUES('rauniyar', 9, 'Sriyans', '9999999999', 'rauniyar@princeton.edu')")
                cursor.execute("INSERT INTO students VALUES('rauniyar', 10, 'Sriyans', '9999999999', 'rauniyar@princeton.edu')")
    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

#-----------------------------------------------------------------------

if __name__ == '__main__':
    main()
