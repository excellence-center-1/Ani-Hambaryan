#include <iostream>
#include "binarySearch.h"


int expSearch(int* arr, int size, int number){
    if(arr[0] == number){
return 0;
}
int i = 1;
while(i < size && arr[i] <= number){
i *=2;
}
return binarySearch(arr, size, number, i/2, std::min(i, size-1));

}
