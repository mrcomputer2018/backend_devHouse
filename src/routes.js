import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';

const routes = Router();

// iniciando multer
const multer = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

// Houses
routes.post('/houses', upload.single('thumbmail'), HouseController.store);

export default routes;