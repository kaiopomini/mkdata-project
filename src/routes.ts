import express from 'express';

import SchedulesController from './controllers/SchedulesController'
import UsersController from './controllers/UsersController'
import TokensController from './controllers/TokensController'

import loginRequired from './middlewares/loginRequired';

const routes  = express.Router();
const schedulesController = new SchedulesController();
const usersController = new UsersController();
const tokensController = new TokensController();


routes.get('/', (req, res) => {
  return res.json({message: 'Home'})
})

routes.post('/tokens', tokensController.store);

routes.post('/users', usersController.create);
routes.get('/users/me', loginRequired, usersController.index);

routes.post('/schedules', loginRequired, schedulesController.create)
routes.get('/schedules', loginRequired, schedulesController.index)
routes.get('/schedules/:id', loginRequired, schedulesController.show)
routes.put('/schedules/:id', loginRequired, schedulesController.update)
routes.delete('/schedules/:id', loginRequired, schedulesController.delete)




export default routes;