import { Router } from 'express';
import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';

const routes = Router();

routes.post('/sessions', SessionController.store);

// Houses
routes.post('/houses', HouseController.store);

export default routes;