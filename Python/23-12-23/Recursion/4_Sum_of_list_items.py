def rec_linear_sum(some_list):
    if some_list:
        return some_list[0]+ rec_linear_sum(some_list[1:])
    return 0

print(rec_linear_sum([0, 5, 2]))