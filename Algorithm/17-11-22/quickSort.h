void swap(int& a, int& b){
    int temp = a;
    a = b;
    b = temp;
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

