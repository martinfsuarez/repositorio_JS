// Función para verificar si un número es par o impar
function verificarParImpar(numero) {
    if (numero % 2 === 0) {
      return "El número ingresado es par";
    } else {
      return "El número ingresado es impar";
    }
  }
  
  // Bucle que solicita al usuario ingresar números hasta que se ingrese un número negativo
  while (true) {
    var numero = prompt("Ingresa un número. (Debe ingresa un número negativo para salir):");
    
    if (numero < 0) {
      break; // Sale del bucle si se ingresa un número negativo
    }
    
    alert(verificarParImpar(numero));
  }
  