
import datetime
class Date:
    def __init__(self, year, month, day):
        self.year = str(year)
        self.month = '0'+ str(month) if month in range(0,10) else str(month)
        self.day = '0'+ str(day) if day in range(0,10) else str(day)
    def set_year(self, y):
        self.year = y
    def set_month(self, m):
        self.month = '0'+ str(m) if m in range(0,10) else str(m)
    def set_day(self, d):
        self.day = '0'+ str(d) if d in range(0,10) else str(d)
    def get_year(self):
        return self.year
    def get_month(self):
        return self.month
    def get_day(self):
        return self.day

class AmericanDate(Date):
    def format(self):
        return f"{self.month}.{self.day}.{self.year}"
        
class EuropeanDate(Date):
    def format(self):
        return f"{self.day}.{self.month}.{self.year}"

american = AmericanDate(2000, 4, 10)
european = EuropeanDate(2000, 4, 10)
print(american.format())
print(european.format())