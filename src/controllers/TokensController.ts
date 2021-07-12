import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import knex from '../database/connection';

class TokensController{
  async store(req: Request, res: Response){
    const {email, password} = req.body;
    if(!email || !password) {
      return res.status(401).json({ errors: ['Credenciais inválidas']});
    }
    
    const user = await knex('users').where('email', email).first();

    if (!user) {
      return res.status(401).json({ errors: ['Usuário não existe.']});
    }
    const validPassword = await bcryptjs.compare(password, user.password);
    if(!validPassword) {
      return res.status(401).json({ errors: ['Senha inválida']});
    }
    const {id} = user; 
    const token = jwt.sign({id, email}, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    return res.json({token});
    
  }

  
}

export default TokensController;