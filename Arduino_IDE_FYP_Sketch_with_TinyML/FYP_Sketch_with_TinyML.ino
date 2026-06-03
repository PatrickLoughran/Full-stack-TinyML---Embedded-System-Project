#include <Arduino.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <WiFi.h>
#include <HTTPClient.h>

#include <patrickloughran-project-1_inferencing.h>   // My TinyML Model Folder



// WiFi Credentials

const char* ssid = "YOUR_WIFI";
const char* password = "YOUR_PASSWORD";

// Backend URL

String serverURL = "http://YOUR_SERVER_IP:5000/api/esp32/update";


// Pins

#define TRIG 4
#define ECHO 5
#define LED_FREE 23
#define LED_OCC 22

LiquidCrystal_I2C lcd(0x27, 16, 2);



// Distance Function
float getDistance() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);

  long duration = pulseIn(ECHO, HIGH, 30000);
  if (duration == 0) return -1;

  return (duration * 0.0343) / 2.0;
}




// Send JSON to backend
void sendToBackend(float distance, String status, float p_free, float p_occ) {

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi Lost!");
    return;
  }

  HTTPClient http;
  http.begin(serverURL);
  http.addHeader("Content-Type", "application/json");

  String json = "{";
  json += "\"distance\":" + String(distance, 2) + ",";
  json += "\"status\":\"" + status + "\",";
  json += "\"p_free\":" + String(p_free, 3) + ",";
  json += "\"p_occupied\":" + String(p_occ, 3);
  json += "}";

  int res = http.POST(json);
  Serial.print("Backend response: ");
  Serial.println(res);

  http.end();
}




// Setup
void setup() {
  Serial.begin(115200);

  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  pinMode(LED_FREE, OUTPUT);
  pinMode(LED_OCC, OUTPUT);

  lcd.init();
  lcd.backlight();
  lcd.setCursor(0,0);
  lcd.print("TinyML Parking");
  delay(2000);
  lcd.clear();

  // Connect WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi Connected!");
}




// Loop
void loop() {

  float distance = getDistance();

  Serial.print("Distance: ");
  Serial.println(distance);

  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Dist: ");
  lcd.print(distance);

  if (distance <= 0) {
    lcd.setCursor(0,1);
    lcd.print("Sensor Error");
    delay(600);
    return;
  }



  //  TINYML FIXED SECTION
  // 1. Create signal from feature array
  float features[] = { distance };

  signal_t signal;
  numpy::signal_from_buffer(features, 1, &signal);

  // 2. Run inference
  ei_impulse_result_t result;
  EI_IMPULSE_ERROR rc = run_classifier(&signal, &result, false);

  if (rc != EI_IMPULSE_OK) {
    Serial.print("Classifier error: ");
    Serial.println(rc);
    lcd.setCursor(0,1);
    lcd.print("Model Error");
    delay(600);
    return;
  }

 
  // 3. Read Output Classes
  float score_free = result.classification[0].value;
  float score_occ  = result.classification[1].value;

  String status = (score_free > score_occ) ? "FREE" : "OCCUPIED";

  
  // Update LEDs + LCD
  if (status == "FREE") {
    digitalWrite(LED_FREE, HIGH);
    digitalWrite(LED_OCC, LOW);
  } else {
    digitalWrite(LED_FREE, LOW);
    digitalWrite(LED_OCC, HIGH);
  }

  lcd.setCursor(0,1);
  lcd.print("Status: ");
  lcd.print(status);


  
  // Send to backend
  sendToBackend(distance, status, score_free, score_occ);

  delay(1000);
}

