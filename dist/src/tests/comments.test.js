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
const moviesModel_1 = __importDefault(require("../models/moviesModel"));
let app;
const testData = [
    {
        messsage: "Great post!",
        movieId: "11111",
        userId: "22222",
        postedAt: new Date(Date.now()),
    },
    {
        messsage: "I totally agree with you.",
        movieId: "333333",
        userId: "444444",
        postedAt: new Date(Date.now()),
    },
    {
        messsage: "Thanks for sharing your thoughts.",
        movieId: "333333",
        userId: "444444",
        postedAt: new Date(Date.now()),
    }
];
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, index_1.default)();
    // Any setup needed before tests run
    yield moviesModel_1.default.deleteMany({});
}));
afterAll((done) => {
    // Any cleanup needed after tests run
    console.log('Finished Movies API tests.');
    done();
});
describe('Comments API', () => {
    test("test get all empty DB ", () => __awaiter(void 0, void 0, void 0, function* () {
        // Your test code here
        console.log("test is running");
        const response = yield (0, supertest_1.default)(app).get('/movie');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    }));
    test("Create a comment", () => __awaiter(void 0, void 0, void 0, function* () {
        for (const comment of testData) {
            const response = yield (0, supertest_1.default)(app)
                .post('/comment')
                .send(comment);
            expect(response.statusCode).toBe(201);
            expect(response.body).toMatchObject({
                messsage: comment.messsage,
                movieId: comment.movieId,
                userId: comment.userId,
                postedAt: comment.postedAt,
            });
        }
    }));
    test("test get all Comments after adding", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/comment');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(testData.length);
    }));
    test("test get comment by MovieID", () => __awaiter(void 0, void 0, void 0, function* () {
        const comment = testData[0];
        const response = yield (0, supertest_1.default)(app).get('/comment?movieId=' + comment.movieId);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].movieId).toBe(comment.movieId);
        testData[0]._id = response.body[0]._id; // Save the ID for later tests
    }));
    test("test get comment by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/comment/' + testData[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(testData[0]._id);
    }));
    test("test get comment by invalid id format", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/comment/5469842345698745');
        expect(response.statusCode).toBe(500);
        expect(response.body).toBe("error retrieving comment");
    }));
    test("test put comment by id", () => __awaiter(void 0, void 0, void 0, function* () {
        testData[0].messsage = "Updated comment";
        const response = yield (0, supertest_1.default)(app)
            .put('/comment/' + testData[0]._id)
            .send(testData[0]);
        expect(response.statusCode).toBe(200);
        expect(response.body.messsage).toBe(testData[0].messsage);
        expect(response.body.movieId).toBe(testData[0].movieId);
        expect(response.body.userId).toBe(testData[0].userId);
        expect(response.body._id).toBe(testData[0]._id);
    }));
    test("test delete a comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete('/comment/' + testData[0]._id);
        expect(response.statusCode).toBe(200);
        const getResponse = yield (0, supertest_1.default)(app).get('/comment/' + testData[0]._id);
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