class Attendee: 

    def __init__(self, netid, name, email, number):
        self._netid = netid
        self._name = name
        self._email = email
        self._number = number

    def get_name(self):
        return self._name

    def get_netid(self):
        return self._netid

    def get_email(self):
        return self._email

    def get_number(self):
        return self._number
    