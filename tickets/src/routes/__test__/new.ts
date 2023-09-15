import { requireAuth, validateRequest } from '@kodetickets/common';
import express, { Request, Response, Router } from 'express';
import { body } from 'express-validator';
const router:Router = express.Router();

router.post('/api/tickets',requireAuth,[
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
],validateRequest, (req:Request, res:Response) => {
  
  res.status(201).send({
    data: {},
    message: 'ticket is created successfully',
    success: true
  })
})

export { router as createTicketRouter };