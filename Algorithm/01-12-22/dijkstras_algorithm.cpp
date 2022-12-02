#include <iostream>
#include <limits.h>
using namespace std;

int minRoot(int root[], int n, bool test[]){
    int min = INT_MAX;
    int minIndex;
    for(int i = 0; i<n; i++){
        if(root[i]<min  && !test[i] ){
            min = root[i];
            minIndex = i;
        }
    }
    return minIndex;
}

void dijkstra(int Graph[][6], int n, int start){
    int dist[n];
    bool test[n];
    for(int i = 0;  i< n; i++){
        dist[i] = INT_MAX;
        test[i] = false;
    }
    dist[start] = 0;
    for(int i = 0; i < n; i++){
        int r = minRoot(dist, n, test);
        test[r] = true;
        for(int j = 0; j < n; j++){
            if(!test[j] && Graph[r][j] && dist[r] != INT_MAX && dist[r]+Graph[r][j] < dist[j]){
                dist[j] = dist[r]+Graph[r][j];
            }
        }
    }

    for(int i = 0; i < n; i++){
        cout << i << " " << dist[i]<<endl;
    }
}


int main(){
    const int n = 6;
    int graph[n][n] = {
        0, 7, 9, 0, 0, 14,
        7, 0, 10, 15, 0, 0,
        9, 10, 0, 11, 0, 2, 
        0, 15, 11, 0, 6, 0,  
        0, 0, 0, 6, 0, 9,
        14, 0, 2, 0, 9, 0,
    };
    dijkstra(graph, n, 0);
    return 0;
}
