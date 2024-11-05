import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CreateProductDTO, UpdateProductDTO } from '../dtos/ProductDTO';
import { Product } from '../entities/classes/product';
import { UserType } from '../entities/interfaces/common';
import { ErrorMessage } from '../errors/errorMessage';
import { ProductService } from '../services/product';
import { UserService } from '../services/user';

export class ProductController {
  constructor(
    private productService: ProductService,
    private userService: UserService,
  ) {}

  create = async (
    req: Request<unknown, unknown, CreateProductDTO> & { userId?: string },
    res: Response<Product>,
    next: NextFunction,
  ) => {
    try {
      const id = req.userId;
      const { type } = await this.userService.findById(id as string);

      if (type !== UserType.ADMIN) {
        throw new ErrorMessage(
          'Usuário não possui permissão',
          StatusCodes.UNAUTHORIZED,
        );
      }

      const { name, price, discount, category, description, variants } =
        req.body;

      const response = await this.productService.create({
        name,
        price,
        discount,
        category,
        description,
        variants,
      });

      // RETORNANDO A RESPOSTA, APÓS A CRIAÇÃO
      res.status(StatusCodes.CREATED).json(response);
    } catch (err) {
      next(err);
    }
  };

  get = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.get();

      res.status(StatusCodes.OK).json(products);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query;

      const product = await this.productService.getById(id as string);

      res.status(StatusCodes.OK).json(product);
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request<{ id?: string }, unknown, UpdateProductDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.query;
      const product = req.body;

      const updatedProduct = await this.productService.update(
        id as string,
        product,
      );

      res.status(StatusCodes.OK).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query;

      await this.productService.delete(id as string);

      res
        .status(StatusCodes.OK)
        .json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
      next(error);
    }
  };
}
