class Selector:
    def __init__(self, list_numbers):
        self.list_numbers = list_numbers

    def get_odds(self):
        l_odds = []
        for i in self.list_numbers:
            if i % 2 == 1:
                l_odds.append(i)
        return l_odds

    def get_evens(self):
        l_evens = []
        for i in self.list_numbers:
            if i % 2 == 0:
                l_evens.append(i)
        return l_evens

values = [11, 12, 13, 14, 15, 16, 22, 44, 56]
selector = Selector(values)
odds = selector.get_odds()
evens = selector.get_evens()
print(' '.join(map(str, odds)))
print(' '.join(map(str, evens)))