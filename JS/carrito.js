let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
let botonEliminar = document.querySelector(".carrito__producto__eliminar");
const botonVaciarCarrito = document.querySelector("#carrito-acciones-vaciar");
const totalCompra = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const numerito = document.querySelector("#numerito")

/// Creamos una funcion para que cada vez que agregue un producto se actualice su carrito ///

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoComprado.classList.add("disabled");
    
        carritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito__producto");
            div.innerHTML = `
                <img class="carrito__producto__img" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito__producto__titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito__producto__cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito__producto__precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito__producto__subtototal">
                    <small>Subtototal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito__producto__eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            carritoProductos.append(div);
        })
    } else {
        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprado.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    calcularTotal();
}

cargarProductosCarrito();

/// Funcion para que el icono de basura funcione a la hora de eliminar algun producto ///

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito__producto__eliminar");

    botonesEliminar.forEach( boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
    botonesEliminar.forEach( boton => {
        boton.addEventListener("click", () => {
            Toastify({
                text: "Eliminaste un producto",
                duration: 3000,
                destination: "",
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "linear-gradient(to right, #da2323, #fa4a14)",
                },
                onClick: function(){}
              }).showToast();
        });
    });
}

/// Creamos una funcion para que se elimine de su Local Storage ///

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex( producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


/// Funcion para que el boton de "vaciar carrito", vacie todo el carrito ///
botonVaciarCarrito.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    Swal.fire({
        title: 'Cuidado!',
        text: "Vas a borrar todos los productos de tu carrito!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#da2323',
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            
        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();

          Swal.fire(
            'Borrados!',
            'Todos los productos han sido eliminados.',
            'success'
          )
        }
      });

}

/// Hacemos otra funcion para que se sume todos los productos y se vea reflejado en el "total" ///

function calcularTotal() {
    const totalCalculado = productosEnCarrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}


/// Esta funcion es para que una vez le de al boton "comprar ahora", se le reinicie el carrito ///

botonComprar.addEventListener("click", comprar);

function comprar() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    carritoVacio.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.remove("disabled");
}

function actualizarNumeritoMenu() {
    let numeritoActualizado = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    numerito.innerText = numeritoActualizado;
}

actualizarNumeritoMenu();