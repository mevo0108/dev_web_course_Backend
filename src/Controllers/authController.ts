import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const sendError = (res: Response, message: string) => {
    res.status(400).json({ error: message });
}
const generateToken = (userId: string): string => {
    const jwtSecret = process.env.JWT_SECRET as jwt.Secret;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'];

    return jwt.sign({ userId }, jwtSecret, { expiresIn: jwtExpiresIn });
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

        const accessToken = generateToken(user.id);

        //return the token in the response
        res.status(201).json({ "token": accessToken });

    }
    catch (error) {

        return sendError(res, "Registration failed");
    }

    res.status(500).send("not implemented yet");
};
const login = async (req: Request, res: Response) => {
    // Your login logic here
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return sendError(res, "Email and password are required");
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return sendError(res, "Invalid email or password");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return sendError(res, "Invalid email or password");
        }

        //generate a JWT token for the user
        const accessToken = generateToken(user.id);
        res.status(200).json({ "token": accessToken });
    }
    catch (error) {
        return sendError(res, "Login failed");
    }
};

export default {
    register,
    login,
};