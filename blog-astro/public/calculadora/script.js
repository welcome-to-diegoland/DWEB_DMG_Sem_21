const pantalla = document.getElementById('pantalla');
const botones = document.querySelectorAll('.calculadora__boton');

let entradaActual = '';
let resultadoActual = '';
let calculoRealizado = false; 

function actualizarPantalla(valor) {
  pantalla.textContent = valor || '0';
}

function manejarEntrada(evento) {
  const valor = evento.target.getAttribute('data-valor');

  if (!valor) return;

  if (valor === 'C') {
    entradaActual = '';
    resultadoActual = '';
    calculoRealizado = false;
    actualizarPantalla('');
  } else if (valor === '=') {
    try {
      resultadoActual = eval(entradaActual);
      actualizarPantalla(resultadoActual);
      entradaActual = resultadoActual.toString(); 
      calculoRealizado = true; 
    } catch (error) {
      actualizarPantalla('Error');
      entradaActual = '';
      calculoRealizado = false;
    }
  } else if (['+', '-', '*', '/'].includes(valor)) {
    if (calculoRealizado) {
      calculoRealizado = false; 
    }
    entradaActual += valor;
    actualizarPantalla(entradaActual);
  } else if (valor === '.') {

    const partes = entradaActual.split(/[\+\-\*\/]/); 
    const ultimaParte = partes[partes.length - 1];

    if (!ultimaParte.includes('.')) {
      entradaActual += entradaActual === '' ? '0.' : '.';
      actualizarPantalla(entradaActual);
    }
  } else {
    if (calculoRealizado) {
      entradaActual = '';
      calculoRealizado = false;
    }
    entradaActual += valor;
    actualizarPantalla(entradaActual);
  }
}

botones.forEach(boton => {
  boton.addEventListener('click', manejarEntrada);
});
