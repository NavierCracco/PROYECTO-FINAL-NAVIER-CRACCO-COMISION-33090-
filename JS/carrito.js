const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");


if (productosEnCarrito){

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

}