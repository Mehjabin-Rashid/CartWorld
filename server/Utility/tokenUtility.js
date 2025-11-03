import { JWT_EXPIRE_TIME, JWT_KEY } from "../Config/BD.js";
import jwt from "jsonwebtoken";

// Encode a JWT token with email and user_id payload
export const EncodeToken = (email, user_id) => {
    let key = JWT_KEY;
    let expire = JWT_EXPIRE_TIME;
    let payload = { email, user_id };
    return jwt.sign(payload, key, { expiresIn: expire });
};

// Decode and verify a JWT token
export const DecodeToken = (token) => {
    try {
        let key = JWT_KEY;
        let expire = JWT_EXPIRE_TIME;
        let decoded = jwt.verify(token, key);

        // If decoded token has email, refresh the token
        if (decoded.email) {
            let RefreshToken = jwt.sign({ email: decoded.email, user_id: decoded.user_id }, key, { expiresIn: expire });
            return { RefreshToken, email: decoded.email, user_id: decoded.user_id };
        }
        return null;
    } catch (err) {
        return null;
    }
};