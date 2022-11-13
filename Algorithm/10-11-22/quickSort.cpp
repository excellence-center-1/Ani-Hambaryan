#include <iostream>
#include <chrono>
using namespace std;
using namespace std::chrono;
void printArray(int* arr, int size){
    for(int i = 0; i < size; i++){
        cout << arr[i]<< " ";
    }
    cout << endl;
}

int sort(int* arr, int start, int end){
    int pivot = arr[end];
    int i = start-1;
    for(int j = start; j < end; j++){
        if(arr[j]<=pivot){
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i+1], arr[end]);
    return (i+1);
}

void quickSort(int* arr,int start,int end){
    if(start<end){
        int pivot = sort(arr, start, end);
        quickSort(arr, start, pivot-1);
        quickSort(arr, pivot+1, end);

    }
}

int main(){
    int size = 10;
    int* arr = new int[size];
    //  int arr[size];
    for(int i = 0; i < size; i++){
        arr[i] = rand()%100;
    }
    printArray(arr, size);
    auto start = high_resolution_clock::now();
    quickSort(arr, 0, size-1);
    auto stop = high_resolution_clock::now();
    printArray(arr, size);
    auto duration = duration_cast<microseconds>(stop - start);
    cout << "Time the quick sort is - "<< duration.count() << " microseconds" << endl;

    return 0;
}
