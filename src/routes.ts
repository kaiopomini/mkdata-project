import express from 'express';

import SchedulesController from './controllers/SchedulesController'
import UsersController from './controllers/UsersController'

const routes  = express.Router();
const schedulesController = new SchedulesController();
const usersController = new UsersController();


routes.get('/', (req, res) => {
  return res.json({message: 'Home'})
})

routes.post('/users', usersController.create);
routes.get('/users', usersController.index);

routes.post('/schedules', schedulesController.create)
routes.get('/schedules', schedulesController.index)
routes.get('/schedules/:id', schedulesController.show)
routes.put('/schedules/:id', schedulesController.update)
routes.delete('/schedules/:id', schedulesController.delete)




export default routes;