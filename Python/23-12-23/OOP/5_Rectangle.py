class Rectangle:
    def __init__(self, x, y, w, h):
        self.x1 = x
        self.x2 = w + x
        self.y1 = y
        self.y2 = h + y

    def intersection(self, rect):
        x3 = rect.x1
        x4 = rect.x2
        y3 = rect.y1
        y4 = rect.y2

#Ձախ կոորդինատներ
        x5 = max(self.x1, x3)
        y5 = max(self.y1, y3)

#Աջ կոորդինատներ
        x6 = min(self.x2, x4)
        y6 = min(self.y2, y4)

        if x5 >= x6 or y5>= y6:
            print("No intersection")
            return

        print(x5, y5, x6-x5, y6-y5)

rect1 = Rectangle(0, 0, 10, 10)
rect2 = Rectangle(5, 5, 10, 10)
rect1.intersection(rect2)