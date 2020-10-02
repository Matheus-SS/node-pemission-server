import { Request, Response, NextFunction, response } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";
import { verify } from 'jsonwebtoken'
import User from "../models/User";
import CustomErrorHandler from '../errors/CustomErrorHandler';
import AuthConfig from '../config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

async function decoder(request: Request, response: Response): Promise<User | undefined> {
  const authHeader = request.headers.authorization;
  const userRepository = getCustomRepository(UserRepository);

  if (!authHeader) {
    throw new CustomErrorHandler('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const payload = verify(token, AuthConfig.jwt.secret);

    const { sub } = payload as ITokenPayload;

    const user = await userRepository.findOne(sub, { relations: ['roles'] });

    response.locals = { user_id: sub };

    return user;
  } catch {
    throw new CustomErrorHandler('Invalid JWT token', 401);
  }
}

function is(role: String[]) {
  const roleAuthorized = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const user = await decoder(request, response);

    const userRoles = user?.roles.map(role => role.name);

    const existsRoles = userRoles?.some(r => role.includes(r));

    if (existsRoles) {
      return next();
    }
    throw new CustomErrorHandler('Not authorized', 401);
  };

  return roleAuthorized;
}

export { is };