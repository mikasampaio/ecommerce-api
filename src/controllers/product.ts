import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CreateProductDTO } from '../dtos/ProductDTO';
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

      const {
        name,
        price,
        category,
        quantity,
        size,
        color,
        description,
        discount,
        path,
      } = req.body;

      const response = await this.productService.create({
        name,
        price,
        category,
        quantity,
        size,
        color,
        description,
        discount,
        path,
      });

      // RETORNANDO A RESPOSTA, APÓS A CRIAÇÃO
      res.status(StatusCodes.CREATED).json(response);
    } catch (err) {
      next(err);
    }
  };

  list = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.list();

      res.status(StatusCodes.OK).json(products);
    } catch (err) {
      next(err);
    }
  };
}
