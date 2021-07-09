import express from 'express';
import knex from './database/connection';

const routes  = express.Router();

routes.get('/', (req, res) => {
  return res.json({message: 'Home'})
})

// 
routes.get('/users', async (req, res) => {
  const users = await knex('users').select('*');
  const serializedUsers = users.map((user) => {
    const name = `${user.firstName} ${user.lastName}`;
    return {
      id: user.id,
      name,
      email: user.email,
      password: user.password,
    }
  })
  return res.json(serializedUsers);
});

routes.post('/users', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await knex('users').insert({
    firstName,
    lastName,
    email,
    password,
  })

  return res.json({message: 'Success'})
});




export default routes;