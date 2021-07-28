import Transaction from '../models/sequelize/Transaction';
import User from '../models/sequelize/User';
import Operation from '../models/sequelize/Operation';
import JWT from '../services/jwt';
import { hashCode } from './UserController';

class MeController {};

MeController.getTransactions = (req, res) => {

    const { clientToken, clientSecret } = req.user;
    
    const filters = { where: { '$User.clientToken$': clientToken, '$User.clientSecret$': clientSecret }, order: [['id', 'DESC']], include: [ { model: Operation }, { model: User } ] };

    Transaction.findAll({filters}).then(transactions => {
        res.status(200).json({
            success: true,
            transactions
        });
    })
    .catch(err => {
        res.status(400).json({
            success: false,
            error: err
        });
    });    
};

MeController.createRefundIntent = (req, res) => {
    const { clientToken, clientSecret } = req.user;
    const { idTransaction } = req.params;
    const { amount } = req.body;
    
    Transaction.findOne({ 
        where: { '$User.clientSecret$': clientSecret, '$User.clientToken$': clientToken, '$User.confirmed$': true, id: idTransaction },
        include: [ {model: User}, {model: Operation}],
    })
        .then(trans => {

            const hasError = () => {
                const totalPaid = trans.get('Operations').reduce((acc, it) => (it.type === 'PAYMENT' && it.status === 'COMPLETED')? acc + it.amount : acc, 0);
                const totalRefunded = trans.get('Operations').reduce((acc, it) => it.type === 'REFUND' && it.status === 'COMPLETED' ? acc + it.amount : acc, 0);

                if (totalPaid < (totalRefunded + amount)) return true;

                return false;
            }
            
            if (!(trans && amount && !hasError())) return res.status(400).json({ success: false, err: 'Bad request' });

            Operation.create({ status: 'WAITING', amount, type: 'REFUND', TransactionId: trans.get('id') }, { include: [ { model: Transaction, include: [ { model: User } ] } ]})
                    .then(operationToProcess => {

                        const paymentToken = JWT.create({
                            type: 'checkout',
                            operation: {
                                id: operationToProcess.id,
                                amount: operationToProcess.amount,
                                TransactionId: operationToProcess.TransactionId,
                                type: operationToProcess.type
                            },
                            transaction: {
                                id: trans.get('id'),
                            },
                        });
                        
                        const transaction = {
                            ...trans.toJSON(),
                            checkoutForm: `http://localhost:3000/checkout/${paymentToken}`,
                        };
                        
                        return res.status(200).json({ success: true, transaction });

                    });
        });
}

MeController.createTransactionIntent = (req, res) => {

    const { clientToken, clientSecret } = req.user;
    
    User.findOne({ where: { clientSecret, clientToken, confirmed: true }}).then(user => {
        // Reject if no user found
        if (!user) return res.status(400).json({ success: false, err: 'Bad request' });
        // Retrieve transactions information
        const { basket, customer, billingAddress, deliveryAddress, currency, total } = req.body;
        // 
        Transaction.create({ status: 'PENDING', basket, customer, billingAddress, deliveryAddress, currency, total, UserId: user.get('id') }, { include: [ User ] })
            .then(trans => {

                Operation.create({ status: 'WAITING', amount: trans.total, type: 'PAYMENT', TransactionId: trans.get('id') }, { include: [ {model: Transaction} ]})
                    .then(operationToProcess => {

                        const paymentToken = JWT.create({
                            type: 'checkout',
                            operation: {
                                id: operationToProcess.id,
                                amount: operationToProcess.amount,
                                TransactionId: operationToProcess.TransactionId,
                                type: operationToProcess.type
                            },
                            transaction: {
                                id: trans.get('id'),
                            },
                        });
                        
                        const transaction = {
                            ...trans.toJSON(),
                            checkoutForm: `http://localhost:3000/checkout/${paymentToken}`,
                        };
                        
                        return res.status(200).json({ success: true, transaction });

                    })
            });
    });
};


MeController.renewCredentials = (req, res) => {

    const { user } = req;

    User.findOne({ where: { id: user.id }}).then(found => {
        if (!found) return res.status(400).json({ success: false, error: 'Bad request' });

        // Renew credentials
        found
            .set('clientSecret', `secret_${hashCode('CLIENT_SECRET_' + found.get('email') + Date())}`)
            .set('clientToken', `token_${hashCode('CLIENT_TOKEN_' + found.get('email') + Date())}`)
        .save();

        // Return a token
        const token = JWT.create({
            ...user,
            credentials: {
                user: found.get('clientToken'),
                password: found.get('clientSecret'),
            },
        });

        res.status(200).json({
            success: true,
            token,
        });
        
    }).catch(err => res.status(500).json({ success: false, error: 'Unknown error' }));
};

export default MeController;