let carrito = localStorage.getItem('productos_en_carrito')
carrito = JSON.parse(carrito)

const carritoVacio = document.getElementById('carrito_vacio')
const carritoProductos = document.getElementById('carrito_productos')
const carritoAcciones = document.getElementById('carrito_acciones')
const carritoComprado = document.getElementById('carrito_comprado')
let botonEliminar = document.querySelectorAll('.carrito_mas_menos')
const botonVaciar = document.getElementById('carrito_vaciar')
const contenedorTotal = document.getElementById('total')
const botonComprar = document.getElementById('carrito_comprar')


const eliminarDelCarrito = (e) => {

    Toastify({
        text: "producto eliminado",
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

    const idBoton = e.target.id
    const index = carrito.findIndex(producto => producto.id === idBoton)

    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--
    } else {
        carrito.splice(index, 1)
    }

    cargarProductosCarrito()

    localStorage.setItem('productos_en_carrito', JSON.stringify(carrito))
}

const actualizarBotonEliminar = () => {
    botonEliminar = document.querySelectorAll('.carrito_mas_menos')

    botonEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarDelCarrito)
    })
}

const actualizarTotal = () => {
    const totalCalculado = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    total.innerText = `${totalCalculado}`
}

const cargarProductosCarrito = () => {

    if (carrito && carrito.length > 0) {

        carritoVacio.classList.add('oculto')
        carritoProductos.classList.remove('oculto')
        carritoAcciones.classList.remove('oculto')
        carritoComprado.classList.add('oculto')

        carritoProductos.innerHTML = ''

        carrito.forEach(producto => {

            const div = document.createElement('div')
            div.classList.add('carrito_producto')
            div.innerHTML = `
        <img class="carrito_img" src="${producto.imagen}" alt="${producto.nombre}">
        <div class="carrito_producto_nombre">
            <p>${producto.nombre}</p>
        </div>
        <div class="carrito_producto_cantidad">
            <p id=cantidad${producto.id}>${producto.cantidad}</p>
        </div>
        <div class="carrito_producto_precio">
            <p>${producto.precio} ARS</p>
        </div>
        <div>
        <button class="carrito_mas_menos" value="${producto.id}">
        <i id="${producto.id}" class="fa-solid fa-minus"></i>
            </button>
        </div>
            `

            carritoProductos.append(div)
        })

        actualizarBotonEliminar()
        actualizarTotal()

    } else {
        carritoVacio.classList.remove('oculto')
        carritoProductos.classList.add('oculto')
        carritoAcciones.classList.add('oculto')
        carritoComprado.classList.add('oculto')
    }

}

cargarProductosCarrito()


const vaciarCarrito = () => {

    Swal.fire({
        title: '¿Estás segurx?',
        text: `Se van a borrar ${carrito.reduce ((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        icon: 'question',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        background: 'black',
        color: 'white',
    }).then((result) => {
        if (result.isConfirmed) {

            carrito.length = 0
            localStorage.setItem('productos_en_carrito', JSON.stringify(carrito))
            cargarProductosCarrito()
        }
    })
}
botonVaciar.addEventListener('click', vaciarCarrito)

const comprarCarrito = () => {

    carrito.length = 0
    localStorage.setItem('productos_en_carrito', JSON.stringify(carrito))

    carritoVacio.classList.add('oculto')
    carritoProductos.classList.add('oculto')
    carritoAcciones.classList.add('oculto')
    carritoComprado.classList.remove('oculto')

}
botonComprar.addEventListener('click', comprarCarrito)
