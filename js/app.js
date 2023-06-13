// Creamos las variables y solicita al usuario tipear un nombre, cuando el usuario tipee su nombre se mostrará por html el mensaje de bienvenida como nuevo usuario 
// o como nuevamente bienvenida si ya coloco anteriormente ese nombre

const alertaForm = document.querySelector("#alerta-form");
const alertaInput = document.querySelector("#alerta-input");
const mensajeBienvenida = document.querySelector("#mensaje-bienvenida");

// Obtenemos el nombre guardado en el Local Storage

const nombreGuardado = localStorage.getItem("nombreUsuario");
if (nombreGuardado) {
  mensajeBienvenida.innerText = `Te damos la bienvenida nuevamente, ${nombreGuardado}!`;
}

alertaForm.addEventListener("submit", (e) => {
  
  e.preventDefault();

  const nombre = alertaInput.value;

// // Se condiciona al usuario a ingresar solo un String, no permitiendole ingresar numeros ni caracteres especiales

  const regex = /^[a-zA-Z\s]*$/; 
  if (!regex.test(nombre)) {
    Swal.fire('Porfavor ingresa solo letras y espacios')
    return alertaForm.reset();
  }

  Swal.fire({
    title: 'Te damos la bienvenida a la plataforma',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
  
  const mensaje = `Te damos la bienvenida a la app, ${nombre}!`;
  mensajeBienvenida.innerText = mensaje;

  // Guardar el nombre en el Local Storage

  localStorage.setItem("nombreUsuario", nombre);º

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
  colorModeButton.innerText = body.classList.contains("dark-mode")
    ? "Cambiar a Modo Claro" 
    : "Cambiar a Modo Oscuro";
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



// Creamos la funcion para poder agregar elementos a la lista y tambien eliminarlos utilizando operador ternario

function agregarItems(e) {
  e.preventDefault();

  agregarInput.value !== ""
    ? (function () {
        let item = document.createElement("li");
        item.innerText = agregarInput.value;
        
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Eliminar";
        deleteButton.id = `btn-${listaCompras.length}`;
        deleteButton.addEventListener("click", borrarItem);
        item.appendChild(deleteButton);

        agregar.append(item);

        listaCompras.push(agregarInput.value);
        agregarInput.value = "";
        actualizarProductosFaltantes();
      })()
    : Swal.fire('Porfavor escribe algo, dejaste un espacio vacio!')

  agregarInput.focus();
  
}

// Creamos la funcion para poder eliminar cada item de la lista agregado

function borrarItem(e) {
  const buttonId = e.target.id;
  const itemId = parseInt(buttonId.split("-")[1]);

  listaCompras.splice(itemId, 1);
  actualizarProductosFaltantes();

  const itemElement = document.getElementById(buttonId).parentElement;
  itemElement.remove();
  
   // Utilizamos la libreria sweetalert para crear un cuadro de alerta que te advierte antes de eliminar un item
   
  Swal.fire({
    title: 'Estas a punto de borrar un item de tu lista',
    text: "No podras revertir este paso",
    icon: 'warning',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borralo'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Borrado!',
        'El item ha sido eliminado.',
        'success'
      )
    }
  })

  // Agregar la clase al boton

  const deleteButton = document.getElementById(buttonId);
  deleteButton.classList.add("boton-eliminar");

  
}



// Creamos la funcion para agregar elementos a la otra lista 

function agregarComprasRealizadas(e) {
  e.preventDefault();

  if (compradoInput.value !== "") {
    let item = document.createElement("li");
    item.innerText = compradoInput.value;

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Eliminar";

     // Agregar la clase "boton-eliminar"

    deleteButton.classList.add("boton-eliminar");
    deleteButton.addEventListener("click", function () {

      // Llamar a la función eliminarItem al hacer clic en el botón
      
      eliminarItem(item); 
    });
    item.appendChild(deleteButton);

    comprado.append(item);
    comprasRealizadas.push(compradoInput.value);
    compradoInput.value = "";
    actualizarProductosFaltantes();
  } else {
    Swal.fire('Porfavor escribe algo, dejaste un espacio vacio!')
  }

  compradoInput.focus();
}

function eliminarItem(item) {
  item.remove();

  // Utilizamos la libreria sweetalert para crear un cuadro de alerta que te advierte antes de eliminar un item

  Swal.fire({
    title: 'Estas a punto de borrar un item de tu lista',
    text: "No podras revertir este paso",
    icon: 'warning',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borralo'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Borrado!',
        'El item ha sido eliminado.',
        'success'
      )
    }
  })

}



// Funcion compara ambas listas y devuelve producto faltante utilizando operador ternario

function actualizarProductosFaltantes() {
  const productosFaltantesDiv = document.querySelector("#productos-faltantes");
  productosFaltantesDiv.innerHTML = "";

  const productosFaltantes = listaCompras.filter(
    (item) => !comprasRealizadas.includes(item)
  );

  productosFaltantes.length === 0
    ? (productosFaltantesDiv.innerHTML = "No falta comprar ningún producto.")
    : productosFaltantes.forEach((producto) => {
        const p = document.createElement("p");
        p.innerText = producto;
        productosFaltantesDiv.appendChild(p);
      });
}

// Cargar datos de la lista de compras desde localStorage


if (localStorage.getItem("listaCompras")) {
  listaCompras = JSON.parse(localStorage.getItem("listaCompras"));
  actualizarProductosFaltantes();
}

