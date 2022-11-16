#include <iostream>
using namespace std;

void printArray(int* arr, int size);
void shellSort(int* arr, int size);

int main(){
    int n = 10;
    int* arr = new int[n];
    for(int i = 0; i < n; i++){
        arr[i] = rand()%100;
    }
    cout << "The array is - ";
    printArray(arr, n);
    cout << "The sorted array is - ";
    shellSort(arr, n);
    printArray(arr, n);
}


void printArray(int* arr, int size){
    for(int i = 0; i < size; i++){
        cout << arr[i]<<" ";
    }
    cout <<endl;
}

void shellSort(int* arr, int size){
    for(int gap = size/2; gap >0; gap/=2){
        for(int i = gap; i < size; i++){
            for(int j = i-gap; j >=0; j-=gap){
                if(arr[i]>=arr[j]){
                    break;
                } else {
                 swap(arr[i], arr[j]);
                }
            }
        }
    }
}
