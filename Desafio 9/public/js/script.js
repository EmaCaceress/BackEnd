(function () {
    // formulario
    const form = document.querySelector("form");
    const tbody = document.querySelector("tbody");
    const inputProducto = document.getElementById("input-producto");
    const inputPrecio = document.getElementById("input-precio");
    // mensaje
    const formChat = document.getElementById("chat");
    const inputEmail = document.getElementById("input-email");
    const inputMensaje = document.getElementById("input-mensaje");
    const historial_mensajes = document.getElementById("historial-mensajes");
    const socket = io();

    socket.on('connect', () => {
        console.log('Conectado al servidor');
    });

    // Productos
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = {
            producto: inputProducto.value,
            precio: inputPrecio.value,
        }
        socket.emit('push', data);
        inputPrecio.value = ""
        inputProducto.value = ""
    });
    socket.on('down', carrito => {
        tbody.innerHTML = ''
        carrito.map((obj) => {
            let tr = document.createElement("tr")
            let td = `
            <td>${obj.id}</td>
            <td>${obj.producto}</td>
            <td>${obj.precio}</td>
            `;
            tr.innerHTML += td;
            tbody.appendChild(tr)
        })
    })

    // Mensajes
    formChat.addEventListener("submit", (event) => {
        event.preventDefault();
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        const data = {
            email: inputEmail.value,
            mensaje: inputMensaje.value,
            fecha: hoy.toUTCString(),
        };
        socket.emit('push_mensaje', data, (response) => {
            console.log(response)

        });
        inputMensaje.value = ""
    });
    socket.on('historial_mensajes', mensajes => {
        console.log(mensajes)
        historial_mensajes.innerHTML = ''
        mensajes.map(mensaje => {
            let div = document.createElement("div")
            div.innerHTML += `
                    <p>${mensaje.email}</p>
                    <p>${mensaje.fecha}</p>
                    <p>${mensaje.mensaje}</p>
            `;
            historial_mensajes.appendChild(div)
        })
    })
})();

