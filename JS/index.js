
//////     PRODUCTOS     //////

const productos = [
    {
        id: "abrigo-01",
        titulo: "Abrigo 01",
        imagen: "./img/abrigos/abrigo-01.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos",
        },
        precio: 5000,
    },
    {
        id: "abrigo-02",
        titulo: "Abrigo 02",
        imagen: "./img/abrigos/abrigo-02.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos",
        },
        precio: 5000,
    },
    {
        id: "abrigo-03",
        titulo: "Abrigo 03",
        imagen: "./img/abrigos/abrigo-03.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos",
        },
        precio: 5000,
    },
    {
        id: "abrigo-04",
        titulo: "Abrigo 04",
        imagen: "./img/abrigos/abrigo-04.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos",
        },
        precio: 5000,
    },
    {
        id: "abrigo-05",
        titulo: "Abrigo 05",
        imagen: "./img/abrigos/abrigo-05.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos",
        },
        precio: 5000,
    },
    {
        id: "pantalon-01",
        titulo: "Pantalon 01",
        imagen: "./img/pantalones/pantalon-01.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones",
        },
        precio: 2000,
    },
    {
        id: "pantalon-02",
        titulo: "Pantalon 02",
        imagen: "./img/pantalones/pantalon-02.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones",
        },
        precio: 2000,
    },
    {
        id: "pantalon-03",
        titulo: "Pantalon 03",
        imagen: "./img/pantalones/pantalon-03.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones",
        },
        precio: 2000,
    },
    {
        id: "pantalon-04",
        titulo: "Pantalon 04",
        imagen: "./img/pantalones/pantalon-04.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones",
        },
        precio: 2000,
    },
    {
        id: "pantalon-05",
        titulo: "Pantalon 05",
        imagen: "./img/pantalones/pantalon-05.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones",
        },
        precio: 2000,
    },
    {
        id: "remera-01",
        titulo: "Remera 01",
        imagen: "./img/remeras/remera-01.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras",
        },
        precio: 1000,
    },
    {
        id: "remera-02",
        titulo: "Remera 02",
        imagen: "./img/remeras/remera-02.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras",
        },
        precio: 1000,
    },
    {
        id: "remera-03",
        titulo: "Remera 03",
        imagen: "./img/remeras/remera-03.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras",
        },
        precio: 1000,
    },
    {
        id: "remera-04",
        titulo: "Remera 04",
        imagen: "./img/remeras/remera-04.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras",
        },
        precio: 1000,
    },
    {
        id: "remera-05",
        titulo: "Remera 05",
        imagen: "./img/remeras/remera-05.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras",
        },
        precio: 1000,
    },
    {
        id: "remera-06",
        titulo: "Remera 06",
        imagen: "./img/remeras/remera-06.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras",
        },
        precio: 1000,
    },
    {
        id: "remera-07",
        titulo: "Remera 07",
        imagen: "./img/remeras/remera-07.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras",
        },
        precio: 1000,
    },
    {
        id: "remera-08",
        titulo: "Remera 08",
        imagen: "./img/remeras/remera-08.jpg",
        categoria: {
            nombre: "Remeras",
            id: "remeras",
        },
        precio: 1000,
    },
]

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton__categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto__agregar");
const numerito = document.querySelector("#numerito");

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

cargarProductos(productos);


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
            cargarProductos(productos);
        }
    })
})

/// Funcion para que el boton "Agregar" de cada producto, funcione y mande el producto al carrito

function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll(".producto__agregar");

    botonesAgregar.forEach( boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
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




// Swal.fire({
//     title: 'Email',
//     input: 'text',
//     input: 'text',
//     inputAttributes: {
//       autocapitalize: 'off'
//     },
//     showCancelButton: true,
//     confirmButtonText: 'Look up',
//     showLoaderOnConfirm: true,
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire({
//         title: `${result.value}`,
//         imageUrl: result.value
//       })
//     }
//   })