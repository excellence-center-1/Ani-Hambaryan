#include <iostream>
using namespace std;

struct Node{
    int data;
    Node* left;
    Node* right;
};
struct Node* getNode(int data){
    Node* newNode = new Node();
    newNode->data = data;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}
struct Node* insertNode(){
    Node* root = getNode(1);
    root->left = getNode(2);
    root->right = getNode(3);
    root->left->left = getNode(4);
    root->left->right = getNode(5);
    root->right->right = getNode(6);
    root->left->left->left = getNode(7);
    root->left->left->right = getNode(8);
    return root;
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
void printNodesLevels(Node* root, int currentLevel, int level){
    if(root == NULL)
        return;
    if(currentLevel==level){
        cout<< root->data<<" ";
    }
    printNodesLevels(root->left, currentLevel+1, level);
    printNodesLevels(root->right, currentLevel+1, level);
}

void levelOrder(Node* root){
    int i;
    int  height = maxHeight(root);
    for(i = 0; i < height; i++){
        cout << "Level " << i+1<<" - ";
        printNodesLevels(root, 0, i);
        cout << endl;
    }
}
int main(){
    Node*  root = insertNode();
    levelOrder(root);
    cout << "Height of the tree is " << maxHeight(root) << endl;
    return 0;

}

