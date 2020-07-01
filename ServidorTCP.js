// Servidor TCP
const net = require('net');

// variables servidor
const puerto = 15000;

// iniciamos servidor
iniciarServidor();

function iniciarServidor() {
	// Creamos el servidor TCP
	const server = net.createServer();
	// creamos la variable de lectura
	// Emite cuando el socket está listo y escuchando mensajes de datagramas
	server.listen(puerto, 'localhost', () => {
		const address = server.address();
		const port = address.port;
		const ipaddr = address.address;
		console.log("--------PEREZ URIA NAIN ADALID - PARALELO: 'B'--------");
        console.log("------------------------------------------------------");
		console.log(" - Servidor TCP iniciado - ");
		console.log("   El servidor esta escuchando : " + ipaddr + ":" + port);
		console.log(" - Esperando peticion del Cliente - ");
	});
	// Array de sockets
	const sockets = [];
	server.on('connection', (sock) => {
		// Agregamos sock al Array de sockets
		sockets.push(sock);
		// Recibimos el dato y enviamos
		sock.on('data', data => {
			// almacemos la cadena del cliente en datoRecibido
			var datoRecibido = data.toString();
			// Mostramos el dato recibido del cliente
			console.log('CLIENTE : '+ datoRecibido);
			// Preparamos el Buffer para encapsular el mensaje
			const dataBuffer = Buffer.from(datoRecibido);
			// Enviamos dato a cliente
			i = 0; 
			while(sockets.length > i){
			   if(sockets[i].remotePort != sock.remotePort){
			      sockets[i].write(dataBuffer);
			   }
			   i++;
	        }
		});

		// Cerramos la conexion del socket
		sock.on('close', data => {
			let index = sockets.findIndex( o => {
				return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
			});
			if (index !== -1) {
				sockets.splice(index, 1);
			}
		});
	});

	// Emite cuando existe algun error
	server.on('error', (error) => {
		console.log("error", error);
		server.close();
	});
}