#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

// Replace with your network credentials
const char* ssid = "DBZ";
const char* password = "ganimedkalisto";

ESP8266WebServer server(80);   //instantiate server at port 80 (http port)

String page = "";
int redLEDPin = 5;
int yellowLEDPin = 15;
int greenLEDPin = 2;
void setup(void){
  //the HTML of the web page
  page = "<h1>Simple NodeMCU Web Server</h1>\
  <p><span>Red LED</span><a href=\"redLEDOn\"><button>ON</button></a>&nbsp;<a href=\"redLEDOff\"><button>OFF</button></a></p>\
  <p><span>Yellow LED</span><a href=\"yellowLEDOn\"><button>ON</button></a>&nbsp;<a href=\"yellowLEDOff\"><button>OFF</button></a></p>\
  <p><span>Green LED</span><a href=\"greenLEDOn\"><button>ON</button></a>&nbsp;<a href=\"greenLEDOff\"><button>OFF</button></a></p>";
  //make the red LED pin output and initially turned off
  pinMode(redLEDPin, OUTPUT);
  digitalWrite(redLEDPin, LOW);
  //make the yellow LED pin output and initially turned off
  pinMode(yellowLEDPin, OUTPUT);
  digitalWrite(yellowLEDPin, LOW);
  //make the green LED pin output and initially turned off
  pinMode(greenLEDPin, OUTPUT);
  digitalWrite(greenLEDPin, LOW);
  
  delay(1000);
  Serial.begin(115200);
  WiFi.begin(ssid, password); //begin WiFi connection
  Serial.println("");

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  
  server.on("/", [](){
    server.send(200, "text/html", page);
  });
  server.on("/redLEDOn", [](){
    server.send(200, "text/html", page);
    digitalWrite(redLEDPin, HIGH);
    delay(1000);
  });
  server.on("/redLEDOff", [](){
    server.send(200, "text/html", page);
    digitalWrite(redLEDPin, LOW);
    delay(1000); 
  });
  server.on("/yellowLEDOn", [](){
    server.send(200, "text/html", page);
    digitalWrite(yellowLEDPin, HIGH);
    delay(1000);
  });
  server.on("/yellowLEDOff", [](){
    server.send(200, "text/html", page);
    digitalWrite(yellowLEDPin, LOW);
    delay(1000); 
  });
  server.on("/greenLEDOn", [](){
    server.send(200, "text/html", page);
    digitalWrite(greenLEDPin, HIGH);
    delay(1000);
  });
  server.on("/greenLEDOff", [](){
    server.send(200, "text/html", page);
    digitalWrite(greenLEDPin, LOW);
    delay(1000); 
  });
  server.begin();
  Serial.println("Web server started!");
}

void loop(void){
  server.handleClient();
}
