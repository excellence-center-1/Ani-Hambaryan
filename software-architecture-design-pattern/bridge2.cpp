#include <iostream>
//abstraction
class DeviceControl {
protected:
 class Device* device; 

public:
 DeviceControl(Device* device) : device(device) {}

 virtual void turnOn() = 0;
 virtual void turnOff() = 0;
 virtual ~DeviceControl() {}
};

//realization
class Device {
public:
 virtual void operate() = 0;
 virtual ~Device() {}
};

//concrete abstraction
class MobileAppControl : public DeviceControl {
public:
 MobileAppControl(Device* device) : DeviceControl(device) {}

 void turnOn() override {
 std::cout << "Using mobile app to turn on the device.\n";
 device->operate();
 }

 void turnOff() override {
 std::cout << "Using mobile app to turn off the device.\n";
 device->operate();
 }
};

class WebAppControl : public DeviceControl {
public:
 WebAppControl(Device* device) : DeviceControl(device) {}

 void turnOn() override {
 std::cout << "Using web app to turn on the device.\n";
 device->operate();
 }

 void turnOff() override {
 std::cout << "Using web app to turn off the device.\n";
 device->operate();
 }
};

//concrete realization
class LightDevice : public Device {
public:
 void operate() override {
 std::cout << "Light is operating.\n";
 }
};

class ACDevice : public Device {
public:
 void operate() override {
 std::cout << "Air conditioner is operating.\n";
 }
};


int main() {
 Device* light = new LightDevice();
 Device* ac = new ACDevice();

 DeviceControl* mobileAppControl = new MobileAppControl(light);
 DeviceControl* webAppControl = new WebAppControl(ac);

 mobileAppControl->turnOn(); 
 webAppControl->turnOff(); 

 delete light;
 delete ac;

 delete mobileAppControl;
 delete webAppControl;

 return 0;
}
