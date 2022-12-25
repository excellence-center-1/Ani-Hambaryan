n = 4

matrix = [
    [0, 0, 0, 0],
    [0, 0, 2, 0],
    [0, 1, 0, 0],
    [3, 0, 0, 4]
]

def print_matrix(matrix):
    for i in range(n):
        for j in range(n):
            print(matrix[i][j], end = " ")
        print()
def solve(matrix, r, c, num):
    for i in range(n):
        if matrix[r][i] == num:
            return False
    for i in range(n):
        if matrix[i][c] == num:
            return False
    start_row = r - r % 2
    start_col = c - c % 2

    for i in range(2):
        for j in range(2):
            if matrix[i + start_row][j+start_col] == num:
                return False
    return True


def solve_sudoku(matrix, row, col):
    if (row == n -1 and col == n):
        return True

    if col == n:
        row += 1
        col = 0
    if matrix[row][col] > 0:
        return solve_sudoku(matrix, row, col+1 )
    for num in range(1, n+1):
        if solve(matrix, row, col, num):
            matrix[row][col] = num

        matrix[row][col] = 0

    return False

if(solve_sudoku(matrix, 0, 0)):
    print_matrix(matrix)
else:
    print("No solution")