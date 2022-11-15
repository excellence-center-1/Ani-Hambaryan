#include <iostream>
#include <chrono>
using namespace std;


void printArr(int* arr, int n);
void heapify(int* arr, int n, int i);
void heapSort(int* arr, int n);

int main(){
  int n = 5;
    int* arr = new int[n];
    for(int i = 0; i < n; i++){
        arr[i] = rand()%100;
    }
    cout << "The array is - ";
    printArr(arr, n);
    cout <<"The sorted array is - ";
    heapSort(arr, n);
    printArr(arr, n);

    return 0;
}



void printArr(int* arr, int n){
    for(int i = 0; i < n; i++)
        cout << arr[i] <<"  ";
    cout <<endl;
}

void heapify(int* arr, int n, int i){
    int largest = i;
    int left = i*2+1;
    int right = i*2+2;
    if(left < n && arr[left]>arr[largest]){
            largest = left;
        } 
    if(right < n && arr[right]>arr[largest]){
    largest = right;
    }
    if(largest !=i){
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }

}
void heapSort(int* arr, int n){
for(int i = n/2-1; i >= 0; i--){
heapify(arr, n, i);
}
for(int i = n-1; i > 0; i--){
swap(arr[0], arr[i]);
heapify(arr, i, 0);
}
}
