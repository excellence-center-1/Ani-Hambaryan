def tribonacci(n):
    if n == 0 or n == 1 :
        return 0
    elif n == 2:
        return 1
    else:
        return (tribonacci(n-3)+tribonacci(n-1) + tribonacci(n-1))

print(tribonacci(0))