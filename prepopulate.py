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
                #Changed some of the days to have a better variety ~ Nada
                cursor.execute("INSERT INTO events VALUES (1, 'Coffee Break', 130, 220, 3, 'Sriyans', 'Category 1', 'Dod Hall', 'Description 1', 10, 1, 1)")
                cursor.execute("INSERT INTO events VALUES (2, 'Drinks Break', 11, 12, 6, 'Reuben', 'Category 2', 'Mud Hall', 'Description 2', 100, 2, 1)")
                cursor.execute("INSERT INTO events VALUES (3, 'Study Break', 450, 520, 3, 'Anca', 'Category 3', 'Bud Hall', 'Description 1', 1000, 3, 1)")
                cursor.execute("INSERT INTO events VALUES (4, 'This Break', 900, 1040, 3, 'Karim', 'Category 1', 'Peyton Hall', 'Description 1', 3, 2, 1)")
                cursor.execute("INSERT INTO events VALUES (5, 'That Break', 1040, 1230, 15, 'Nada', 'Category 7', 'Lovely Hall', 'Description 1', 5, 3, 1)")
                cursor.execute("INSERT INTO events VALUES (6, 'Headache', 0000, 2400, 3, 'Sriyans', 'Category 1', 'Fancy Hall', 'Description 9', 1, 6, 1)")
                cursor.execute("INSERT INTO events VALUES (7, 'No Break', 0000, 0001, 3, 'Anca', 'Category 1', 'Okay Hall', 'Description 6', 1, 7, 1)")
                cursor.execute("INSERT INTO events VALUES (8, 'Long Break', 0900, 2300, 1, 'Karim', 'Category 3', 'Not okay Hall', 'Description 1', 1, 3, 1)")
                cursor.execute("INSERT INTO events VALUES (9, 'Short Break', 1040, 1290, 53, 'Nada', 'Category 6', 'Nice Hall', 'Description 56', 1, 4, 1)")
                cursor.execute("INSERT INTO events VALUES (10, 'Mini Break', 1456, 2334, 43, 'Sriyans', 'Category 2', 'Secret Hall', 'Description 1', 1, 2, 1)")

                cursor.execute("INSERT INTO signup VALUES (1, 'srauniyar', 0, 1)")
                cursor.execute("INSERT INTO signup VALUES (2, 'kelbarbary', 0, 1)")
                cursor.execute("INSERT INTO signup VALUES (3, 'ragogoe', 0, 1)")
                cursor.execute("INSERT INTO signup VALUES (4, 'nada', 0, 1)")
                cursor.execute("INSERT INTO signup VALUES (5, 'anca', 0, 1)")
                cursor.execute("INSERT INTO signup VALUES (6, 'nada', 0, 1)")
                cursor.execute("INSERT INTO signup VALUES (7, 'anca', 0, 1)")
                cursor.execute("INSERT INTO signup VALUES (8, 'reuben', 0, 1)")
                cursor.execute("INSERT INTO signup VALUES (9, 'karim', 0, 1)")
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
