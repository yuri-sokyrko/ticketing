import { NotAuthorizedError, NotFoundError, requireAuth } from '@ysg-tickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Order } from '../models/order';

const router = express.Router();

router.get(
  '/api/orders/:orderId',
  requireAuth,
  [
    body('orderId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided')
  ],
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId);
   
    if(!order) {
      throw new NotFoundError();
    }
    if(order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as showOrderRouter };