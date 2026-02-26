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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index")); // Adjust the path as necessary
const userModel_1 = __importDefault(require("../models/userModel"));
const moviesModel_1 = __importDefault(require("../models/moviesModel"));
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, index_1.default)();
    // Any setup needed before tests run
    yield userModel_1.default.deleteMany({});
    yield moviesModel_1.default.deleteMany({});
}));
afterAll((done) => {
    // Any cleanup needed after tests run
    console.log('Finished Auth API tests.');
    done();
});
const userData = {
    email: "testuser@example.com",
    password: "testpassword",
    token: "",
    _id: "",
};
const movie = {
    title: "test movie title",
    year: 2024,
};
describe('Auth API', () => {
    // Relevant whene the register do a register and login actions
    test("access restricted url denied with no token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/movie')
            .send({ movie });
        expect(response.statusCode).toBe(401);
    }));
    test("test register a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/auth/register')
            .send({
            email: userData.email,
            password: userData.password
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("token");
        userData._id = response.body._id;
        userData.token = response.body.token;
    }));
    test("test access with token permitted", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/movie')
            .set("Authorization", "Bearer " + userData.token)
            .send(movie);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("_id");
    }));
    test("test access with modified token restricted", () => __awaiter(void 0, void 0, void 0, function* () {
        const newToken = userData.token + "m";
        const response = yield (0, supertest_1.default)(app)
            .post('/movie')
            .set("Authorization", "Bearer " + newToken)
            .send(movie);
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("error");
    }));
    test("test login a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({
            email: userData.email,
            password: userData.password
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("token");
    }));
    test("test access with token permitted after LOGIN", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/movie')
            .set("Authorization", "Bearer " + userData.token)
            .send(movie);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("_id");
        movie._id = response.body._id;
    }));
    //set jest timeout to 10 seconds
    jest.setTimeout(10000); // Set a longer timeout for this test to allow for token expiration
    test("test token expiration", () => __awaiter(void 0, void 0, void 0, function* () {
        // Simulate token expiration by waiting for a short time (5 second)
        yield new Promise(resolve => setTimeout(resolve, 6000)); // Adjust the time as needed
        const response = yield (0, supertest_1.default)(app)
            .post('/movie')
            .set("Authorization", "Bearer " + userData.token)
            .send(movie);
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("error");
    }));
});
//# sourceMappingURL=auth.test.js.map