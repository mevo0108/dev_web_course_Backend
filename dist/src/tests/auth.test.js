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
let app;
const testData = [
    {
        email: "testuser@example.com",
        password: "testpassword"
    },
    {
        email: "testmatrix@example.com",
        password: "matrixpassword"
    },
    {
        email: "testinterstellar@example.com",
        password: "interstellarpassword"
    }
];
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, index_1.default)();
    // Any setup needed before tests run
    // await auth.deleteMany({});
}));
afterAll((done) => {
    // Any cleanup needed after tests run
    console.log('Finished Auth API tests.');
    done();
});
describe('Auth API', () => {
    // Relevant whene the register do a register and login actions
    test("test register a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/auth/register')
            .send({
            email: "testuser@example.com",
            password: "testpassword"
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("token");
    }));
    test("test login a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({
            email: "testuser@example.com",
            password: "testpassword"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("token");
    }));
    test("test logout a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/auth/logout')
            .send({
            email: "testuser@example.com"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message", "Logged out successfully");
    }));
});
//# sourceMappingURL=auth.test.js.map