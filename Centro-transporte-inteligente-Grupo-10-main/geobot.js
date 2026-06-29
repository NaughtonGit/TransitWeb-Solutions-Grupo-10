const viajesGeobot = {
    "la-plata": {
        destino: "La Plata",
        transporte: "Línea Roca",
        salida: "Estación Plaza Constitución",
        tiempo: "58 minutos",
        costo: "$420 aprox."
    },
    "plaza-mayo": {
        destino: "Plaza de Mayo",
        transporte: "Línea 79",
        salida: "Terminal GeoTransporte - Plataforma 2",
        tiempo: "42 minutos",
        costo: "$320 aprox."
    },
    "uade": {
        destino: "Campus UADE",
        transporte: "Shuttle UADE - Roca",
        salida: "Terminal GeoTransporte - Plataforma 3",
        tiempo: "18 minutos",
        costo: "Sin costo adicional"
    },
    "circuito-sur": {
        destino: "Circuito Sur turístico",
        transporte: "Transporte turístico Circuito Sur",
        salida: "Terminal GeoTransporte - Sector 4",
        tiempo: "90 minutos",
        costo: "$1800 aprox."
    }
};

document.body.insertAdjacentHTML("beforeend", `
    <aside class="chatbot" aria-label="Asistente virtual de GeoTransporte">
        <button class="chatbot-toggle" type="button" id="chatbot-toggle" aria-expanded="false" aria-controls="chatbot-panel">
            💬
        </button>
        <div class="chatbot-panel" id="chatbot-panel" hidden>
            <div class="chatbot-header">
                <div>
                    <p class="chatbot-label">Asistente virtual</p>
                    <h2>GeoBot</h2>
                </div>
                <button class="chatbot-close" type="button" id="chatbot-close" aria-label="Cerrar chat">×</button>
            </div>
            <div class="chatbot-messages" id="chatbot-messages" aria-live="polite">
                <div class="mensaje bot">Hola, soy GeoBot. Puedo ayudarte con viajes, servicios, SUBE, accesibilidad y medios de transporte.</div>
            </div>
            <div class="chatbot-sugerencias" aria-label="Preguntas sugeridas">
                <button type="button" data-question="¿Cómo consulto un viaje?">Consulta de viaje</button>
                <button type="button" data-question="¿Qué servicios tiene la terminal?">Servicios</button>
                <button type="button" data-question="¿Dónde cargo la SUBE?">SUBE</button>
            </div>
            <form class="chatbot-form" id="chatbot-form">
                <label for="chatbot-input" class="sr-only">Escribí tu pregunta</label>
                <input type="text" id="chatbot-input" placeholder="Escribí tu pregunta..." autocomplete="off">
                <button type="submit">Enviar</button>
            </form>
        </div>
    </aside>
`);

const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotPanel = document.getElementById("chatbot-panel");
const chatbotForm = document.getElementById("chatbot-form");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotMessages = document.getElementById("chatbot-messages");

function abrirChatbot() {
    chatbotPanel.hidden = false;
    chatbotToggle.setAttribute("aria-expanded", "true");
    chatbotInput.focus();
}

function cerrarChatbot() {
    chatbotPanel.hidden = true;
    chatbotToggle.setAttribute("aria-expanded", "false");
}

function agregarMensaje(texto, tipo) {
    const mensaje = document.createElement("div");
    mensaje.className = "mensaje " + tipo;
    mensaje.textContent = texto;
    chatbotMessages.appendChild(mensaje);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function agregarOpcionesViaje() {
    const opciones = document.createElement("div");
    opciones.className = "mensaje bot opciones-chat";
    opciones.innerHTML = `
        <p>Elegí un destino para ver la consulta:</p>
        <button type="button" data-viaje-chat="la-plata">La Plata</button>
        <button type="button" data-viaje-chat="plaza-mayo">Plaza de Mayo</button>
        <button type="button" data-viaje-chat="uade">Campus UADE</button>
        <button type="button" data-viaje-chat="circuito-sur">Circuito Sur turístico</button>
    `;
    chatbotMessages.appendChild(opciones);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function responderViaje(destino) {
    const viaje = viajesGeobot[destino];
    if (!viaje) return "No encontré ese destino. Probá con La Plata, Plaza de Mayo, Campus UADE o Circuito Sur.";

    return `${viaje.destino}: te conviene usar ${viaje.transporte}. Salida: ${viaje.salida}. Tiempo estimado: ${viaje.tiempo}. Costo estimado: ${viaje.costo}.`;
}

function responderPregunta(pregunta) {
    const texto = pregunta.toLowerCase();

    if (texto.includes("viaje") || texto.includes("destino") || texto.includes("llegar")) {
        return "Te muestro las opciones disponibles para consultar transporte recomendado, plataforma, tiempo y costo estimado.";
    }

    if (texto.includes("baño") || texto.includes("servicio") || texto.includes("terminal") || texto.includes("comida") || texto.includes("estacionamiento")) {
        return "La terminal cuenta con baños, oficina de información, locales gastronómicos, áreas de espera y estacionamiento. Podés verlo en la página Terminal.";
    }

    if (texto.includes("sube") || texto.includes("cargar")) {
        return "Podés cargar la SUBE en el kiosco del Sector C y en terminales automáticas del hall central.";
    }

    if (texto.includes("accesibilidad") || texto.includes("reducida") || texto.includes("rampa")) {
        return "Hay asistencia para personas con movilidad reducida. Se solicita en la oficina de información o en plataformas.";
    }

    if (texto.includes("roca") || texto.includes("tren")) {
        return "La Línea Roca sale desde Estación Plaza Constitución y conecta con La Plata y otros ramales.";
    }

    if (texto.includes("79") || texto.includes("colectivo")) {
        return "La Línea 79 sale desde Terminal GeoTransporte - Plataforma 2 y conecta con Plaza de Mayo.";
    }

    if (texto.includes("uade") || texto.includes("shuttle")) {
        return "El Shuttle UADE sale desde Terminal GeoTransporte - Plataforma 3 y está orientado a estudiantes y docentes en días hábiles.";
    }

    if (texto.includes("turístico") || texto.includes("turistico") || texto.includes("circuito")) {
        return "El Circuito Sur turístico sale desde Terminal GeoTransporte - Sector 4 y funciona como recorrido de fin de semana.";
    }

    return "Puedo ayudarte con consulta de viajes, servicios de terminal, SUBE, accesibilidad, Línea Roca, Línea 79, Shuttle UADE y Circuito Sur.";
}

chatbotToggle.addEventListener("click", abrirChatbot);
chatbotClose.addEventListener("click", cerrarChatbot);

chatbotForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const pregunta = chatbotInput.value.trim();
    if (!pregunta) return;

    agregarMensaje(pregunta, "usuario");
    chatbotInput.value = "";

    setTimeout(function () {
        agregarMensaje(responderPregunta(pregunta), "bot");
        if (pregunta.toLowerCase().includes("viaje") || pregunta.toLowerCase().includes("destino") || pregunta.toLowerCase().includes("llegar")) {
            agregarOpcionesViaje();
        }
    }, 250);
});

document.querySelectorAll("[data-question]").forEach(function (boton) {
    boton.addEventListener("click", function () {
        const pregunta = boton.dataset.question;
        agregarMensaje(pregunta, "usuario");
        setTimeout(function () {
            agregarMensaje(responderPregunta(pregunta), "bot");
            if (pregunta.toLowerCase().includes("viaje") || pregunta.toLowerCase().includes("destino") || pregunta.toLowerCase().includes("llegar")) {
                agregarOpcionesViaje();
            }
        }, 250);
    });
});

chatbotMessages.addEventListener("click", function (event) {
    const botonViaje = event.target.closest("[data-viaje-chat]");
    if (!botonViaje) return;

    const destino = botonViaje.dataset.viajeChat;
    agregarMensaje(botonViaje.textContent, "usuario");
    setTimeout(function () {
        agregarMensaje(responderViaje(destino), "bot");
    }, 250);
});
