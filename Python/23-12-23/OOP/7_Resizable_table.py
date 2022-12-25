
class Table:
    
    def __init__(self, rows, columns):
        self.rows = rows
        self.columns = columns
        self.matrix = [[0 for j in range(columns)] for i in range(rows)]
    
    def get_value(self, row, col):
        try:
            return self.matrix[row][col]
        except:
            return None

    def set_value(self, row, col, value):

        self.matrix[row][col] = value

    def n_rows(self):
        return self.rows
    
    def n_cols(self):
        return self.columns

    def delete_row(self, row):
        del self.matrix[row]

    def delete_col(self, col):
         for i in range(self.rows):
            del self.matrix[i][col]



tab = Table(2, 2)
for i in range(tab.n_rows()):
    for j in range(tab.n_cols()):
        print(tab.get_value(i, j), end = ' ')
    print()
print()
tab.set_value(0, 0, 10)
tab.set_value(0, 1, 20)
tab.set_value(1, 0, 30)
tab.set_value(1, 1, 40)

tab.delete_col(1)


for i in range(tab.n_rows()):
    for j in range(tab.n_cols()):
        print(tab.get_value(i, j), end = ' ')
    print()
print()

for i in range(-1, tab.n_rows() +1):
    for j in range(-1, tab.n_cols() + 1):
        print(tab.get_value(i, j), end = ' ')
    print()
print()
