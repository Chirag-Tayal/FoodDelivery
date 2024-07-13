const jwt = require('jsonwebtoken');

const protectedRoute = async (req, res, next) => {
    try { 
        // console.log(req.headers);
        const token = req.headers['authorization']; 
        if (!token ) {
            return res.status(401).send({
                message: "Unauthorized, token missing or invalid",
                success: false
            });
        }
        
        // const tokenString = token.split(' ')[1];
        // console.log(`token`, tokenString);

        const decodedToken =  jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decodedToken._id;

//         // Proceed to the next middleware 
        next();
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Auth error",
            success: false
        });
    }


}

module.exports = {protectedRoute};
