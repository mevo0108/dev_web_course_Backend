"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    // Your authentication logic here
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format
    // Here you would typically verify the token and extract user information
    // For example, using jwt.verify(token, secret) if you're using JWTs
    const secret = process.env.JWT_SECRET;
    // If the token is valid, you can attach the user information to the request object
    try {
        const decodedUserInfo = jsonwebtoken_1.default.verify(token, secret);
        req.user = { _id: decodedUserInfo.userId }; // Attach user info to request object for use in controllers
        next(); // Call the next middleware or route handler
    }
    catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map