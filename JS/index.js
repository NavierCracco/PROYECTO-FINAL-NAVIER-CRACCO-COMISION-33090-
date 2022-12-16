let productosCreados = localStorage.getItem("productos");
productosCreados = JSON.parse(productosCreados);

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton__categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto__agregar");
const numerito = document.querySelector("#numerito");


//////     PRODUCTOS     //////


const productos = [];

fetch("./JSON/productos.json")
    .then((response) => response.json())
    .then((listaProductos) => {
        listaProductos.forEach((producto) => {
            productos.push({
                id: producto.id,
                titulo: producto.titulo,
                imagen: producto.imagen,
                categoria: {
                    nombre: producto.categoria.nombre,
                    id: producto.categoria.id
                },
                precio: producto.precio
            })
        })
        localStorage.setItem("productos", JSON.stringify(productos));
    })


/// Creamos los productos ///

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    
    productosElegidos.forEach( producto => {
        
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto__imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto__detalles">
                <h3 class="producto__titulo">${producto.titulo}</h3>
                <p class="producto__precio">$${producto.precio}</p>
                <button class="producto__agregar" id="${producto.id}">Agregar</button>
            </div>`;
            
            contenedorProductos.append(div);
            
        })

        actualizarBotonesAgregar();
    }
    
    cargarProductos(productosCreados);
    

/* Creamos un forEach para que se filtren los productos de acuerdo a su categoria, así, cada vez que presione el boton,
por ejemplo, de categoria "pantalones", le muestre solamente los pantalones */

botonesCategorias.forEach( boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach( boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos") {
            const productoCategoria = productos.find( producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;


            const productosBoton = productos.filter( producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productosCreados);
        }
    })
})

/// Funcion para que el boton "Agregar" de cada producto, funcione y mande el producto al carrito

function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll(".producto__agregar");

    botonesAgregar.forEach( boton => {
        boton.addEventListener("click", agregarAlCarrito)
    });
    botonesAgregar.forEach( boton => {
        boton.addEventListener("click", () => {
            Toastify({
                text: "Agregaste un producto",
                duration: 3000,
                destination: "./carrito.html",
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "linear-gradient(to right, #00b09b, #2ca84d)",
                },
                onClick: function(){}
              }).showToast();
        });
    });
}

/// Creamos su Local Storage

let productosEnCarrito;
let productosEnCarritoStorage = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoStorage) {
    productosEnCarrito = JSON.parse(productosEnCarritoStorage);
    actualizarNumeritoMenu();
} else {
    productosEnCarrito = [];
}

/// funcion donde hacemos el push al carrito y agregamos la propiedad de "cantidad" a cada objeto

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find( producto => producto.id === idBoton);

    if(productosEnCarrito.some( producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumeritoMenu();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

/* Esta funcion es para que el numero que tiene el boton "carrito" se vaya actualizando de acuerdo 
a cuantos productos tiene en su carrito */

function actualizarNumeritoMenu() {
    let numeritoActualizado = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    numerito.innerText = numeritoActualizado;
}