import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';
import { classToClass } from 'class-transformer'
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import CustomErrorHandler from '../errors/CustomErrorHandler';
import AuthConfig from '../config/auth';
class SessionController {

  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ username }, { relations: ['roles'] });

    if (!user) {
      throw new CustomErrorHandler('Incorrect username or password');
    }

    const matchPassword = await compare(password, user.password);

    if (!matchPassword) {
      throw new CustomErrorHandler('Incorrect username or password');
    }

    const token = sign({}, AuthConfig.jwt.secret, {
      subject: user.id,
      expiresIn: AuthConfig.jwt.expiresIn
    });

    return response.json({
      user: classToClass(user),
      token,
    });
  }
}


export default new SessionController;