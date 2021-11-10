const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const error = new Error();
    error.status = 403;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const rider = jwt.verify(token, process.env.RIDER_SECRET_KEY);
                req.user = rider;
                return next();
            } catch (e) {
                error.message = 'invalid/expired token';
                return next(error);
            }
        }
        error.message = 'authorization token must be Bearer [token]';
        return next(error);
    }
    error.message = 'authorization header must be provided';
    return next(error);
};