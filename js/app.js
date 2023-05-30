// Se solicita al usuario tipear un nombre, cuando el usuario tipee su nombre se mostrará por alert el mensaje de bienvenida


const alertaForm = document.querySelector("#alerta-form");
const alertaInput = document.querySelector("#alerta-input");

alertaForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = alertaInput.value;

// Se condiciona al usuario a ingresar solo un String, no permitiendole ingresar numeros ni caracteres especiales

  const regex = /^[a-zA-Z\s]*$/; 
  if (!regex.test(nombre)) {
    alert("Por favor, ingresa solo letras y espacios");
    return;
  }

  const mensaje = `Te damos la bienvenida a la app, ${nombre}!`;
  alert(mensaje);

// Se resetea el formulario para que se borre lo tipeado

  alertaForm.reset();
});

// Creamos el elemento modo oscuro

const colorModeButton = document.querySelector("#color-mode");
const body = document.body;

// Cuando hacemos click se ejecuta la funcion que cambia el modo de color

colorModeButton.addEventListener("click", cambiarModoColor);
function cambiarModoColor() {

// Se agrega una clase al body y cuando se hace click click en el boton de modo de color se ejecuta la funcion
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
        colorModeButton.innerText = "Cambiar a Modo Claro";
    } else {
        colorModeButton.innerText = "Cambiar a Modo oscuro";
    }
}

// Se crean las variables para poder ingresar por input los datos solicitados al usuario

const listaCompras = [];
const comprasRealizadas = [];

const agregarForm = document.querySelector("#agregar-form");
const agregarInput = document.querySelector("#agregar-input");
const agregar = document.querySelector("#agregar");


const compradoForm = document.querySelector("#comprado-form");
const compradoInput = document.querySelector("#comprado-input");
const comprado = document.querySelector("#comprado");



// Creamos los eventos

agregarForm.addEventListener("submit", agregarItems);
compradoForm.addEventListener("submit", agregarComprasRealizadas);



// Creamos la funcion para poder agregar elementos a la lista

function agregarItems(e) {
  e.preventDefault();

  if (agregarInput.value !== "") {
    let item = document.createElement("li");
    item.innerText = agregarInput.value;
    agregar.append(item);

    listaCompras.push(agregarInput.value);
    agregarInput.value = "";
    actualizarProductosFaltantes();
  } else {
    alert("Escribe algo, dejaste un espacio vacío!");
  }

  agregarInput.focus();
  
}

// Creamos la funcion para agregar elementos a la otra lista

function agregarComprasRealizadas(e) {
  e.preventDefault();

  if (compradoInput.value !== "") {
    let item = document.createElement("li");
    item.innerText = compradoInput.value;
    comprado.append(item);

    comprasRealizadas.push(compradoInput.value);
    compradoInput.value = "";
    actualizarProductosFaltantes();
  } else {
    alert("Escribe algo, dejaste un espacio vacío!");
  }

  compradoInput.focus();
  
}



// Funcion compara ambas listas y devuelve producto faltante

function actualizarProductosFaltantes() {
  const productosFaltantesDiv = document.querySelector("#productos-faltantes");
  productosFaltantesDiv.innerHTML = "";

  const productosFaltantes = listaCompras.filter(
    (item) => !comprasRealizadas.includes(item)
  );

  if (productosFaltantes.length === 0) {
    productosFaltantesDiv.innerHTML = "No falta comprar ningún producto.";
  } else {
    productosFaltantes.forEach((producto) => {
      const p = document.createElement("p");
      p.innerText = producto;
      productosFaltantesDiv.appendChild(p);
    });
  }
}

// Cargar datos de la lista de compras desde localStorage

if (localStorage.getItem("listaCompras")) {
  listaCompras = JSON.parse(localStorage.getItem("listaCompras"));
  actualizarProductosFaltantes();
}

