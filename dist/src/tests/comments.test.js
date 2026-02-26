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
const commentsModel_1 = __importDefault(require("../models/commentsModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const testUtils_1 = require("./testUtils");
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, index_1.default)();
    // Any setup needed before tests run
    yield commentsModel_1.default.deleteMany({});
    yield userModel_1.default.deleteMany({});
    //register a user and save the token for authenticated requests
    yield (0, testUtils_1.registerTestUser)(app);
}));
afterAll((done) => {
    // Any cleanup needed after tests run
    console.log('Finished Comments API tests.');
    done();
});
describe('Comments API', () => {
    test("test get all empty DB ", () => __awaiter(void 0, void 0, void 0, function* () {
        // Your test code here
        console.log("test is running");
        const response = yield (0, supertest_1.default)(app).get('/comment');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    }));
    test("Create a comment", () => __awaiter(void 0, void 0, void 0, function* () {
        for (const comment of testUtils_1.commentsData) {
            const response = yield (0, supertest_1.default)(app)
                .post('/comment')
                .set('Authorization', `Bearer ${testUtils_1.userData.token}`)
                .send(comment);
            expect(response.statusCode).toBe(201);
            expect(response.body).toMatchObject({
                message: comment.message,
                MovieId: comment.MovieId,
                userId: comment.userId,
            });
        }
    }));
    test("test get all Comments after adding", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/comment');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(testUtils_1.commentsData.length);
    }));
    test("test get comment by MovieID", () => __awaiter(void 0, void 0, void 0, function* () {
        const comment = testUtils_1.commentsData[0];
        const response = yield (0, supertest_1.default)(app).get('/comment?MovieId=' + comment.MovieId);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].MovieId).toBe(comment.MovieId);
        testUtils_1.commentsData[0]._id = response.body[0]._id; // Save the ID for later tests
    }));
    test("test get comment by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/comment/' + testUtils_1.commentsData[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(testUtils_1.commentsData[0]._id);
    }));
    test("test get comment by invalid id format", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/comment/5469842345698745');
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid ID format");
    }));
    test("test put comment by id", () => __awaiter(void 0, void 0, void 0, function* () {
        testUtils_1.commentsData[0].message = "Updated comment";
        const response = yield (0, supertest_1.default)(app)
            .put('/comment/' + testUtils_1.commentsData[0]._id)
            .set('Authorization', `Bearer ${testUtils_1.userData.token}`)
            .send(testUtils_1.commentsData[0]);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(testUtils_1.commentsData[0].message);
        expect(response.body.MovieId).toBe(testUtils_1.commentsData[0].MovieId);
        expect(response.body.userId).toBe(testUtils_1.commentsData[0].userId);
    }));
    test("test delete a comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .delete('/comment/' + testUtils_1.commentsData[0]._id)
            .set('Authorization', `Bearer ${testUtils_1.userData.token}`);
        expect(response.statusCode).toBe(200);
        const getResponse = yield (0, supertest_1.default)(app).get('/comment/' + testUtils_1.commentsData[0]._id);
        expect(getResponse.statusCode).toBe(404);
    }));
    test("test missing DATABASE_URL env var", () => __awaiter(void 0, void 0, void 0, function* () {
        const originalDbUrl = process.env.DATABASE_URL;
        delete process.env.DATABASE_URL;
        try {
            yield (0, index_1.default)();
        }
        catch (err) {
            expect(err).toBe('DATABASE_URL is not defined in environment variables');
        }
        process.env.DATABASE_URL = originalDbUrl;
    }));
});
//# sourceMappingURL=comments.test.js.map