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

void mergeSort(){

}

int main(){
int size =10;
int* arr = new int[size];
for(int i = 0; i < size;i++){
arr[i] = rand()%100;
}
printArray(arr, size);
}
