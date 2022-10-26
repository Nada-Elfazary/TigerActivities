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

                cursor.execute("INSERT INTO events VALUES (1, 'Event 1', 1, 2, 3, 'Sriyans', 'Category 1', 'Location 1', 'Description 1', 1)")
                cursor.execute("INSERT INTO events VALUES (2, 'Event 2', 1, 2, 3, 'Sriyans', 'Category 2', 'Location 2', 'Description 2', 2)")
                cursor.execute("INSERT INTO events VALUES (3, 'Event 3', 1, 2, 3, 'Sriyans', 'Category 3', 'Location 3', 'Description 3', 3)")
                cursor.execute("INSERT INTO events VALUES (4, 'Event 4', 1, 2, 3, 'Sriyans', 'Category 4', 'Location 4', 'Description 4', 4)")
                cursor.execute("INSERT INTO events VALUES (5, 'Event 5', 1, 2, 3, 'Sriyans', 'Category 5', 'Location 5', 'Description 5', 5)")
                cursor.execute("INSERT INTO events VALUES (6, 'Event 6', 1, 2, 3, 'Sriyans', 'Category 6', 'Location 6', 'Description 6', 6)")
                cursor.execute("INSERT INTO events VALUES (7, 'Event 7', 1, 2, 3, 'Sriyans', 'Category 7', 'Location 7', 'Description 7', 7)")
                cursor.execute("INSERT INTO events VALUES (8, 'Event 8', 1, 2, 3, 'Sriyans', 'Category 8', 'Location 8', 'Description 8', 8)")
                cursor.execute("INSERT INTO events VALUES (9, 'Event 9', 1, 2, 3, 'Sriyans', 'Category 9', 'Location 9', 'Description 9', 9)")
                cursor.execute("INSERT INTO events VALUES (10, 'Event 10', 1, 2, 3, 'Sriyans', 'Category 10', 'Location 10', 'Description 10', 10)")

                cursor.execute("INSERT INTO signup VALUES (1, 'srauniyar', 'srauniyar', 'True')")
                cursor.execute("INSERT INTO signup VALUES (2, 'kelbarbary', 'kelbarbary', 'True')")
                cursor.execute("INSERT INTO signup VALUES (3, 'srauniyar', 'kelbarbary', 'True')")
                cursor.execute("INSERT INTO signup VALUES (4, 'kelbarbary', 'srauniyar', 'True')")
                cursor.execute("INSERT INTO signup VALUES (5, 'srauniyar', 'kelbarbary', 'True')")
                cursor.execute("INSERT INTO signup VALUES (6, 'kelbarbary', 'srauniyar', 'True')")
                cursor.execute("INSERT INTO signup VALUES (7, 'srauniyar', 'kelbarbary', 'True')")
                cursor.execute("INSERT INTO signup VALUES (8, 'kelbarbary', 'srauniyar', 'True')")
                cursor.execute("INSERT INTO signup VALUES (9, 'srauniyar', 'kelbarbary', 'True')")
                cursor.execute("INSERT INTO signup VALUES (10, 'kelbarbary', 'srauniyar', 'True')")

                cursor.execute("INSERT INTO students VALUES ('rauniyar', 1, 'Sriyans', 999999999, 'rauniyar@princeton.edu')")
                cursor.execute("INSERT INTO students VALUES ('kelbarbary', 1, 'Karim', 999999999, 'karime@princeton.edu')")
                cursor.execute("INSERT INTO students VALUES ('nada', 1, 'Nada', 999999999, 'nada@princeton.edu')")
                cursor.execute("INSERT INTO students VALUES ('ragogoe', 1, 'Reuben', 999999999, 'ragogoe@princeton.edu')")

    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

#-----------------------------------------------------------------------

if __name__ == '__main__':
    main()
