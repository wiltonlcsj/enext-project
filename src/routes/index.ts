import { Router } from 'express';
import GameController from '@controllers/GameController';

const routes = Router();

// Endpoint to reload games.log file
routes.get('/reload', GameController.reloadFile);

// Endpoint to list all games
routes.get('/games', GameController.listAll);

// Endpoint to get a game by ID
routes.get('/games/:id', GameController.viewGame);

export default routes;
