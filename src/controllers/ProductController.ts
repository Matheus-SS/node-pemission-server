import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import CustomErrorHandler from '../errors/CustomErrorHandler';
import ProductRepository from '../repositories/ProductRepository';

class ProductController {
  async create(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductRepository);

    const { name, description } = request.body;

    const existsProduct = await productRepository.findOne({ name });

    if (existsProduct) {
      throw new CustomErrorHandler('Product already exists!');
    }

    const product = productRepository.create({
      name,
      description
    });

    await productRepository.save(product);


    return response.status(201).json(product);
  }

  async index(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.find()

    return response.json(product);

  }

  async show(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductRepository);

    const { id } = request.params;

    const product = await productRepository.findOne(id);

    return response.json(product);
  }

  async delete(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductRepository);

    const { product_id } = request.params;

    if (!product_id) {
      throw new CustomErrorHandler('Product does not exists');
    }

    await productRepository.delete(product_id);

    return response.json('Product deleted');
  }
}

export default new ProductController;