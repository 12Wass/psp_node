import User from '../models/sequelize/User';
import Mailer from '../services/mailer';
import { ValidationError } from 'sequelize';
import JWT from '../services/jwt';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserController {};

UserController.get = (req, res) => {
    User.findAll().then(users => {
        res.status(200).json({
            success: true,
            users
        });
    })
    .catch(err => {
        res.status(200).json({
            success: false,
            error: err
        });
    });    
} 

UserController.put = (req, res) => {
    User.update(req.body, { returning: true, where: { id: req.params.id } })
      .then(([nbUpdated, result]) =>
        nbUpdated ? res.json(result[0]) : res.sendStatus(404)
      )
      .catch((error) => {
        if (error instanceof ValidationError) {
          console.log(error.errors);
          const errors = error.errors.reduce((acc, item) => {
            acc[item.path] = [...(acc[item.path] || []), item.message];
            return acc;
          }, {});
          res.status(400).json(errors);
        } else {
          console.log(error);
          res.sendStatus(500);
        }
      });
}

UserController.register = (req, res) => {
    User.create(req.body).then((user) => {
        // Create a token for confirmation
        const validationToken = JWT.create({
            type: 'confirmation_account',
            user: {
                id: user.id,
                email: user.email,
            },
        }, { expiresIn: '24h' });
        // Send mail
        const validationURL = `http://localhost:3000/account/confirm/${validationToken}`; // Root URL should be in config file in order to handle dev/prod mode
        Mailer.send({
            to: user.email,
            subject: 'Confirm your email to finish!',
            html: `Welcome! Please validate your email: <a href="${validationURL}">Validate my email</a>`,
        }, (err, info) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Mail has been sent: ${validationURL}`);
            }
        });
        return res.status(201).json({
            success: true,
            user: user,
        });
    }).catch(error => {
        if (error instanceof ValidationError) {
            const errors = error.errors.reduce((acc, item) => {
                acc[item.path] = [...(acc[item.path] || []), item.message];
                return acc;
            }, {});
            res.status(400).json(errors);
        } else {
            res.sendStatus(500);
        }
    });
}

UserController.login = (req, res) => {
    const { email, password } = req.body;

    if (email === 'admin@admin.fr' && password === 'admin_test') {
        const token = JWT.create({
            type: 'admin',
            firstname: 'Admin',
            lastname: 'Admin',
        });
        // Valid
        res.status(200).json({ success: true, token });
    }

    User.findOne({ where: { email } })
        .then( data => {
            if (!data) {
                return Promise.reject("invalid");
            } else {
                return bcrypt.compare(password, data.password).then((valid) => {
                    if (!valid) {
                        return Promise.reject("invalid");
                    } else {
                        return Promise.resolve(data);
                    }
                });
            }
        })
        .then(user => {
            if (!user.confirmed) return Promise.reject('Please, validate your account.');
            const token = JWT.create({
                type: 'saler',
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                credentials: {
                    user: user.clientToken,
                    password: user.clientSecret,
                },
            });
            // Valid
            res.status(200).json({ success: true, token });
        })
        .catch(err => res.status(400).json({ success: false, error: err }));
};

UserController.confirmAccount = (req, res) => {
    const { token } = req.body;

    const payload = jwt.verify(token, JWT.SECRET_KEY);

    if (payload.type === 'confirmation_account') {
        User.findOne({ where: { id: payload.user.id } }).then(user => {
            if (!user) {
                return res.status(400).json({ success: false, error: 'No user found' });
            } else {
                // We should mark user as Confirmed and also generateFor him some credentials

                if (user.confirmed) return res.status(400).json({ success: false, error: 'Already valid' });
                
                user
                    .set('confirmed', true)
                    .set('clientSecret', `secret_${hashCode('CLIENT_SECRET_' + user.email + Date())}`)
                    .set('clientToken', `token_${hashCode('CLIENT_TOKEN_' + user.email + Date())}`)
                .save();

                res.status(200).json({ success: true });
            }
        }).catch(err => res.status(400).json({ success: false, error: err }));
    }

};

export const hashCode = s => s.split('').reduce((a,b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0)

export default UserController;