#include <iostream>
#include <cmath>
#include "quickSort.h"
using namespace std;


void printArr(int* arr, int size);
void quickSort(int* arr, int start, int end);
int interpolSearch(int* arr, int size, int number, int low, int hight);


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
    if(interpolSearch(arr, n, number, 0, n-1) == -1){
        cout << "The number is not found";
    } else{
        cout << "\nthe index of the "<<number << " is - " <<interpolSearch(arr, n, number, 0, n-1);
    }

}


void printArr(int* arr, int size){
    for(int i = 0; i < size; i++){
        cout << arr[i]<< " ";
    }
}

int interpolSearch(int* arr, int size, int number, int low, int hight){
    if(low <= hight && number >= arr[low] && number <= arr[hight]){
        int pos = low + ((hight-low)/(arr[hight]-arr[low]))*(number-arr[low]);
        if(arr[pos] == number){
            return pos;
        } else if(arr[pos] < number){
            return interpolSearch(arr, size, number, pos+1, hight);
        }else{
            return interpolSearch(arr, size, number, low, pos-1);
        }
    }
    return -1;
}
