import { DecodeToken } from "../utility/tokenUtility.js";

export default (req, res, next) => {
    try {
        let token = req.headers['token'] || req.headers['authorization']?.replace('Bearer ', '') || req.cookies?.token;
        
        if (!token) {
            return res.status(401).json({Status: "fail", Message: "No token provided"});
        }

        let decoded = DecodeToken(token);
        if(decoded === null){
            return res.status(401).json({Status: "fail", Message: "Invalid or expired token"});
        }

    // email, user_id pick from decoded token
    let email = decoded.email;
    let user_id = decoded.user_id;

    // Attach a user object to the request for downstream handlers (preferred)
    req.user = { email, user_id };

    // Keep headers for backward compatibility
    req.headers.email = email;
    req.headers.user_id = user_id;

        // If there's a refresh token, set it in response header
        if(decoded.RefreshToken) {
            res.setHeader('X-Refresh-Token', decoded.RefreshToken);
        }

        next();
    } catch (error) {
        return res.status(401).json({Status: "fail", Message: "Authentication failed", Error: error.message});
    }
}