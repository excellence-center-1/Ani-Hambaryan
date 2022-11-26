#include <iostream>
#include <cmath>
#include "quickSort.h"
using namespace std;


void printArr(int* arr, int size);
void quickSort(int* arr, int start, int end);
int ternarySearch(int* arr, int size, int number, int low, int hight);


int main(){
    int n = 9;
    int* arr = new int[n];
    for(int i = 0; i < n; i++){
        arr[i] = rand() % 100;
    }
    cout << "The array is - ";
    printArr(arr, n);
    cout << "\nThe sorted array is - ";
    quickSort(arr, 0, n-1);
    printArr(arr, n);
    int number;
    cout << "\nWrite the number ";
    cin >> number;
    if(ternarySearch(arr, n, number, 0, n-1) == -1){
        cout << "The number is not found";
    } else{
        cout << "\nthe index of the "<<number << " is - " <<ternarySearch(arr, n, number, 0, n-1);
    }

}


void printArr(int* arr, int size){
    for(int i = 0; i < size; i++){
        cout << arr[i]<< " ";
    }
}

int ternarySearch(int* arr, int size, int number, int low, int hight){
    if(low <= hight){
        int pos1 = low + (hight-low)/3;
        int pos2 = hight -  (hight-low)/3;
        if(arr[pos1] == number){
            return pos1;
        } else if(arr[pos2] == number){
            return pos2;
        } else if(arr[pos1] > number){
            return ternarySearch(arr, size, number, low, pos1-1);
        }else if(arr[pos2] < number){
            return ternarySearch(arr, size, number, pos2+1, hight);
        } else {
            return ternarySearch(arr, size, number, pos1+1, pos2-1);
        }
    }
    return -1;
}
