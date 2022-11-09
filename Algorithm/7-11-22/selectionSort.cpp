#include <iostream>
#include <chrono>
using namespace std;
using namespace std::chrono;

void printArr(int arr[], int n){
    for(int i = 0; i < n; i++)
        cout << arr[i] <<"  ";
    cout <<endl;
}

void selectionSort(int arr[], int n){
    for(int i = 0; i < n-1; i++){
        int minIndex = i;
        for(int j = i+1; j < n; j++){
            if(arr[j] < arr[minIndex]){
                minIndex = j;
            }
        }
        if(minIndex != i){
            int temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
     //   printArr(arr, n);
    }
}

int main(){
    const int n = 5;
    int arr[n] = {6, 5, 4, 3,2 };
    cout << "The array is - ";
    printArr(arr, n);
    cout <<"The sorted array is - ";
    auto start = high_resolution_clock::now();
    selectionSort(arr, n);
    auto stop = high_resolution_clock::now();
    printArr(arr, n);
    auto duration = duration_cast<microseconds>(stop - start);
    cout << "Time the selection sort is - "<< duration.count() << " microseconds" << endl;

    return 0;
}
