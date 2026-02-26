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
exports.registerTestUser = exports.commentsData = exports.userData = exports.singleMovieData = exports.moviesData = void 0;
const supertest_1 = __importDefault(require("supertest"));
const userModel_1 = __importDefault(require("../models/userModel"));
exports.moviesData = [
    {
        title: "Inception",
        year: 2010
    },
    {
        title: "The Matrix",
        year: 1999
    },
    {
        title: "Interstellar",
        year: 2014
    }
];
exports.singleMovieData = {
    title: "Inception",
    year: 2010
};
exports.userData = {
    email: "berrebimevo@test.com",
    password: "testpasswordMovies",
    token: "",
    _id: "",
};
exports.commentsData = [
    {
        message: "Great post!",
        MovieId: "11111",
        userId: "22222",
    },
    {
        message: "I totally agree with you.",
        MovieId: "333333",
        userId: "444444",
    },
    {
        message: "Thanks for sharing your thoughts.",
        MovieId: "333333",
        userId: "444444",
    }
];
const registerTestUser = (app) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModel_1.default.deleteMany({ email: exports.userData.email });
    const res = yield (0, supertest_1.default)(app).post('/auth/register')
        .send({
        email: exports.userData.email,
        password: exports.userData.password
    });
    exports.userData._id = res.body._id;
    exports.userData.token = res.body.token;
});
exports.registerTestUser = registerTestUser;
//# sourceMappingURL=testUtils.js.map