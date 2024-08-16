alert("BIENVENIDO A TIEMPO DE VINO");

let nombreUsuario = prompt("Ingrese nombre:");
    while(nombreUsuario == "") {
        alert("ingrese usuario");
nombreUsuario = prompt("ingrese nombre:");
}

let edadUsuario = parseInt(prompt("Ingrese su edad:"));

if (edadUsuario >= 18) {
    alert(nombreUsuario + " BIENVENIDO A TIENDA DE VINO ");
    
let respuesta = prompt("¿Quiere conocer las membresias de TIENDA DE VINO? SI O NO");

if (respuesta === "sí") {
    console.log("el usuario quiere conocer las memebresias.");
} else if (respuesta === "no") {
    alert("puede suscribirse mensualmente a las membresia de TIENDA DE VINO en la Web");
} else {
    alert("Respuesta inválida. Por favor, ingresa 'sí' o 'no'.");
}

function elegirMembresia() {
    membresia = prompt("Elige una de las opciones: \n1- Membresia Bronce \n2- Membresia Plata \n3- Membresia Oro");
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


} else {
    alert("vuelve cuando seas mayor");
}
