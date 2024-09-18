alert("BIENVENIDO A TIEMPO DE VINO");

let nombreUsuario = prompt("Ingrese nombre:");
    while(nombreUsuario == "") {
        alert("ingrese usuario");
nombreUsuario = prompt("ingrese nombre:");
}

let edadUsuario = parseInt(prompt("Ingrese su edad:"));

if (edadUsuario >= 18) {
    alert(nombreUsuario + " BIENVENIDO A TIENDA DE VINO ");
    
let respuesta = prompt("¿Quiere conocer las membresias de TIENDA DE VINO? si o no");

if (respuesta === "si") {
    console.log("el usuario quiere conocer las memebresias.");
} else if (respuesta === "no") {
    alert("puede suscribirse mensualmente a las membresia de TIENDA DE VINO en la Web");
} else {
    alert("Respuesta inválida. Por favor, ingresa 'sí' o 'no'.");
}

function elegirMembresia() {
    let membresia = prompt("Elige una de las opciones: \n1- Membresia Bronce \n2- Membresia Plata \n3- Membresia Oro");
    if (membresia === "1") {
        alert("Has elegido la Membresia Bronce. ¡Bienvenido!");
    } else if (membresia === "2") {
        alert("Has elegido la Membresia Plata. ¡Excelente elección!");
    } else if (membresia === "3") {
        alert("Has elegido la Membresia Oro. ¡Felicidades!");
    } else {
        alert("Opción inválida. Por favor, elige una opción válida.");
    }
}
elegirMembresia();

let carroDeCompras  = [];

class Articulo {
    constructor(id, nombreProducto, precioProducto, varietal,) {
        this.id = id;
        this.nombreProducto = nombreProducto;
        this.precioProducto = precioProducto;
        this.varietalProducto= varietal;
    }
}

const articulos = [
    new Articulo(1, "Enrique Foster Reserva", 83000, ["Malbec", "Cabernet Sauvignon", "Pinot Noir", "Syrah"], ),
    new Articulo(2, "Enrique Foster Edición Limitada", 99000, ["Malbec", "Cabernet Sauvignon", "Pinot Noir", "Syrah"],),
    new Articulo(3, "Enrique Foster Single Vineyard Los Barrancos", 84000, ["Malbec", "Cabernet Sauvignon", "Pinot Noir", "Syrah"],),
    new Articulo(4, "Mauricio Lorca Ópalo Malbec", 60000, ["Malbec", "Cabernet Sauvignon", "Pinot Noir", "Syrah"],),
    new Articulo(5, "Enrique Foster Firmado Malbec", 180000, ["Malbec", "Cabernet Sauvignon", "Pinot Noir", "Syrah"],),
    new Articulo(6, "Mauricio Lorca Ancestral Malbec", 160000, ["Malbec", "Cabernet Sauvignon", "Pinot Noir", "Syrah"],),
    new Articulo(7, "Enrique Foster Ique Malbec", 40000, ["Malbec", "Cabernet Sauvignon", "Pinot Noir", "Syrah"],),
    new Articulo(8, "Enrique Foster Single Vineyard Los Altepes", 80000, ["Malbec", "Cabernet Sauvignon", "Pinot Noir", "Syrah"],),
    new Articulo(9, "Mauricio Lorca Fantasía", 70000, ["Malbec", "Cabernet Sauvignon", "Pinot Noir", "Syrah"],),
    new Articulo(10, "Mauricio Lorca Inspirado", 120000, ["Malbec", "Cabernet Sauvignon", "Pinot Noir", "Syrah"],),
    new Articulo(11, "Mauricio Lorca Poético", 45000, ["Malbec", "Cabernet Sauvignon", "Pinot Noir", "Syrah"],),
    new Articulo(12, "Enrique Foster Reserva", 120000, ["Malbec", "Cabernet Sauvignon", "Pinot Noir", "Syrah"],),
    new Articulo(13, "Enrique Foster Ique", 96000, ["Malbec", "Cabernet Sauvignon", "Pinot Noir", "Syrah",] )
];

function mostrarArticulos() {
    const contenedor = document.getElementById("containertienda");
    contenedor.innerHTML = " "; 
    
    articulos.forEach(articulo => {
        const articuloDiv = document.createElement ("div");
        articuloDiv.classList.add("articulo");
        
        const varietalesDiv = document.createElement("div");
        varietalesDiv.classList.add("varietal");

        varietalProducto.forEach(varietal => {
            const varietalBoton = document.createElement("button");
            varietalBoton.textContent = varietal;
            varietalBoton.classList.add("varietal-boton");
            varietalBoton.onclick = () => {
                seleccionarVarietal(varietal, articulo.id);
            };
            varietalesDiv.appendChild(varietalBoton);
        });
        
        articuloDiv.innerHTML = `
            <h3>${articulo.nombreProducto}</h3>
            <p>Precio: $${articulo.precioProducto}</p>
        `;
        
        articuloDiv.appendChild(varietalesDiv);
        
        contenedor.appendChild(articuloDiv);
    });

    const precioConIVA = (articulo.precioProducto * (1 + IVA)).toFixed(2);

        articuloDiv.innerHTML = `
            <h3>${articulo.nombreProducto}</h3>
            <p>Precio: $${precioConIVA}</p>
        `;
}

function buscarArticulos() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const articulosFiltrados = articulos.filter(articulo => 
        articulo.nombreProducto.toLowerCase().includes(input)
    );
    mostrarArticulosFiltrados(articulosFiltrados);
}

function mostrarArticulosFiltrados(articulosFiltrados) {
    const contenedor = document.getElementById("containertienda");
    contenedor.innerHTML = ''; 
    
    articulosFiltrados.forEach(articulo => {
        const articuloDiv = document.createElement("div");
        articuloDiv.classList.add("articulo");
        
        const varietalesDiv = document.createElement("div");
        varietalesDiv.classList.add("varietales");
        articulo.varietalProducto.forEach(varietal => {
            const varietalBoton = document.createElement("button");
            varietalBoton.textContent = varietal;
            varietalBoton.classList.add("varietal-boton");
            varietalBoton.onclick = () => {
                seleccionarVarietal(varietal, articulo.id);
            };
            varietalesDiv.appendChild(varietalBoton);
        });
        
        articuloDiv.innerHTML = `
            <h3>${articulo.nombreProducto}</h3>
            <p>Precio: $${articulo.precioProducto}</p>
        `;
        
        articuloDiv.appendChild(varietalesDiv);
        
        contenedor.appendChild(articuloDiv);
    });
}

function seleccionarVarietal(varietal, articuloId) {
    const articulo = articulos.find(a => a.id === articuloId);
    if (articulo) {
        let cantidad = parseInt(prompt(`¿Cuántas unidades deseas de ${articulo.nombreProducto} (${varietal})?`), 10);
        if (isNaN(cantidad) || cantidad <= 0) {
            alert("No agregaste ningun vino, agregue las unidades que quieres a la caja");
        } else {
            let itemEnCaja = caja.find(item => item.articulo.id === articulo.id && item.varietal === varietal);
            if (itemCaja) {
                itemCaja.cantidad += cantidad;
            } else {
                caja.push({ articulo, cantidad, varietal });
            }
            guardarCaja();
            actualizarContadorCaja();
            alert(`Has aagregado ${cantidad} unidad(es) de ${articulo.nombreProducto} (${varietal}) a la caja.`);
        }
    } else {
        alert("Artículo no encontrado.");
    }
}

function mostrarCaja() {
    const cartOverlay = document.getElementById('cartOverlay');
    const cartContents = document.getElementById('cartContents');
    
    if (caja.length === 0) {
        cartContents.innerHTML = "<p>no hay ningun vino en la caja</p>";
    } else {
        let resumenCaja = "";
        let total = 0;
        caja.forEach((item, index) => {
            const precioConIVA = (item.articulo.precioProducto * (1 + IVA)).toFixed(2);
            const subtotal = (item.cantidad * item.articulo.precioProducto * (1 + IVA)).toFixed(2);
            resumenCaja += `
                <div class="cart-item">
                    <p><strong>Artículo:</strong> ${item.articulo.nombreProducto}</p>
                    <p><strong>Varietal:</strong> ${item.varietal}</p>
                    <p><strong>Precio Unitario (con IVA):</strong> $${precioConIVA}</p>
                    <p><strong>Subtotal:</strong> $${subtotal}</p>
                    <input type="number" value="${item.cantidad}" min="1" onchange="actualizarCantidad(${index}, this.value)">
                    <button onclick="eliminarArticulo(${index})">Eliminar</button>
                </div>
            `;
            total += parseFloat(subtotal);
        });
        resumenCaja += `<p><strong>Su total es :</strong> $${total.toFixed(2)}</p>`;
        cartContents.innerHTML = resumenCarrito;
    }
    
    cartOverlay.style.display = 'block';
}

function actualizarCantidad(index, nuevaCantidad) {
    nuevaCantidad = parseInt(nuevaCantidad, 10);
    if (isNaN(nuevaCantidad) || nuevaCantidad <= 0) {
        alert("no hay vinos agregados, agregue algun vino.");
        return;
    }

    caja[index].cantidad = nuevaCantidad;
    if (nuevaCantidad === 0) {
        caja.splice(index, 1); 
    }
    guardarCaja();
    actualizarCaja();
    mostrarCaja();
}

function eliminarArticulo(index) {
    caja.splice(index, 1);
    guardarCaja();
    actualizarCaja();
    mostrarCaja();
}

function ocultarCaja() {
    const cartOverlay = document.getElementById('cartOverlay');
    cartOverlay.style.display = 'none';
}

function actualizarCaja() {
    const contadorCaja = document.getElementById('contadorCaja');
    const totalArticulos = caja.reduce((acc, item) => acc + item.cantidad, 0);
    contadorCaja.textContent = `${totalArticulos}`;
}

function finalizarCompra() {
    if (caja.length === 0) {
        alert("No hay productos en la caja. No puedes finalizar la compra.");
        return;
    }

    alert("¡Gracias por tu compra! Tu pedido ha sido procesado.");
    caja= [];
    guardarCaja();
    actualizarContadorCaja;
    mostrarCaja(); 
}

function guardarCaja() {
    localStorage.setItem('caja', JSON.stringify(caja));
}

function mostrarMensaje(mensaje, tipo = 'info') {
    const mensajeDiv = document.getElementById('mensaje');
    if (!mensajeDiv) return;

    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = `mensaje ${tipo}`;
    mensajeDiv.style.display = 'block';

    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 2500); 
}

function cargarCaja() {
    const cargarCaja = localStorage.getItem('Caja');
    if (cargarCaja) {
        caja = JSON.parse(CargarCaja);
        actualizarContadorCaja();
    }
}

window.onload = function() {
    cargarCaja();
    mostrarArticulos();
    mostrarMenu();
};

else {
    alert("vuelve cuando seas mayor");
}
