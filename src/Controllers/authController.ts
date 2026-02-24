import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const sendError = (res: Response, message: string) => {
    res.status(400).json({ error: message });
}

const register = async (req: Request, res: Response) => {
    // Your registration logic here
    //extract email and password from req.body
    const email = req.body.email;
    const password = req.body.password;

    //validate email and password (e.g., check if they are not empty, if email is in correct format, etc.)
    if (!email || !password) {
        return sendError(res, "Email and password are required");
    }

    try {

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        //if user does not exist, create a new user in the database with hashed password
        const user = await User.create({ email, password: encryptedPassword });

        //generate a JWT token for the user

        const jwtSecret = process.env.JWT_SECRET as jwt.Secret;
        const jwtExpiresIn = (process.env.JWT_EXPIRES_IN) as jwt.SignOptions['expiresIn'];

        const accessToken = jwt.sign(
            { userId: user._id, email: user.email },
            jwtSecret,
            { expiresIn: jwtExpiresIn });

        //return the token in the response
        res.status(201).json({ "token": accessToken });

    }
    catch (error) {

        return sendError(res, "Registration failed");
    }

    res.status(500).send("not implemented yet");
};
const login = (req: Request, res: Response) => {
    // Your login logic here
    res.status(500).json({ token: "not implemented yet" });
};

export default {
    register,
    login,
    
};