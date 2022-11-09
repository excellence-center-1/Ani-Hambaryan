#include <iostream>
#include <chrono>
using namespace std;
using namespace std::chrono;

void printArr(int* arr, int n){
    for(int i = 0; i < n; i++){
        cout << arr[i]<<"  ";
    }
    cout <<endl;
}

void insertionSort(int* arr, int n){
    for(int i = 0; i < n-1; i++){
        for(int j = i+1; j >0; j--){
            if(arr[j]>arr[j-1]){
                break;
            }
            int temp = arr[j-1];
            arr[j-1] = arr[j];
            arr[j] = temp;
        }
//        printArr(arr, n);
    }
}

int main(){
    int n = 5;
    int* arr = new int[n];
    cout << "Input 5 values - ";
    for(int i = 0; i < n; i++){
        cin >> arr[i];
    }
    cout << "The array is - ";
    printArr(arr, n);
    cout <<"The sorted array is - ";
    auto start = high_resolution_clock::now();
    insertionSort(arr, n);
    auto stop = high_resolution_clock::now();
    printArr(arr, n);
    auto duration = duration_cast<microseconds>(stop - start);
    cout << "Time the insertion sorte is - "<< duration.count() << " microseconds" << endl;

    return 0;
}
