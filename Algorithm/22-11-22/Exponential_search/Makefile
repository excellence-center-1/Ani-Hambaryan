cc = g++
TARGET = test
PATH_SRC = ./src/
PATH_OBJ = ./obj/
#$(info 'aaaa='$(PATH_OBJ)) - tpum enq debug anelu hamar
SRC = $(wildcard $(PATH_SRC)*.cpp) #cpp -neri list e sarqum
OBJ = $(patsubst $(PATH_SRC)%.cpp, $(PATH_OBJ)%.o, $(SRC)) #verjic - inchic karda, inch brni` fayleri anunnery, darna .o
all:$(TARGET)
clean:
#rm  *.o $(PATH_OBJ:)
	rm   $(PATH_OBJ)*.o
install:
	sudo install ./$(TARGET) /usr/local/bin
uninstall:
	sudo rm -r /usr/local/bin/$(TARGET)
#test:main.o square.o min.o sum.o
$(TARGET):$(OBJ)
#	g++ main.o square.o min.o sum.o -o $(TARGET)
	$(cc) $(OBJ) -o $(TARGET)
# main.o:main.cpp
# 	$(cc)-c main.cpp -o main.o
# square.o:square.cpp
# 	$(cc)-c square.cpp -o square.o
# min.o:min.cpp
# 	$(cc)-c min.cpp -o min.o
# sum.o:sum.cpp
# 	$(cc)-c sum.cpp -o sum.o
$(PATH_OBJ)%.o:$(PATH_SRC)%.cpp
	$(cc) -c $< -o $@

#ete koderis mej popoxutyun chka, noric make chi anum: Make i jamanak miayn poxum e popoxvac toxery