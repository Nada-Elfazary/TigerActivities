import datetime

def get_day():
    return datetime.datetime.now().weekday()

if __name__ == '__main__':
    print(get_day())