import User from "../models/sequelize/User";
import { decode } from "punycode";

class Auth {};

Auth.verify = function(req, res, next) {
    let token;
    
    if (req.headers['authorization']) {
        if (req.headers['authorization'].split(' ')[0] === 'Basic') {
            token = req.headers['authorization'].split(' ')[1];
        } 
    } else {
        token = req.query.token;
    }

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'Forbidden'
        });
    }

    req.token = token;
    //
    
    try {
        const decodedToken = new Buffer.from(token, 'base64').toString('ascii');
        const clientToken = decodedToken.split(':')[0];
        const clientSecret = decodedToken.split(':')[1];
        // Retrieve the payload and give it to the req
        let credentials = { clientToken, clientSecret };
        // console.log('credentials', credentials);
        User.findOne({ where: credentials }).then(data => {
            if (data) {
                req.user = data.toJSON();
                return next();
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                });
            }
        });
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }
}

export default Auth;