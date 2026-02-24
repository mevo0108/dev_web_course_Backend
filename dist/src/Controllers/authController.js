"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendError = (res, message) => {
    res.status(400).json({ error: message });
};
const generateToken = (userId) => {
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
    return jsonwebtoken_1.default.sign({ userId }, jwtSecret, { expiresIn: jwtExpiresIn });
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Your registration logic here
    //extract email and password from req.body
    const email = req.body.email;
    const password = req.body.password;
    //validate email and password (e.g., check if they are not empty, if email is in correct format, etc.)
    if (!email || !password) {
        return sendError(res, "Email and password are required");
    }
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const encryptedPassword = yield bcrypt_1.default.hash(password, salt);
        //if user does not exist, create a new user in the database with hashed password
        const user = yield userModel_1.default.create({ email, password: encryptedPassword });
        //generate a JWT token for the user
        const accessToken = generateToken(user._id.toString());
        //return the token in the response
        res.status(201).json({ "token": accessToken });
    }
    catch (error) {
        return sendError(res, "Registration failed");
    }
    res.status(500).send("not implemented yet");
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Your login logic here
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return sendError(res, "Email and password are required");
    }
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return sendError(res, "Invalid email or password");
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return sendError(res, "Invalid email or password");
        }
        //generate a JWT token for the user
        const accessToken = generateToken(user._id.toString());
        res.status(200).json({ "token": accessToken });
    }
    catch (error) {
        return sendError(res, "Login failed");
    }
});
exports.default = {
    register,
    login,
};
//# sourceMappingURL=authController.js.map