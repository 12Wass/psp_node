import express from 'express';
import MeController from '../../../../buy-your-language-full/api/controllers/MeController';
import Auth from '../../../../buy-your-language-full/api/services/auth';
import JWT from '../../../../buy-your-language-full/api/services/jwt';

const router = express.Router();

// Get all transactions [ Reachable for token type 'admin' ] --> see login method
router.route('/transactions')
  .get(Auth.verify, MeController.getTransactions)
  .post(Auth.verify, MeController.createTransactionIntent);

// Get all transactions [ Reachable for token type 'admin' ] --> see login method
router.route('/transactions/:idTransaction/refund')
  .post(Auth.verify, MeController.createRefundIntent);

// Renew Saler credentials
router.route('/renew_credentials')
  .post(JWT.grantedType('saler'), MeController.renewCredentials);

export default router;