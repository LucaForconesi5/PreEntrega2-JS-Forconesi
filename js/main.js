const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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
        id: "juego-04",
        titulo: "COD: Black Ops II",
        precio: 4350,
        img: "./img/05.jpg",
    },
    {
        id: "juego-05",
        titulo: "COD: Black Ops III",
        precio: 6000,
        img: "./img/06.jpg",
    },
    {
        id: "juego-06",
        titulo: "COD: Warfare III",
        precio: 1500,
        img: "./img/07.jpg",
    }
];

const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");
const vaciarCarrito = document.querySelector("#vaciar-carrito");

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
    let productoEnCarrito = carrito.find((item) => item.id === producto.id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }
    

    actualizarCarrito();

    Toastify({
        text: producto.titulo + " agregado",
        duration: 1500,
        close: true,
        style: {
          background: "#df1717",
          color: "#f2ebd9",
        },
      }).showToast();
}

function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
        vaciarCarrito.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");
        vaciarCarrito.classList.remove("d-none");

        carritoProductos.innerHTML = "";
        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <h3>${producto.titulo}</h3>
                <p>$${producto.precio}</p>
                <p>${producto.cantidad}</p>
                <p>$${producto.cantidad * producto.precio}</p>
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
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
actualizarCarrito();

function borrarDelCarrito(producto) {
    const indice = carrito.findIndex((item) => item.id === producto.id);
    carrito.splice(indice, 1);
    actualizarCarrito();
}

function actualizarTotal() {
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = "$" + total;
}

vaciarCarrito.addEventListener("click", () => {
    Swal.fire({
        title: "¿Seguro querés vaciar el carrito?",
        text: "Se van a borrar todos tus productos.",
        icon: "question",
        showDenyButton: true,
        denyButtonText: "No",
        confirmButtonText: "Si",
        customClass: {
            confirmButton: 'custom-button',
            confirmButton: 'custom-confirm-button',
            denyButton: 'custom-deny-button',
            popup: 'custom-popup',
            title: 'custom-title',
            text: 'custom-text',
            icon: 'custom-icon',
        },
        background: 'white',
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0;
            actualizarCarrito();
            Swal.fire({
                icon: "success",
                title: "Carrito vaciado",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'custom-popup',
                    title: 'custom-title',
                    icon: 'custom-success-icon',
                },
                background: 'white',
            });
        }
    })
})