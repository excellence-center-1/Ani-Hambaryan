class Person:
    def __init__(self, name, l_name, f_name, phone_number):
        self.name = name
        self.l_name = l_name
        self.f_name = f_name
        self.phone_number = phone_number

    def get_phone(self):
        try:
            return self.phone_number['private']
        except:
            return None

    def get_name(self):
        n = self.l_name + ' ' + self.name + ' ' + self.f_name
        return n
    
    def get_work_phone(self):
        try:
            return self.phone_number['work']
        except:
            return None

    def get_sms_text(self):
        return (f"Dear {self.name} .....")

class Company:
        def __init__(self, comp_name, comp_type, phone_number, *args):
            self.comp_name = comp_name
            self.comp_type = comp_type
            self.phone_number = phone_number
            self.args = args

        def get_phone(self):
            try:
                return self.phone_number['contact']
            except:
                return None   

        def get_name(self):
            return self.comp_name

        def get_sms_text(self):
         return (f"For company  {self.comp_name} there is a super offer! Take part in our win-win competition for {self.comp_type}")

def send_sms(*args):
        try:
            for i in args:
                print(f"SMS sent to the number {i.get_phone()}")
        except:
            print(f"Failed to send message to: {i.get_name()}")

person1 = Person("Ivan", "Ivanovich", "Ivanov", {"private":123, "work": 456})
company1 = Company("Bell", "LP", {"contact":111}, person1)
send_sms(person1, company1)