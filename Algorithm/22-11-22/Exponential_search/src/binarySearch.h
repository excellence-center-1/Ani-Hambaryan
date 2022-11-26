
int binarySearch(int* arr, int size, int value, int low, int hight){
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



