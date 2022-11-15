#include <iostream>
using namespace std;

void print(int* arr,int n);
int binarySearch(int* arr, int size, int value, int low, int hight);

int main(){
    int n = 10;
    int* arr = new int[n];
    print(arr, n);
    int value;
    cout << "enter the number - ";
    cin >> value;
    if(binarySearch(arr, n, value, 0, 9) == -1){
        cout << "Error!!!!!!!!!!!!!!!!!!! The number is not found\n";
    }else{
        cout << "The index " << value << " is " << 	binarySearch(arr, n, value, 0, 9);
    }
}


void print(int* arr,int n){
    for(int i = 0; i < n; i++){
        arr[i] = i+1;
        cout << arr[i] << " ";
    }
}

int binarySearch(int arr[], int size, int value, int low, int hight){
    if(low <= hight){
        int mid = (hight + low)/2;
        if(value == arr[mid]){
            return mid;
        } else if (value > arr[mid]){
            return   binarySearch(arr, size, value, mid+1, hight);
        } else {
            return   binarySearch(arr, size, value, low, mid-1);
        }
    }
    return -1;
}



