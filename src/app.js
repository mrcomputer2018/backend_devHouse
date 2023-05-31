import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

class App {
    constructor() {
        this.server = express();

        this.middleware();
        this.routes();
    }

    middleware() {
        dotenv.config();
        this.server.use(express.json());
        db();
    }

    routes() {
        this.server.use(routes);
    }
}

async function db(){
    try {

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(">>> Conectado ao Banco de Dados");

    } catch (error) {
        console.log(`Erro: ${error.message}`);
    }
}

module.exports = new App().server;