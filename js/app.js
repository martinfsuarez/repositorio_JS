// Capturar entradas mediante prompt()
let numero1 = parseFloat(prompt("Ingresa el primer número:"));
let numero2 = parseFloat(prompt("Ingresa el segundo número:"));

// Declarar variables y objetos
let resultadoSuma, resultadoResta, resultadoMultiplicacion, resultadoDivision, resultadoPorcentaje;

// Crear array para almacenar los resultados
let resultados = [];

function suma(a, b) {
  return a + b;
}

function resta(a, b) {
  return a - b;
}

function multiplicacion(a, b) {
  return a * b;
}

function division(a, b) {
  return a / b;
}

function porcentaje(a, porcentaje) {
  return (a * porcentaje) / 100;
}

// Realizar las operaciones y guardar los resultados en el array
resultados.push(suma(numero1, numero2));
resultados.push(resta(numero1, numero2));
resultados.push(multiplicacion(numero1, numero2));
resultados.push(division(numero1, numero2));
resultados.push(porcentaje(numero1, 20)); // Calcula el 20% de numero1

// Muestra los resultados mediante alert()
alert("Resultados:" +
      "\nSuma: " + resultados[0] +
      "\nResta: " + resultados[1] +
      "\nMultiplicación: " + resultados[2] +
      "\nDivisión: " + resultados[3] +
      "\nPorcentaje: " + resultados[4]);

  