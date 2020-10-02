import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import CustomErrorHandler from '../errors/CustomErrorHandler';
import PermissionRepository from '../repositories/PermissionRepositiory';

class PermissionController {
  async create(request: Request, response: Response) {
    const permissionRepository = getCustomRepository(PermissionRepository);

    const { name, description } = request.body;

    const existPermission = await permissionRepository.findOne({ name });

    if (existPermission) {
      throw new CustomErrorHandler('Permission already exists!');
    }

    const permission = permissionRepository.create({
      name,
      description
    });

    await permissionRepository.save(permission);


    return response.status(201).json(permission);
  }


}

export default new PermissionController;