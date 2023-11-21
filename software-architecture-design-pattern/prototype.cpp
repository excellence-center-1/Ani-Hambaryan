#include <iostream>
#include <memory>
#include <unordered_map>

class Shape {
public:
    virtual ~Shape() {}
    virtual std::unique_ptr<Shape> clone() const = 0;
    virtual void draw() const = 0;
};

class Circle : public Shape {
public:
    std::unique_ptr<Shape> clone() const override {
        return std::unique_ptr<Shape>(new Circle(*this));
    }

    void draw() const override {
        std::cout << "Drawing Circle\n";
    }
};

class Square : public Shape {
public:
    std::unique_ptr<Shape> clone() const override {
        return std::unique_ptr<Shape>(new Square(*this));
    }

    void draw() const override {
        std::cout << "Drawing Square\n";
    }
};

class Triangle : public Shape {
public:
    std::unique_ptr<Shape> clone() const override {
        return std::unique_ptr<Shape>(new Triangle(*this));
    }

    void draw() const override {
        std::cout << "Drawing Triangle\n";
    }
};

class PrototypeFactory {
public:
    PrototypeFactory() {
        prototypes["Circle"] = std::unique_ptr<Shape>(new Circle());
        prototypes["Square"] = std::unique_ptr<Shape>(new Square());
        prototypes["Triangle"] = std::unique_ptr<Shape>(new Triangle());
    }

    std::unique_ptr<Shape> createShape(const std::string& type) const {
        auto it = prototypes.find(type);
        if (it != prototypes.end()) {
            return it->second->clone();
        }
        return nullptr; 
    }

private:
    std::unordered_map<std::string, std::unique_ptr<Shape>> prototypes;
};

int main() {
    PrototypeFactory shapeFactory;

    // Test cases
    std::unique_ptr<Shape> circle = shapeFactory.createShape("Circle");
    if (circle) {
        std::unique_ptr<Shape> clonedCircle = circle->clone();
        clonedCircle->draw();
    }

    std::unique_ptr<Shape> square = shapeFactory.createShape("Square");
    if (square) {
        std::unique_ptr<Shape> clonedSquare = square->clone();
        clonedSquare->draw();
    }

    std::unique_ptr<Shape> triangle = shapeFactory.createShape("Triangle");
    if (triangle) {
        std::unique_ptr<Shape> clonedTriangle = triangle->clone();
        clonedTriangle->draw();
    }

    std::unique_ptr<Shape> unknownShape = shapeFactory.createShape("Rectangle");
    if (!unknownShape) {
        std::cout << "Unknown shape requested\n";
    }

    return 0;
}

