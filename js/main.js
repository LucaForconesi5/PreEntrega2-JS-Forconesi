const carrito = [];

const productos = [
    {
        id: "juego-01",
        titulo: "Uncharted 2",
        precio: 2300,
        img: "./img/01.jpg",
    },
    {
        id: "juego-02",
        titulo: "Uncharted 3",
        precio: 3200,
        img: "./img/02.jpg",
    },
    {
        id: "juego-03",
        titulo: "COD: Black Ops I",
        precio: 952,
        img: "./img/04.jpg",
    },
    {
        id: "juego-03",
        titulo: "COD: Black Ops II",
        precio: 4350,
        img: "./img/05.jpg",
    },
    {
        id: "juego-03",
        titulo: "COD: Black Ops III",
        precio: 6000,
        img: "./img/06.jpg",
    },
    {
        id: "juego-03",
        titulo: "COD: Modern Warfare III",
        precio: 1500,
        img: "./img/07.jpg",
    }
];

const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");

productos.forEach((producto) => {

    let div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img class="producto-img" src="${producto.img}" alt="">
        <h3>${producto.titulo}</h3>
        <p>$${producto.precio}</p>
    `;

    let button = document.createElement("button");
    button.classList.add("producto-btn");
    button.innerText = "Agregar al carrito";
    button.addEventListener("click", () => {
        agregarAlCarrito(producto);
    })

    div.append(button);
    contenedorProductos.append(div);
});

const agregarAlCarrito = (producto) => {
    carrito.push(producto);
    actualizarCarrito();
}

function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");

        carritoProductos.innerHTML = "";
        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <h3>${producto.titulo}</h3>
                <p>$${producto.precio}</p>
            `;

            let button = document.createElement("button");
            button.classList.add("carrito-producto-btn");
            button.innerText = "❌";
            button.addEventListener("click", () => {
                borrarDelCarrito(producto);
            })

            div.append(button);
            carritoProductos.append(div);
        })
    }
    actualizarTotal();
}

function borrarDelCarrito(producto) {
    const indice = carrito.findIndex((item) => item.id === producto.id);
    carrito.splice(indice, 1);
    actualizarCarrito();
}

function actualizarTotal() {
    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
    carritoTotal.innerText = "$" + total;
}