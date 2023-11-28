#include <iostream>
//abstraction
class RemoteControl {
protected:
    class Device* device;  // bridge

public:
    RemoteControl(Device* device) : device(device) {}

    virtual void powerOn() = 0;
    virtual void powerOff() = 0;
    virtual ~RemoteControl() {}
};
//Realizator
class Device {
public:
    virtual void turnOn() = 0;
    virtual void turnOff() = 0;
    virtual ~Device() {}
};
//concrete realizator
class TV : public Device {
public:
    void turnOn() override {
        std::cout << "Turning on the TV.\n";
    }

    void turnOff() override {
        std::cout << "Turning off the TV.\n";
    }
};

class MusicPlayer : public Device {
public:
    void turnOn() override {
        std::cout << "Turning on the Music Player.\n";
    }

    void turnOff() override {
        std::cout << "Turning off the Music Player.\n";
    }
};
//concret abstraction
class UniversalRemote : public RemoteControl {
public:
    UniversalRemote(Device* device) : RemoteControl(device) {}

    void powerOn() override {
        std::cout << "Universal Remote: Power On. ";
        device->turnOn();
    }

    void powerOff() override {
        std::cout << "Universal Remote: Power Off. ";
        device->turnOff();
    }
};
int main() {
    Device* tv = new TV();
    Device* musicPlayer = new MusicPlayer();

    RemoteControl* remoteForTV = new UniversalRemote(tv);
    RemoteControl* remoteForMusicPlayer = new UniversalRemote(musicPlayer);

    remoteForTV->powerOn();  
    remoteForTV->powerOff(); 

    remoteForMusicPlayer->powerOn();  
    remoteForMusicPlayer->powerOff();  

    delete tv;
    delete musicPlayer;
    delete remoteForTV;
    delete remoteForMusicPlayer;
    return 0;
}
