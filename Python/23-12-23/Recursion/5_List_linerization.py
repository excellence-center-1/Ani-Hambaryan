
def linear(some_list):
    linear_list = []
    for list1 in some_list:
        for num in list1:
            linear_list.append(num)

    return linear_list

print(linear([[1], [2, 3], [4, 5, 6, 7]]))

