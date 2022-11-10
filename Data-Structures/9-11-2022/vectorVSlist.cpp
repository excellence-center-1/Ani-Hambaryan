#include <iostream>
#include <vector>
#include <list>
#include <chrono>
using namespace std;
using namespace std::chrono;

auto start(){
    return  high_resolution_clock::now();
}
auto stop(){
    return  high_resolution_clock::now();
}

int main(){
    vector <int> v;
    list <int> l;
    for (int i = 0; i <=1000; i++){
        v.push_back(rand()%1000);
        l.push_back(rand()%1000);
    }
    //  for(auto it = v.begin(); it != v.end(); it++){
    //    cout << *it << " ";
    //  }
    start();
    v.push_back(rand()%100);
    stop();
    auto duration1 = duration_cast<microseconds>(stop() - start());

    start();
    v.insert(v.begin(), 3);
    stop(); 
    auto duration3 = duration_cast<microseconds>(stop() - start());

    start();
    v.pop_back();
    stop(); 
    auto duration2 = duration_cast<microseconds>(stop() - start());

    start();
    v.erase(v.begin());
    stop(); 
    auto duration4 = duration_cast<microseconds>(stop() - start());

    start();
    v.insert(v.begin()+2, 10);
    stop(); 
    auto duration5 = duration_cast<microseconds>(stop() - start());

    start();
    v.erase(v.begin()+1);
    stop(); 
    auto duration6 = duration_cast<microseconds>(stop() - start());

    start();
    v.at(3);
    stop(); 
    auto duration7 = duration_cast<microseconds>(stop() - start());


    start();
    l.push_back(rand()%100);
    stop();
    auto duration8 = duration_cast<microseconds>(stop() - start());

    start();
    l.push_front(25);
    stop(); 
    auto duration9 = duration_cast<microseconds>(stop() - start());

    start();
    l.pop_back();
    stop(); 
    auto duration10 = duration_cast<microseconds>(stop() - start());

    start();
    l.pop_front();
    stop(); 
    auto duration11 = duration_cast<microseconds>(stop() - start());
    list<int>::iterator it = l.begin();
    advance(it, 2);
    start();
    l.insert(it, 5);
    stop(); 
    auto duration12 = duration_cast<microseconds>(stop() - start());

    list<int>::iterator itr = l.begin();
    start();
    l.erase(it);
    stop(); 
    auto duration13 = duration_cast<microseconds>(stop() - start());
    cout <<"\t| push_back | push_front | pop_back | pop_front | insert | erase | operator[]\n|VECTOR |    "<< duration1.count()<<"      |      ";
    cout <<duration3.count()<<"     |       "<<duration2.count()<<"    |     "<<duration4.count()<<"   | "<<duration5.count()<<"      |   "<<duration6.count()<<"   |    "<<duration7.count()<<"     |\n---------------------------------------------------------------------------------------\n| LIST  |    "<< duration8.count()<<"      |      ";
    cout <<duration9.count()<<"     |       "<<duration10.count()<<"    |     "<<duration11.count()<<"   | "<<duration12.count()<<"      |   "<<duration13.count()<<"   |    "<<duration13.count()<<"     |\n---------------------------------------------------------------------------------------";
}
