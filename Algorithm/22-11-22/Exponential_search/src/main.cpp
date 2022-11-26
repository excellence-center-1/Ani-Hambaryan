#include <iostream>
#include <cmath>
#include "quickSort.h"
#include "expSearch.h"

using namespace std;


void printArr(int* arr, int size);
void quickSort(int* arr, int start, int end);
int expSearch(int* arr, int size, int number);


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
    if(expSearch(arr, n, number) == -1){
        cout << "The number is not found!\n";
    } else {
        cout << "\nthe index of the "<<number << " is - " <<expSearch(arr, n, number);
    }
}


void printArr(int* arr, int size){
    for(int i = 0; i < size; i++){
        cout << arr[i]<< " ";
    }
}

