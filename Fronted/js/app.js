// URL del backend
const API_URL = 'http://localhost:5000/api/auth';

// Lógica para el inicio de sesión
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            console.log(res.status, data); // Imprime el estado y los datos de la respuesta
            if (res.status === 200) {
                // Guardar el rol en localStorage
                localStorage.setItem('role', data.user.role);
                // Redirigir a la página de administración
                window.location.href = 'admin.html';
            } else {
                document.getElementById('message').textContent = data.message;
            }
        } catch (error) {
            console.error(error); // Imprime el error en la consola
            document.getElementById('message').textContent = 'Error en la conexión';
        }
    });
}

// Lógica para el registro de administradores
const registerAdminForm = document.getElementById('registerAdminForm');
if (registerAdminForm) {
    registerAdminForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const cedula = document.getElementById('cedula').value;
        const nombre = document.getElementById('nombre').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/register-admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cedula, nombre, fechaNacimiento, username, password })
            });

            const data = await res.json();
            console.log(res.status, data); // Imprime el estado y los datos de la respuesta
            document.getElementById('message').textContent = data.message;
            if (res.status === 201) {
                // Redirigir o hacer algo después del registro exitoso
                // window.location.href = 'index.html'; // Cambiar por la URL de destino
            }
        } catch (error) {
            console.error(error); // Imprime el error en la consola
            document.getElementById('message').textContent = 'Error en la conexión';
        }
    });
}

// Lógica para el registro de clientes
const registerClientForm = document.getElementById('registerClientForm');
if (registerClientForm) {
    registerClientForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const cedula = document.getElementById('cedula').value;
        const nombre = document.getElementById('nombre').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/register-client`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cedula, nombre, fechaNacimiento, username, password })
            });

            const data = await res.json();
            console.log(res.status, data); // Imprime el estado y los datos de la respuesta
            document.getElementById('message').textContent = data.message;
            if (res.status === 201) {
                // Redirigir o hacer algo después del registro exitoso
                // window.location.href = 'index.html'; // Cambiar por la URL de destino
            }
        } catch (error) {
            console.error(error); // Imprime el error en la consola
            document.getElementById('message').textContent = 'Error en la conexión';
        }
    });
}

// Lógica para el menú del administrador
const API_URL_ADMIN = 'http://localhost:5000/api/auth'; // Asegúrate de que esta URL sea la correcta

// Mostrar/ocultar formularios
document.getElementById('addBusButton')?.addEventListener('click', () => {
    document.getElementById('createBusForm').style.display = 'block';
    document.getElementById('createDriverForm').style.display = 'none'; // Ocultar otros formularios
    document.getElementById('createTripForm').style.display = 'none'; // Ocultar otros formularios
});

// Lógica para crear Bus
const createBusForm = document.getElementById('createBusForm');
if (createBusForm) {
    document.getElementById('saveBusButton').addEventListener('click', async (e) => {
        e.preventDefault();

        const busPlate = document.getElementById('busPlate').value;
        const driverName = document.getElementById('driverName').value;
        const departureCity = document.getElementById('departureCity').value;
        const arrivalCity = document.getElementById('arrivalCity').value;

        try {
            const res = await fetch(`${API_URL_ADMIN}/create-bus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ busPlate, driverName, departureCity, arrivalCity })
            });

            const data = await res.json();
            document.getElementById('message').textContent = data.message;
            if (res.status === 201) {
                createBusForm.reset(); // Limpiar el formulario después de guardar
            }
        } catch (error) {
            document.getElementById('message').textContent = 'Error en la conexión';
        }
    });
}

// Lógica para crear Conductor
const createDriverForm = document.getElementById('createDriverForm');
if (createDriverForm) {
    document.getElementById('saveDriverButton').addEventListener('click', async (e) => {
        e.preventDefault();

        const driverCedula = document.getElementById('driverCedula').value;
        const driverName = document.getElementById('driverName').value;
        const driverLicense = document.getElementById('driverLicense').value;

        try {
            const res = await fetch(`${API_URL_ADMIN}/create-driver`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ driverCedula, driverName, driverLicense })
            });

            const data = await res.json();
            document.getElementById('message').textContent = data.message;
            if (res.status === 201) {
                createDriverForm.reset(); // Limpiar el formulario después de guardar
            }
        } catch (error) {
            document.getElementById('message').textContent = 'Error en la conexión';
        }
    });
}

// Lógica para crear Viaje
const createTripForm = document.getElementById('createTripForm');
if (createTripForm) {
    document.getElementById('saveTripButton').addEventListener('click', async (e) => {
        e.preventDefault();

        const tripOrigin = document.getElementById('tripOrigin').value;
        const tripDestination = document.getElementById('tripDestination').value;
        const tripDepartureTime = document.getElementById('tripDepartureTime').value;

        try {
            const res = await fetch(`${API_URL_ADMIN}/create-trip`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tripOrigin, tripDestination, tripDepartureTime })
            });

            const data = await res.json();
            document.getElementById('message').textContent = data.message;
            if (res.status === 201) {
                createTripForm.reset(); // Limpiar el formulario después de guardar
            }
        } catch (error) {
            document.getElementById('message').textContent = 'Error en la conexión';
        }
    });
}
