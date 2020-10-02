import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import RoleRepository from '../repositories/RoleRepository';
import PermissionRepository from '../repositories/PermissionRepositiory';
import CustomErrorHandler from '../errors/CustomErrorHandler';

class RoleController {
  async create(request: Request, response: Response) {
    const roleRepository = getCustomRepository(RoleRepository);
    const permissionRepository = getCustomRepository(PermissionRepository);

    const { name, description, permissions } = request.body;

    const existRole = await roleRepository.findOne({ name });

    if (existRole) {
      throw new CustomErrorHandler('Role already exists!');
    }

    const existPermissions = await permissionRepository.findByIds(permissions);

    const role = roleRepository.create({
      name,
      description,
      permission: existPermissions,
    });

    await roleRepository.save(role);


    return response.status(201).json(role);
  }

  async show(request: Request, response: Response) {
    const roleRepository = getCustomRepository(RoleRepository);

    const { role_id } = request.params;

    const role = await roleRepository.findOne({ id: role_id });

    if (!role) {
      throw new CustomErrorHandler('Role does not exists');
    }

    return response.status(201).json(role);
  }

  async index(request: Request, response: Response) {
    const roleRepository = getCustomRepository(RoleRepository);

    const role = await roleRepository.find();

    return response.status(201).json(role);
  }
}

export default new RoleController;