const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const tripRoutes = require('./routes/trip'); // Rutas de trips
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const bodyParser = require('body-parser');
const path = require('path');

// Crear la aplicación de Express
const app = express();

// Configurar archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de CORS
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
};
app.use(cors(corsOptions));

// Configuración para procesar JSON
app.use(express.json());

// Configuración de rutas REST
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/trips', tripRoutes);

// Configuración de Mongoose
mongoose.set('strictQuery', true);
const URI = 'mongodb+srv://sergiomesa01:nOwlqJoGuKxjgEF2@training.m1grr.mongodb.net/?retryWrites=true&w=majority&appName=training';
mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

// --- Configuración de Apollo Server ---
const typeDefs = `
    type Driver {
        id: ID!
        cedula: String!
        name: String!
        license: String!
    }

    type Bus {
        id: ID!
        plate: String!
        driver: Driver!
        departureCity: String!
        arrivalCity: String!
    }

    type Trip {
        id: ID!
        origin: String!
        destination: String!
        departureTime: String!
        bus: Bus!
        driver: Driver!
    }

    type Query {
        drivers: [Driver]
        buses: [Bus]
        trips: [Trip]
    }

    type Mutation {
        createDriver(cedula: String!, name: String!, license: String!): Driver
        deleteDriver(id: ID!): ResponseMessage
        updateDriver(id: ID!, cedula: String, name: String, license: String): Driver

        createBus(plate: String!, driver: ID!, departureCity: String!, arrivalCity: String!): Bus
        deleteBus(id: ID!): ResponseMessage
        updateBus(id: ID!, plate: String, driver: ID, departureCity: String, arrivalCity: String): Bus

        createTrip(origin: String!, destination: String!, departureTime: String!, bus: ID!, driver: ID!): Trip
        deleteTrip(id: ID!): ResponseMessage
        updateTrip(id: ID!, origin: String, destination: String, departureTime: String, bus: ID, driver: ID): Trip
    }

    type ResponseMessage {
        message: String
    }
`;

const resolvers = {
    Query: {
        drivers: async () => await Driver.find(),
        buses: async () => await Bus.find().populate('driver'),
        trips: async () => await Trip.find().populate('bus driver'),
    },
    Mutation: {
        createDriver: async (_, { cedula, name, license }) => {
            const newDriver = new Driver({ cedula, name, license });
            await newDriver.save();
            return newDriver;
        },
        deleteDriver: async (_, { id }) => {
            const result = await Driver.findByIdAndDelete(id);
            if (!result) throw new Error('Conductor no encontrado');
            return { message: 'Conductor eliminado exitosamente' };
        },
        updateDriver: async (_, { id, cedula, name, license }) => {
            const updatedDriver = await Driver.findByIdAndUpdate(
                id,
                { cedula, name, license },
                { new: true }
            );
            if (!updatedDriver) throw new Error('Conductor no encontrado');
            return updatedDriver;
        },

        createBus: async (_, { plate, driver, departureCity, arrivalCity }) => {
            const driverExists = await Driver.findById(driver);
            if (!driverExists) throw new Error('Conductor no encontrado');

            const newBus = new Bus({ plate, driver, departureCity, arrivalCity });
            await newBus.save();
            return newBus;
        },
        deleteBus: async (_, { id }) => {
            const result = await Bus.findByIdAndDelete(id);
            if (!result) throw new Error('Bus no encontrado');
            return { message: 'Bus eliminado exitosamente' };
        },
        updateBus: async (_, { id, plate, driver, departureCity, arrivalCity }) => {
            const updatedBus = await Bus.findByIdAndUpdate(
                id,
                { plate, driver, departureCity, arrivalCity },
                { new: true }
            );
            if (!updatedBus) throw new Error('Bus no encontrado');
            return updatedBus;
        },

        createTrip: async (_, { origin, destination, departureTime, bus, driver }) => {
            const busExists = await Bus.findById(bus);
            const driverExists = await Driver.findById(driver);

            if (!busExists) throw new Error('Bus no encontrado');
            if (!driverExists) throw new Error('Conductor no encontrado');

            const newTrip = new Trip({ origin, destination, departureTime, bus, driver });
            await newTrip.save();
            return newTrip;
        },
        deleteTrip: async (_, { id }) => {
            const result = await Trip.findByIdAndDelete(id);
            if (!result) throw new Error('Viaje no encontrado');
            return { message: 'Viaje eliminado exitosamente' };
        },
        updateTrip: async (_, { id, origin, destination, departureTime, bus, driver }) => {
            const updatedTrip = await Trip.findByIdAndUpdate(
                id,
                { origin, destination, departureTime, bus, driver },
                { new: true }
            );
            if (!updatedTrip) throw new Error('Viaje no encontrado');
            return updatedTrip;
        },
    },
};

// Crear el esquema ejecutable
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Inicializar Apollo Server
const apolloServer = new ApolloServer({ schema });
apolloServer.start().then(() => {
    app.use('/graphql', bodyParser.json(), expressMiddleware(apolloServer));
    console.log('Apollo Server corriendo en http://localhost:5000/graphql');
});

// Configuración para servir archivos estáticos de reservas
app.use('/reservations', express.static(path.join(__dirname, 'reservations')));

// Configuración del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
