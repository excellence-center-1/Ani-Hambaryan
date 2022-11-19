#include <iostream>
#include <cmath>
#include "quickSort.h"
using namespace std;


void printArr(int* arr, int size);
void quickSort(int* arr, int start, int end);
int jumpSearch(int* arr, int size, int number);


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
    if(jumpSearch(arr, n, number) == -1){
        cout << "The number is not found";
    } else{
        cout << "\nthe index of the "<<number << " is - " <<jumpSearch(arr, n, number);
    }

}


void printArr(int* arr, int size){
    for(int i = 0; i < size; i++){
        cout << arr[i]<< " ";
    }
}

int jumpSearch(int* arr, int size, int number){
    int step = sqrt( size );
    int i ;
    int  hight, low;
    for( i = 0; i < size; i += step){
        if(arr[i] == number){
            break;
        }else if(arr[i] > number){
            hight = i;
            break;
        }else {
            hight = size - 1;
        } 
    }
    low  = i - step;
    if(arr[i] == number){
        return i;
    }else{
        for(int j = low; j <= hight; j++){
            if(arr[j] == number){
                return j;
            }
        }
    }
    return -1;
}
