"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const moviesRoute_1 = __importDefault(require("./routes/moviesRoute"));
const CommentsRoute_1 = __importDefault(require("./routes/CommentsRoute"));
const app = (0, express_1.default)();
dotenv_1.default.config({ path: '.env.dev' });
app.use(express_1.default.json());
app.use('/movie', moviesRoute_1.default);
app.use('/comment', CommentsRoute_1.default);
const initApp = () => {
    const promise = new Promise((resolve, reject) => {
        const dbUrl = process.env.DATABASE_URL;
        if (!dbUrl) {
            reject('DATABASE_URL is not defined in environment variables');
            return;
        }
        mongoose_1.default
            .connect(dbUrl)
            .then(() => {
            resolve(app);
        });
        const db = mongoose_1.default.connection;
        db.on('error', (error) => console.error(error));
        db.once('open', () => console.log('Connected to Database'));
    });
    return promise;
};
exports.default = initApp;
//# sourceMappingURL=index.js.map