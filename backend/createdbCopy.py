# #!/usr/bin/env python

# #-----------------------------------------------------------------------
# # createdb.py
# # Author: Sriyans Rauniyar
# #-----------------------------------------------------------------------
# import sys
# import psycopg2
# #-----------------------------------------------------------------------

# DATABASE_URL = 'postgres://hwwlwcbv:hyNZQS9_LH8CSD3yQoc5IpDHkBJeSlhF@peanut.db.elephantsql.com/hwwlwcbv'

# def main():

#     if len(sys.argv) != 1:
#         print('Usage: python create.py', file=sys.stderr)
#         sys.exit(1)

#     try:
#         database_url = DATABASE_URL

#         with psycopg2.connect(database_url) as connection:

#             with connection.cursor() as cursor:

#                 #-------------------------------------------------------

#                 cursor.execute("DROP TABLE IF EXISTS events")
#                 cursor.execute("CREATE TABLE events "
#                     + "(eventid INTEGER, eventname TEXT, " + 
#                     "starttime TIME, endtime TIME, maxcap " + 
#                     "INTEGER, creator TEXT, category TEXT, location " + 
#                     "TEXT, description TEXT, cost INTEGER, startdate DATE, " +
#                     "enddate DATE, signedup_number INTEGER, PRIMARY KEY(creator, startdate, starttime))")
#                 #-------------------------------------------------------

#                 cursor.execute("DROP TABLE IF EXISTS signup")
#                 cursor.execute("CREATE TABLE signup "
#                     + "(eventid INTEGER, signup_netid TEXT, " + 
#                     "waitlist_netid INTEGER, PRIMARY KEY(eventid, signup_netid))")

#                 #-------------------------------------------------------

#                 cursor.execute("DROP TABLE IF EXISTS students")
#                 cursor.execute("CREATE TABLE students (netid TEXT, name" 
#                 + " TEXT, number TEXT, email TEXT, classyear TEXT)")
                
#                 #-------------------------------------------------------

#     except Exception as ex:
#         print(ex, file=sys.stderr)
#         sys.exit(1)

# #----------------------------------------x-------------------------------

# if __name__ == '__main__':
#     main()