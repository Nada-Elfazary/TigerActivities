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
                cursor.execute("INSERT INTO events VALUES (1, 'Coffee Break', '1:30', '2:20', 3, 'Sriyans', 'Category 1', 'Dod Hall', 'Description 1', 10, '2022/01/23', '2022/01/23', 1)")
                cursor.execute("INSERT INTO events VALUES (2, 'Drinks Break', '1:10', '1:20', 6, 'Reuben', 'Category 2', 'Mud Hall', 'Description 2', 100, '2022/10/24', '2022/10/24', 1)")
                cursor.execute("INSERT INTO events VALUES (3, 'Study Break', '4:50', '5:20', 3, 'Anca', 'Category 3', 'Bud Hall', 'Description 1', 1000, '2022/11/08', '2022/11/08', 1)")
                cursor.execute("INSERT INTO events VALUES (4, 'This Break', '9:00', '10:40', 3, 'Karim', 'Category 1', 'Peyton Hall', 'Description 1', 3, '2021/10/23', '2022/10/23', 1)")
                cursor.execute("INSERT INTO events VALUES (5, 'That Break', '10:40', '12:30', 15, 'Nada', 'Category 7', 'Lovely Hall', 'Description 1', 5, '2021/10/24', '2021/10/24', 1)")
                cursor.execute("INSERT INTO events VALUES (6, 'Headache', '00:00', '23:59', 3, 'Sriyans', 'Category 1', 'Fancy Hall', 'Description 9', 1, '2022/08/09', '2022/08/09', 1)")
                cursor.execute("INSERT INTO events VALUES (7, 'No Break', '00:00', '00:01', 3, 'Anca', 'Category 1', 'Okay Hall', 'Description 6', 1, '2022/11/13', '2022/11/13', 1)")
                cursor.execute("INSERT INTO events VALUES (8, 'Long Break', '09:00', '23:00', 1, 'Karim', 'Category 3', 'Not okay Hall', 'Description 1', 1, '2022/12/27', '2022/12/27', 1)")
                cursor.execute("INSERT INTO events VALUES (9, 'Short Break', '10:40', '12:40', 53, 'Nada', 'Category 6', 'Nice Hall', 'Description 56', 1, '2022/12/16', '2022/12/16', 1)")
                cursor.execute("INSERT INTO events VALUES (10, 'Mini Break', '14:56', '23:34', 43, 'Sriyans', 'Category 2', 'Secret Hall', 'Description 1', 1, '2021/12/23', '2021/12/23', 1)")

                cursor.execute("INSERT INTO signup VALUES (1, 'srauniyar', 0)")
                cursor.execute("INSERT INTO signup VALUES (2, 'kelbarbary', 0)")
                cursor.execute("INSERT INTO signup VALUES (3, 'ragogoe', 0)")
                cursor.execute("INSERT INTO signup VALUES (4, 'nada', 0)")
                cursor.execute("INSERT INTO signup VALUES (5, 'anca', 0)")
                cursor.execute("INSERT INTO signup VALUES (6, 'nada', 0)")
                cursor.execute("INSERT INTO signup VALUES (7, 'anca', 0)")
                cursor.execute("INSERT INTO signup VALUES (8, 'reuben', 0)")
                cursor.execute("INSERT INTO signup VALUES (9, 'karim', 0)")
                cursor.execute("INSERT INTO signup VALUES (10, 'srauniyar', 0)")

                cursor.execute("INSERT INTO students VALUES('rauniyar', 'Sriyans', '9999999999', 'rauniyar@princeton.edu', 'sophomore')")
                cursor.execute("INSERT INTO students VALUES('ragogoe', 'Reuben', '9999999999', 'rauniyar@princeton.edu', 'junior')")
                cursor.execute("INSERT INTO students VALUES('karime', 'Karim', '9999999999', 'rauniyar@princeton.edu', 'junior')")
                cursor.execute("INSERT INTO students VALUES('elfazary', 'Nada', '9999999999', 'rauniyar@princeton.edu', 'senior')")
                cursor.execute("INSERT INTO students VALUES('rauniyar', 'Sriyans', '9999999999', 'rauniyar@princeton.edu', 'sophomore')")
                cursor.execute("INSERT INTO students VALUES('rauniyar', 'Sriyans', '9999999999', 'rauniyar@princeton.edu', 'sophomore')")
                cursor.execute("INSERT INTO students VALUES('rauniyar', 'Sriyans', '9999999999', 'rauniyar@princeton.edu', 'sophomore')")
                cursor.execute("INSERT INTO students VALUES('rauniyar', 'Sriyans', '9999999999', 'rauniyar@princeton.edu', 'sophomore')")
                cursor.execute("INSERT INTO students VALUES('rauniyar', 'Sriyans', '9999999999', 'rauniyar@princeton.edu', 'sophomore')")
                cursor.execute("INSERT INTO students VALUES('rauniyar', 'Sriyans', '9999999999', 'rauniyar@princeton.edu', 'junior')")
    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

#-----------------------------------------------------------------------

if __name__ == '__main__':
    main()
