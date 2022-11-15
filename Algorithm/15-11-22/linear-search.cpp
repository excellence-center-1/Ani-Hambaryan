#include <iostream>
using namespace std;

void print(int* arr,int n);
void linerSearch(int* arr, int size, int value);
void binarySearch(int* arr, int size, int value, int low, int hight);

int main(){
    int n = 10;
    int* arr = new int[n];
    print(arr, n);
    int value;
    cout << "enter the number - ";
    cin >> value;
    linerSearch(arr, n, value);
}


void print(int* arr,int n){
    for(int i = 0; i < n; i++){
        arr[i] = rand()%100;
        cout << arr[i] << " ";
    }
}
void linerSearch(int arr[], int size, int value){
    bool kay = false;
    for(int i = 0; i < size; i++){
        if (arr[i] == value){
            cout << "the element is " << arr[i]<<" index is "<<i;
            kay = true;
        }
    }
    if(!kay){
        cout << "Error!!!!!!!!!!!!!!!!!!! The number is not found\n";
    }

}




