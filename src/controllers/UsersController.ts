import {Request, Response} from 'express'
import bcryptjs from 'bcryptjs'
import knex from '.././database/connection';

class UsersController{
  async create(req: Request, res: Response){
    const { firstName, lastName, email, password } = req.body;
    try {
      const passwordHash = await bcryptjs.hash(password, 8);
      const user = {
        firstName,
        lastName,
        email,
        password: passwordHash,
      }
      const id = await knex('users').insert(user)
      
      return res.json({
        id: id[0],
        firstName,
        lastName,
        email,
      })
    } catch (error) {
      return res.status(400).json({ errors: ['Não foi possivel realizar o cadastro.']});
    }
    
  }

  async index(req: Request, res: Response){
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
  }
}

export default UsersController;