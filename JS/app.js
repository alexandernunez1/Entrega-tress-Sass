
// Desestructuración de objetos y arrays
// Desestructuración de objetos y arrays
const { localStorage, document, fetch, console, window } = globalThis;
const { parse, stringify } = JSON;

// Variables y constantes
let carroDeCompras = [];
const IVA = 0.21;
let articulos = [];

// Clase Articulo
class Articulo {
    constructor(id, nombreProducto, precioProducto, varietal) {
        Object.assign(this, { id, nombreProducto, precioProducto, varietalProducto: varietal });
    }
}

// Recuperar carrito guardado
const carritoGuardado = localStorage.getItem('carrito');
if (carritoGuardado) {
    carroDeCompras = parse(carritoGuardado);
}

// Funciones
const eliminarDelCarrito = (id) => {
    carroDeCompras = carroDeCompras.filter(item => item.id !== id);
    localStorage.setItem('carrito', stringify(carroDeCompras));
    actualizarVistaCarrito();
};

const cargarArticulos = async () => {
    try {
        const respuesta = await fetch("http://localhost:5500/Entrega-tress-Sass/json/vinos.json");
        if (!respuesta.ok) throw new Error(`Error al obtener los productos: Código: ${respuesta.status}`);
        const productos = await respuesta.json();
        articulos = productos.map(({ id, nombre, precio, varietalProducto }) => new Articulo(id, nombre, precio, varietalProducto));
        localStorage.setItem('articulos', stringify(articulos));
        await mostrarArticulos();
    } catch (error) {
        console.error("Error al cargar artículos:", error);
        mostrarMensaje("Hubo un error al cargar los artículos. Por favor, intente de nuevo más tarde.", "error");
    }
};

const mostrarArticulos = async () => {
    try {
        const contenedor = document.getElementById("containertienda");
        if (!contenedor) throw new Error("El contenedor de la tienda no se encontró en el DOM");
        contenedor.innerHTML = "";
        
        articulos.forEach(({ id, nombreProducto, precioProducto, varietalProducto }) => {
            const articuloDiv = document.createElement("div");
            articuloDiv.classList.add("articulo");
            
            const varietalesDiv = document.createElement("div");
            varietalesDiv.classList.add("varietal");

            varietalProducto.forEach(varietal => {
                const varietalBoton = document.createElement("button");
                Object.assign(varietalBoton, {
                    textContent: varietal,
                    className: "varietal-boton",
                    onclick: () => seleccionarVarietal(varietal, id)
                });
                varietalesDiv.appendChild(varietalBoton);
            });
            
            const precioConIVA = (precioProducto * (1 + IVA)).toFixed(2);
            articuloDiv.innerHTML = `
                <h3>${nombreProducto}</h3>
                <p>Precio (con IVA): $${precioConIVA}</p>
            `;
            
            articuloDiv.appendChild(varietalesDiv);
            contenedor.appendChild(articuloDiv);
        });
    } catch (error) {
        console.error("Error al mostrar artículos:", error);
        mostrarMensaje("Hubo un error al cargar los artículos. Por favor, intente de nuevo más tarde.", "error");
    }
};

const buscarArticulos = async () => {
    try {
        const input = document.getElementById('searchInput');
        if (!input) throw new Error("El campo de búsqueda no se encontró en el DOM");
        const busqueda = input.value.toLowerCase();
        const articulosFiltrados = articulos.filter(({ nombreProducto }) => 
            nombreProducto.toLowerCase().includes(busqueda)
        );
        await mostrarArticulosFiltrados(articulosFiltrados);
    } catch (error) {
        console.error("Error al buscar artículos:", error);
        mostrarMensaje("Hubo un error al buscar artículos. Por favor, intente de nuevo.", "error");
    }
};

const mostrarArticulosFiltrados = async (articulosFiltrados) => {
    try {
        const contenedor = document.getElementById("containertienda");
        if (!contenedor) throw new Error("El contenedor de la tienda no se encontró en el DOM");
        contenedor.innerHTML = '';
        
        articulosFiltrados.forEach(({ id, nombreProducto, precioProducto, varietalProducto }) => {
            const articuloDiv = document.createElement("div");
            articuloDiv.classList.add("articulo");
            
            const varietalesDiv = document.createElement("div");
            varietalesDiv.classList.add("varietales");
            varietalProducto.forEach(varietal => {
                const varietalBoton = document.createElement("button");
                Object.assign(varietalBoton, {
                    textContent: varietal,
                    className: "varietal-boton",
                    onclick: () => seleccionarVarietal(varietal, id)
                });
                varietalesDiv.appendChild(varietalBoton);
            });
            
            const precioConIVA = (precioProducto * (1 + IVA)).toFixed(2);
            articuloDiv.innerHTML = `
                <h3>${nombreProducto}</h3>
                <p>Precio (con IVA): $${precioConIVA}</p>
            `;
            
            articuloDiv.appendChild(varietalesDiv);
            contenedor.appendChild(articuloDiv);
        });
    } catch (error) {
        console.error("Error al mostrar artículos filtrados:", error);
        mostrarMensaje("Hubo un error al mostrar los resultados de la búsqueda. Por favor, intente de nuevo.", "error");
    }
};

const seleccionarVarietal = async (varietal, articuloId) => {
    try {
        const articulo = articulos.find(({ id }) => id === articuloId);
        if (!articulo) throw new Error("Artículo no encontrado");
        
        const cantidad = parseInt(prompt(`¿Cuántas unidades deseas de ${articulo.nombreProducto} (${varietal})?`), 10);
        if (isNaN(cantidad) || cantidad <= 0) throw new Error("Cantidad inválida");
        
        const itemEnCaja = carroDeCompras.find(item => item.articulo.id === articulo.id && item.varietal === varietal);
        if (itemEnCaja) {
            itemEnCaja.cantidad += cantidad;
        } else {
            carroDeCompras.push({ articulo, cantidad, varietal });
        }
        
        localStorage.setItem('carrito', stringify(carroDeCompras));
        actualizarVistaCarrito();
        
        mostrarMensaje(`Has agregado ${cantidad} unidad(es) de ${articulo.nombreProducto} (${varietal}) a la caja.`, "success");
    } catch (error) {
        console.error("Error al seleccionar varietal:", error);
        mostrarMensaje(error.message === "Cantidad inválida" ? "No agregaste ningún vino. Por favor, ingrese una cantidad válida." : "Hubo un error al agregar el artículo. Por favor, intente de nuevo.", "error");
    }
};

const actualizarVistaCarrito = () => {
    const carritoContainer = document.getElementById('carrito-container');
    if (!carritoContainer) return;

    carritoContainer.innerHTML = '';
    carroDeCompras.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>${item.articulo.nombreProducto} (${item.varietal}) - Cantidad: ${item.cantidad}</p>
            <button onclick="eliminarDelCarrito('${item.articulo.id}')">Eliminar</button>
        `;
        carritoContainer.appendChild(itemDiv);
    });
};

const mostrarMensaje = (mensaje, tipo) => {
    const mensajeDiv = document.getElementById('mensaje');
    if (!mensajeDiv) return;

    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = tipo;
    mensajeDiv.style.display = 'block';

    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 3000);
};

window.onload = async () => {
    try {
        await cargarArticulos();
        actualizarVistaCarrito();
        
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', buscarArticulos);
        }
    } catch (error) {
        console.error("Error durante la carga inicial:", error);
        mostrarMensaje("Hubo un error al cargar la página. Por favor, recargue e intente de nuevo.", "error");
    }
};

const obtenerProductos = async () => {
    try {
        const respuesta = await fetch("http://localhost:5500/Entrega-tress-Sass/json/vinos.json");
        if (!respuesta.ok) throw new Error(`Error al obtener los productos: Código: ${respuesta.status}`);
        const productos = await respuesta.json();
        await renderizarProductos(productos);
    } catch (error) {
        console.error(`Hubo un problema con la solicitud fetch:`, error);
        mostrarMensaje("No se pudieron cargar los productos. Por favor, intente más tarde.", "error");
    }
};

const renderizarProductos = async (productos) => {
    try {
        const contenedorProductos = document.getElementById('productos-container');
        if (!contenedorProductos) throw new Error("El contenedor de productos no se encontró en el DOM");

        contenedorProductos.innerHTML = '';
        productos.forEach(({ id, nombre, precio, varietalProducto }) => {
            const divProducto = document.createElement('div');
            divProducto.className = "card card-gris col-10";

            const precioConIVA = (precio * (1 + IVA)).toFixed(2);
            divProducto.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text"><strong>Precio (con IVA):</strong> $${precioConIVA}</p>
                    <p class="card-text"><strong>Categoría:</strong> ${varietalProducto}</p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito('${id}', '${nombre}', ${precio})">Añadir al carrito</button>
                </div>
            `;

            contenedorProductos.appendChild(divProducto);
        });
    } catch (error) {
        console.error("Error al renderizar productos:", error);
        mostrarMensaje("Hubo un error al mostrar los productos. Por favor, recargue la página.", "error");
    }
};

const agregarAlCarrito = (id, nombre, precio) => {
    const item = { id, nombre, precio, cantidad: 1 };
    const itemExistente = carroDeCompras.find(i => i.id === id);
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carroDeCompras.push(item);
    }
    localStorage.setItem('carrito', stringify(carroDeCompras));
    actualizarVistaCarrito();
    mostrarMensaje(`Se ha añadido ${nombre} al carrito.`, "success");
};

document.addEventListener('DOMContentLoaded', obtenerProductos);