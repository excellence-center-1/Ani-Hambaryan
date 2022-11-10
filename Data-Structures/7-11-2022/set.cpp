#include <iostream>
using namespace std;

struct Node{
    int data;
    Node* left;
    Node* right;
};
struct Node* insert(int data, Node* theLeft, Node* theRight){
    Node* newNode = new Node();
    newNode->data = data;
    newNode->left = theLeft;
    newNode->right = theRight;
    return newNode;
}

int max(int x, int y){
    if(x > y)
        return x;
    else
        return y;
}
int maxHeight(Node* node){
    if(node == NULL)
        return 0;
    else{
        int heightLeft = maxHeight(node->left);
        int heightRight = maxHeight(node->right);
        return max(heightLeft, heightRight) + 1;
    }

}


int main(){
    Node *n1, *n2, *n3, *n4, *n5, *root;
    n1 = insert(5, NULL, NULL);
    n2 = insert(8, NULL, NULL);
    n3 = insert(6, n1, n2);
    n4 = insert(12, NULL, NULL);
    n5 = insert(11, NULL, n4);
    root = insert(9, n3, n5);
    cout << "Height of the tree is " << maxHeight(root) << endl;
    return 0;

}

