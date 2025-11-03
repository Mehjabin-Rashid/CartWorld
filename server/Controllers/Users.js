import { RegisterService, LoginService, LogOutService } from "../Service/Userservice.js";

//! Register
export const register = async (req, res) =>{
    let result = await RegisterService(req);
    return res.json(result);
};

//! Login
export const login = async (req, res) =>{
    let result = await LoginService(req, res);
    return res.json(result);
};

//! Logout
export const logout = async (req, res) =>{
    let result = await LogOutService(req, res);
    return res.json(result);
};
