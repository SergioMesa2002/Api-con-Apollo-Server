document.addEventListener('DOMContentLoaded', function() {

    const API_URL = 'http://localhost:5000/api/auth'; // Asegúrate de que esta sea la URL correcta

    // Función para enviar datos al servidor
    async function sendData(endpoint, data) {
        try {
            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Verifica si la respuesta es válida
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || `Error: ${res.status} ${res.statusText}`);
            }

            return await res.json();
        } catch (error) {
            console.error(error);
            document.getElementById('message').textContent = 'Error: ' + error.message;
        }
    }

    // Lógica para crear Bus
    const createBusForm = document.getElementById('createBusForm');
    if (createBusForm) {
        createBusForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const busPlate = document.getElementById('busPlate').value;
            const driverId = document.getElementById('busDriver').value; // ID del conductor
            const departureCity = document.getElementById('departureCity').value;
            const arrivalCity = document.getElementById('arrivalCity').value;

            const data = { plate: busPlate, driver: driverId, departureCity, arrivalCity };
            const response = await sendData('/create-bus', data);

            if (response) {
                document.getElementById('message').textContent = response.message;
                if (response.message.includes('exitosamente')) {
                    createBusForm.reset();
                }
            }
        });
    }

    // Lógica para crear Conductor
    const createDriverForm = document.getElementById('createDriverForm');
    if (createDriverForm) {
        createDriverForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const driverCedula = document.getElementById('driverCedula').value;
            const driverName = document.getElementById('driverName').value; // ID corregido: 'driverName'
            const driverLicense = document.getElementById('driverLicense').value;

            const data = { driverCedula, driverName, driverLicense };
            const response = await sendData('/create-driver', data);

            if (response) {
                document.getElementById('message').textContent = response.message;
                if (response.message.includes('exitosamente')) {
                    createDriverForm.reset();
                }
            }
        });
    }

    // Lógica para crear Viaje
    const createTripForm = document.getElementById('createTripForm');
    if (createTripForm) {
        createTripForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const tripOrigin = document.getElementById('tripOrigin').value;
            const tripDestination = document.getElementById('tripDestination').value;
            const tripDepartureTime = document.getElementById('tripDepartureTime').value;
            const busId = document.getElementById('busDriver').value;

            const data = { origin: tripOrigin, destination: tripDestination, departureTime: tripDepartureTime, bus: busId };
            const response = await sendData('/create-trip', data);

            if (response) {
                document.getElementById('message').textContent = response.message;
                if (response.message.includes('exitosamente')) {
                    createTripForm.reset();
                }
            }
        });
    }

    // Lógica para ver historial de viajes
    const viewTripHistoryButton = document.getElementById('viewTripHistory');
    if (viewTripHistoryButton) {
        viewTripHistoryButton.addEventListener('click', async () => {
            try {
                const res = await fetch(`${API_URL}/trip-history`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // Verifica si la respuesta es válida
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || `Error: ${res.status} ${res.statusText}`);
                }

                const data = await res.json();
                console.log(data);
                document.getElementById('message').textContent = 'Historial de viajes obtenido exitosamente.';
                // Aquí puedes agregar lógica para mostrar el historial en el DOM
            } catch (error) {
                console.error(error);
                document.getElementById('message').textContent = 'Error: ' + error.message;
            }
        });
    }

});
