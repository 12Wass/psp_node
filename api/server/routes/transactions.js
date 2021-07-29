import express from 'express';
import TransactionController from '../../controllers/TransactionController';
import JWT from '../../services/jwt';

const router = express.Router();

// Get all transactions [ Reachable for token type 'admin' ] --> see login method
router.route('/')
  .get(JWT.verify, TransactionController.cGet);

router.route('/:id')
  .get(JWT.verify, TransactionController.iGet);

router.route('/:idTransaction/operations/:idOperation/cancel')
  .post(JWT.verify, TransactionController.cancelOrder);

router.route('/:idTransaction/operations')
  .post(JWT.verify, TransactionController.createOperation);

export default router;