import datetime
import pytz

def get_date():
    currDay = datetime.datetime.now(pytz.timezone('US/Central'))
    currDay = currDay.strftime("%Y/%m/%d")
    return currDay

if __name__ == '__main__':
    print(type(get_date()))
