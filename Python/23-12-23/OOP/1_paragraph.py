class Paragraph:
    def __init__(self, width):
        self.width = width

    def add_word(self, word):
         
         l = self.l.append(word)
         return l
    def end(self):
        return self.l.append('\n')  

    
class LeftParagraph(Paragraph):
    l = []
    def print_info(self):   
        for i in self.l:
                s =  ' '*self.width + ' '.join(self.l)
        print(f"{s}")
    
class RightParagraph(Paragraph):
    l = []
    def print_info(self):  
        for i in self.l:
          s = ' '.join(self.l) + ' '*self.width 
        print(f"{s}")
    



lp = LeftParagraph(8)
lp.add_word('abc')
lp.add_word('hhh')
lp.end()
lp.add_word('ggggggggggggggggg')
lp.add_word('kkkkkkkkkkkkkkkkkkkkkkk')
lp.print_info()
lp.end()

rp = RightParagraph(20)
rp.add_word('ppp')
rp.add_word('hhh')
rp.end()
rp.add_word('ggggggggggggggggg')
rp.add_word('kkkkkkkkkkkkkkkkkkkkkkk')
rp.print_info()
