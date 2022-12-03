#include <iostream>
using namespace std;

void multiply(int n, int x[][3], int y[][3]){
    int matrix[n][n];
    for(int i = 0; i < n; i++){ 
        for(int j = 0; j < n; j++){
            matrix[i][j] = 0;
            for(int k = 0; k < n; k++){
                matrix[i][j] +=x[i][k]*y[k][j];
            }
            cout << matrix[i][j]<<" ";
        }
        cout << endl;
    }
}


int main(){
    const int n = 3;
    int x[n][n] = {
        1, 2, 3, 
        4, 5, 6,
        7, 8, 9
    };
    int y[n][n] = {
        1, 2, 1, 
        2, 4, 6,
        7, 2, 5
    };
    multiply(n, x, y);
}
