#include <Arduino.h>
#include <ESP32Servo.h>

// =====================================================
// PINES MOTOR 1 (IZQUIERDO)
// =====================================================
int am1 = 16; // Adelante
int rm1 = 15;  // Reversa
int vm1 = 17; // Velocidad PWM

// =====================================================
// PINES MOTOR 2 (DERECHO)
// =====================================================
int am2 = 18; // Adelante
int rm2 = 19; // Reversa
int vm2 = 21; // Velocidad PWM

// =====================================================
// TIEMPOS Y VELOCIDADES
// =====================================================
int demoraGiro = 1000;       // Ajusta este valor para lograr los 90 grados
int demoraServo = 50;
int demoraReversa = 400;
int moverServoSuaveDelay = 7;

int velm1 = 240; // Velocidad avance izquierdo
int velm2 = 240; // Velocidad avance derecho
int velGiro = 220; // Velocidad al girar

// =====================================================
// SENSOR ULTRASÓNICO HC-SR04
// =====================================================
int triq = 13;
int echo = 23;
int distanciaMinima = 15;

// =====================================================
// OBJETO SERVO
// =====================================================
Servo servomotor;

// =====================================================
// FUNCIÓN PARA MOVER EL SERVO SUAVEMENTE
// =====================================================
void moverServoSuave(int posicionFinal) {
  int posicionActual = servomotor.read();
  
  if (posicionActual < posicionFinal) {
    for (int pos = posicionActual; pos <= posicionFinal; pos++) {
      servomotor.write(pos);
      delay(moverServoSuaveDelay);
    }
  } else {
    for (int pos = posicionActual; pos >= posicionFinal; pos--) {
      servomotor.write(pos);
      delay(moverServoSuaveDelay);
    }
  }
}

// =====================================================
// FUNCIÓN PARA MEDIR DISTANCIA
// =====================================================
int medirDistancia() {
  digitalWrite(triq, LOW);
  delayMicroseconds(2);
  digitalWrite(triq, HIGH);
  delayMicroseconds(10);
  digitalWrite(triq, LOW);

  long tiempo = pulseIn(echo, HIGH, 30000);
  if (tiempo == 0) return 999;
  
  return tiempo / 58.2;
}

// =====================================================
// CONTROL DE MOTORES
// =====================================================
void detenerMotores() {
  analogWrite(vm1, 0);
  analogWrite(vm2, 0);
  digitalWrite(am1, LOW);
  digitalWrite(am2, LOW);
  digitalWrite(rm1, LOW);
  digitalWrite(rm2, LOW);
}

void avanzar() {
  analogWrite(vm1, velm1);
  analogWrite(vm2, velm2);
  
  digitalWrite(am1, HIGH);
  digitalWrite(rm1, LOW);
  
  digitalWrite(am2, HIGH);
  digitalWrite(rm2, LOW);
}

void retroceder() {
  analogWrite(vm1, velm1);
  analogWrite(vm2, velm2);
  
  digitalWrite(am1, LOW);
  digitalWrite(rm1, HIGH);
  
  digitalWrite(am2, LOW);
  digitalWrite(rm2, HIGH);

  delay(demoraReversa);
  detenerMotores();
}

// =====================================================
// GIROS CORREGIDOS (PIVOTE)
// =====================================================
void girarIzquierda() {
  Serial.println("PAPUUUU Girando Izquierda Real");
  analogWrite(vm1, velGiro);
  analogWrite(vm2, velGiro);
  
  // Izquierdo hacia atrás, Derecho hacia adelante
  digitalWrite(am1, LOW);
  digitalWrite(rm1, HIGH);
  digitalWrite(am2, HIGH);
  digitalWrite(rm2, LOW);

  delay(500);
  detenerMotores();
}

void girarDerecha() {
  Serial.println("PAPUUUU Girando Derecha Real");
  analogWrite(vm1, velGiro);
  analogWrite(vm2, velGiro);
  
  // Izquierdo hacia adelante, Derecho hacia atrás
  digitalWrite(am1, HIGH);
  digitalWrite(rm1, LOW);
  digitalWrite(am2, LOW);
  digitalWrite(rm2, HIGH);

  delay(500);
  detenerMotores();
}

// =====================================================
// SETUP
// =====================================================
void setup() {
  Serial.begin(9600);

  pinMode(am1, OUTPUT);
  pinMode(rm1, OUTPUT);
  pinMode(vm1, OUTPUT);
  pinMode(am2, OUTPUT);
  pinMode(rm2, OUTPUT);
  pinMode(vm2, OUTPUT);

  pinMode(triq, OUTPUT);
  pinMode(echo, INPUT);

  servomotor.attach(22);
  moverServoSuave(90);
}

// =====================================================
// LOOP PRINCIPAL
// =====================================================
void loop() {
  moverServoSuave(90);
  delay(demoraServo);
  
  int distanciaFrente = medirDistancia();
  Serial.print("Distancia Frente: ");
  Serial.println(distanciaFrente);

  if (distanciaFrente > distanciaMinima) {
    avanzar();
  } else {
    detenerMotores();
    
    // Mirar Izquierda
    moverServoSuave(0);
    delay(demoraServo);
    int distanciaIzquierda = medirDistancia();
    Serial.print("Distancia Izquierda: ");
    Serial.println(distanciaIzquierda);

    if (distanciaIzquierda > distanciaMinima) {
      retroceder();
      girarDerecha();
    } else {
      // Mirar Derecha
      moverServoSuave(180);
      delay(demoraServo);
      int distanciaDerecha = medirDistancia();
      if(distanciaDerecha > 15 && distanciaDerecha < 80)
      {
        Serial.print("Distancia Derecha: ");
        Serial.println(distanciaDerecha);

        retroceder();
        girarIzquierda();
      }
      
    }
  }
}