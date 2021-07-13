import {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'

type User = {
  id: string,
  email: string,
}

export default (req: Request, res: Response, next: NextFunction) => {
  const {authorization} = req.headers;

  if(!authorization) {
    return res.status(401).json({errors: ['Login requerido!']})
  }
  const [, token] = authorization.split(' ')

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET as string)
    const {id, email} = data as User;
    req.userId = id;
    return next()
    
  } catch (error) {
    return res.status(401).json({errors: ['Token expirado ou inválido']})
  }
}