import jwt from 'jsonwebtoken';

class JWT {};

JWT.SECRET_KEY = '_--)89"!!é03:;??:q:;d,/j^w &"éxo dçfenlkgp^à0fifMùlQLDNV(';

JWT.create = function(payload, options = { expiresIn: '1h' }) {
    let token = jwt.sign(payload, JWT.SECRET_KEY);
    return token;
}

JWT.verify = async function(req, res, next) {
    let token;
    
    if (req.headers['authorization']) {
        if (req.headers['authorization'].split(' ')[0] === 'Bearer') {
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
        // Retrieve the payload and give it to the req
        let payload = jwt.verify(token, JWT.SECRET_KEY);
        req.user = payload;
        return next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }
}

JWT.grantedType = function(type) {
    let token;
    return (req, res, next) => {
        // Retrieve the token
        if (req.headers['authorization']) {
            if (req.headers['authorization'].split(' ')[0] === 'Bearer') {
                token = req.headers['authorization'].split(' ')[1];
            } 
        } else {
            token = req.param('token');
        }

        if (!token) {
            return res.status(404).json({
                success: false,
                message: 'Not found'
            });
        };

        req.token = token;
        //
        try {
            // Retrieve the payload and give it to the req
            let payload = jwt.verify(token, JWT.SECRET_KEY);
            req.user = payload;

            const allowedTypes = type.split('|');

            if (type && !(allowedTypes.includes(payload.type))) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                });
            }

            return next();
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }
    }
}

export default JWT;