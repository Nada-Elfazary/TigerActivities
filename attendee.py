class Attendee: 

    def __init__(self, netid, name, email, number):
        self._netid = netid
        self._name = name
        self._email = email
        self._number = number

    def _getname_(self):
        return self._name

    def _getnetid_(self):
        return self._netid

    def _getemail_(self):
        return self._email

    def _getnumber_(self):
        return self._number
    
     
    