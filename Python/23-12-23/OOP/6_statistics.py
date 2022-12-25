class Numbers:
    def __init__(self):
        self.l = []

    def add_number(self, value):
        self.l.append(value)

class MinStat(Numbers):
    def result(self):
        try:
            return int(min(self.l))
        except:
            return None

class MaxStat(Numbers):
    def result(self):
        try:
            return int(max(self.l))
        except:
            return None

class AverageStat(Numbers):
    def result(self):
        try:
            return float(sum(self.l)/len(self.l))
        except:
            return None

values = [1, 2, 4, 5]

mins = MinStat()
maxs = MaxStat()
average = AverageStat()
for v in values:
    mins.add_number(v)
    maxs.add_number(v)
    average.add_number(v)

print(mins.result(), maxs.result(), average.result())