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

                cursor.execute("INSERT INTO signup VALUES (1, 'srauniyar', 'srauniyar', 'True')")
                cursor.execute("INSERT INTO signup VALUES (2, 'kelbarbary', 'kelbarbary', 'True')")

                cursor.execute("INSERT INTO students VALUES ('rauniyar', 1, 'Sriyans', 999999999, 'rauniyar@princeton.edu')")
                cursor.execute("INSERT INTO students VALUES ('kelbarbary', 1, 'Karim', 999999999, 'karime@princeton.edu')")

    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

#-----------------------------------------------------------------------

if __name__ == '__main__':
    main()
