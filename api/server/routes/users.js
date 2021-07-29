import express from 'express';
import UserController from '../../controllers/UserController'
import JWT from '../../services/jwt';

const router = express.Router();

// Get all users [ Reachable for token type 'admin' ] --> see login method
router.route('/')
  .get(JWT.grantedType('admin'), UserController.get);

// Register a user
router.route('/register')
  .post(UserController.register);

  // Log in a user
router.route('/login')
  .post(UserController.login);

// Confirm any token type
router.route('/confirm')
  .get(JWT.verify, (req, res) => res.json({ success: true }));

// Update a user for admin
router.route('/:id')
  .put(JWT.grantedType('admin'), UserController.put);

// Account confirmation
router.route('/confirm_account')
  .post(UserController.confirmAccount)

export default router;