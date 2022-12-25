def recursive_reverse(some_list):
    if some_list:
        return [some_list[-1]] + recursive_reverse(some_list[:-1])
    return []

print(recursive_reverse([1, 2, 3, 4, 5]))