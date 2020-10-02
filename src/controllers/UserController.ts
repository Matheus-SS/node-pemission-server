import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { classToClass } from 'class-transformer';
import UserRepository from '../repositories/UserRepository';
import RoleRepository from '../repositories/RoleRepository';
import CustomErrorHandler from '../errors/CustomErrorHandler';

class UserController {

  async create(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const roleRepository = getCustomRepository(RoleRepository);


    const { name, username, password, roles } = request.body;

    const existUser = await userRepository.findOne({ username });

    if (existUser) {
      throw new CustomErrorHandler('User Already exists!');
    }

    const passwordHashed = await hash(password, 8);

    const existsRoles = await roleRepository.findByIds(roles);

    const user = userRepository.create({
      name,
      username,
      password: passwordHashed,
      roles: existsRoles,
    });


    await userRepository.save(user);

    return response.status(201).json(classToClass(user));
  }


  async index(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);

    let user;
    const userId = response.locals.user_id;

    const users = await userRepository.findById(userId);

    if (!users) {
      throw new CustomErrorHandler("User does not exist");
    }

    const user_role = users.roles.map((user) => user.name);

    if (user_role[0] === 'ROLE_ADMIN') {
      user = await userRepository.findAllIsNotAdmin();
    };

    return response.status(201).json(classToClass(user));
  }


  async delete(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);

    const { user_id } = request.params;

    if (!user_id) {
      throw new CustomErrorHandler('User does not exists');
    }

    await userRepository.delete(user_id);

    return response.json('user deleted');
  }
}

export default new UserController;