import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';

class App {
    constructor() {
        this.server = express();

        dotenv.config();
        db();

        this.middleware();
        this.routes();
    }

    middleware() {
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        );
        this.server.use(express.json());
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

export default new App().server;