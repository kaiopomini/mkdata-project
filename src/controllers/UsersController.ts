import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import knex from '.././database/connection';

class UsersController {
  async create(req: Request, res: Response) {
    const { firstName, lastName, email, password, password2 } = req.body;
    if(password !== password2){
      return res.status(400).json({ errors: ['As senhas devem ser iguais'] });
    }
    if(!(firstName && lastName && email && password && password2)){
      return res.status(400).json({ errors: ['Preencha todas as informações'] });
    }
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
      return res.status(400).json({ errors: ['Não foi possivel realizar o cadastro.'] });
    }

  }

  async index(req: Request, res: Response) {
    try {
      const { userId } = req;
      const user = await knex('users').where('id', userId).first();
      const serializedUser = {
        id: userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }

      return res.json(serializedUser);
    } catch (error) {
      return res.status(400).json({ errors: ['Não foi possivel realizar o cadastro.'] });
    }


  }
}

export default UsersController;