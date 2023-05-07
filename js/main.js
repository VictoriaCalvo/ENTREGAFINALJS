let productos = []

fetch('./data/stock.json')
    .then(response => response.json())
    .then(data => {
        productos = data
        cargarProductos(productos)
    })


const contenedorProductos = document.querySelector('#contenedor_productos')
const botonesCategorias = document.querySelectorAll('.boton_categoria')
const tituloPrincipal = document.getElementById('titulo_principal')
let botonAgregar = document.querySelectorAll('.producto_agregar')
const numerito = document.getElementById('numerito')

let carrito = []


const actualizarNumerito = () => {
    let nuevoNmerito = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    numerito.innerText = nuevoNmerito
}

let carritoLS = localStorage.getItem('productos_en_carrito')

if (carritoLS) {
    carrito = JSON.parse(carritoLS)
    actualizarNumerito()

} else {
    carrito = []

}

const agregarAlCarrito = (e) => {

    Toastify({
        text: "producto agregado",
        duration: 1000,
        close: false,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "black",
            textTransform: 'uppercase',
            fontSize: '.75rem'
        },

        offset: {
            x: '1rem',
            y: '1rem'
        },
        onClick: function () { } 
    }).showToast();

    const idBoton = e.currentTarget.id
    const productoAgregado = productos.find(producto => producto.id === idBoton)

    if (carrito.some(producto => producto.id === idBoton)) {
        const index = carrito.findIndex(producto => producto.id === idBoton)
        carrito[index].cantidad++
    } else {
        productoAgregado.cantidad = 1
        carrito.push(productoAgregado)
    }
    actualizarNumerito()

    localStorage.setItem('productos_en_carrito', JSON.stringify(carrito))

}

const actualizarBotonAgregar = () => {
    botonAgregar = document.querySelectorAll('.producto_agregar')

    botonAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito)
    })
}

const cargarProductos = (productosElegidos) => {

    contenedorProductos.innerHTML = ''

    productosElegidos.forEach(producto => {

        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML += `
                        <img class="wow animate__animated animate__fadeIn producto_img" src="${producto.imagen}"
                            alt="${producto.nombre}">
                        <div class="producto_detalle">
                            <p class="producto_nombre">${producto.nombre}</p>
                            <div class="producto_precio">${producto.precio} ARS</div>
                            <button id=${producto.id} class="producto_agregar">AÑADIR A LA CESTA</button>
                        </div>
                        `

        contenedorProductos.appendChild(div)
    })

    actualizarBotonAgregar()
}

botonesCategorias.forEach(boton => {
    boton.addEventListener('click', (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove('active'))
        e.currentTarget.classList.add('active')

        if (e.currentTarget.id != 'todos') {

            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText = productoCategoria.categoria.nombre

            const productoModelos = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productoModelos)
        } else {
            tituloPrincipal.innerText = 'TODOS LOS PRODUCTOS'
            cargarProductos(productos)
        }

    })

})

