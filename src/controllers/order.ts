import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CreateOrderDTO, UpdateOrderDTO } from '../dtos/OrderDTO';
import { Order } from '../entities/classes/order';
import { OrderService } from '../services/order';
import { UserService } from '../services/user';

export class OrderController {
  constructor(
    private orderService: OrderService,
    private userService: UserService,
  ) {}

  create = async (
    req: Request<unknown, unknown, CreateOrderDTO> & { userId?: string },
    res: Response<Order>,
    next: NextFunction,
  ) => {
    try {
      const id = req.userId;

      const { items, orderStatus } = req.body;

      const order = await this.orderService.create({
        items,
        orderStatus,
        user: id as string,
      });

      res.status(StatusCodes.CREATED).json(order);
    } catch (err) {
      next(err);
    }
  };

  get = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await this.orderService.get();

      res.status(StatusCodes.OK).json(orders);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query;

      const order = await this.orderService.getById(id as string);

      res.status(StatusCodes.OK).json(order);
    } catch (err) {
      next(err);
    }
  };

  update = async (
    req: Request<{ id: string }, unknown, UpdateOrderDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.query;

      const data = req.body;

      const updatedOrder = await this.orderService.update(id as string, data);

      res.status(StatusCodes.OK).json(updatedOrder);
    } catch (err) {
      next(err);
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.query;

      await this.orderService.delete(id as string);

      res
        .status(StatusCodes.OK)
        .json({ message: 'Pedido deletado com sucesso' });
    } catch (err) {
      next(err);
    }
  };
}
