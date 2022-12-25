import random
import numpy as np

class Matrix:
    # def __init__(self, n, m):
    #     self.matrix = self.get_matrix(n, m)

    # def __init__(self, rows, columns):
    #     self.matrix = self.get_matrix(rows, columns)
    def __init__(self, rows, columns):
        self.rows = rows
        self.columns = columns
        self.matrix = [[random.randint(1, 100)for i in range(rows)] for j in range(columns)]
    
    # def get_matrix(self, rows, columns):
    #     matrix = [[random.randint(1, 100) for j in range(rows)] for i in range(columns)]
    #     return matrix

    def show(self, matrix):
        s = []
        for i in matrix:
            s.append(str(i))
        return '\n'.join(s)  

    def __str__(self):
        return self.show(self.matrix)

    def transpose(self, matrix):
        return [[matrix[j][i] for j in range(len(matrix))] for i in range(len(matrix[0]))]

    def get_transpose(self):
        return self.show(self.transpose(self.matrix))

    def reverse(self, matrix):
        m = np.array(matrix)
        return np.linalg.inv(m)

    def get_reverse(self):
        return self.show(self.reverse(self.matrix))
    
    def determinant(self, matrix):
        m = np.array(matrix)
        return np.linalg.det(m)

    def get_determinant(self):
        return self.determinant(self.matrix)
    
    def add(self):
        pass
    
    def substract(self):
        pass

    def multiplication(self):
        pass



matrix1 = Matrix(2, 3)
print(matrix1)
print('\n', matrix1.get_transpose())
# print('\n', matrix1.get_determinant())
# print('\n', matrix1.get_reverse())