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
describe('Movies API', () => {
    test("test get all empty DB ", () => __awaiter(void 0, void 0, void 0, function* () {
        // Your test code here
        console.log("test is running");
        const response = yield (0, supertest_1.default)(app).get('/movie');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    }));
    test("test add a movie", () => __awaiter(void 0, void 0, void 0, function* () {
        //add all test data
        for (const movie of testData) {
            const response = yield (0, supertest_1.default)(app)
                .post('/movie')
                .send(movie);
            expect(response.statusCode).toBe(201);
            expect(response.body).toMatchObject(movie);
        }
    }));
    test("test get all movies after adding", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/movie');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(testData.length);
    }));
    test("test get movie by filter", () => __awaiter(void 0, void 0, void 0, function* () {
        const movie = testData[0];
        const response = yield (0, supertest_1.default)(app).get('/movie?year=' + movie.year);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].year).toBe(movie.year);
        testData[0]._id = response.body[0]._id; // Save the ID for later tests
    }));
    test("test get movie by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/movie/' + testData[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(testData[0]._id);
    }));
    test("test get movie by invalid id format", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/movie/5469842345698745');
        expect(response.statusCode).toBe(500);
        expect(response.body).toBe("error retrieving movie");
    }));
    test("test put movie by id", () => __awaiter(void 0, void 0, void 0, function* () {
        testData[0].year = 2010;
        testData[0].title = "Inception Updated";
        const response = yield (0, supertest_1.default)(app)
            .put('/movie/' + testData[0]._id)
            .send(testData[0]);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(testData[0].title);
        expect(response.body.year).toBe(testData[0].year);
        expect(response.body._id).toBe(testData[0]._id);
    }));
    test("test delete a movie", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete('/movie/' + testData[0]._id);
        expect(response.statusCode).toBe(200);
        const getResponse = yield (0, supertest_1.default)(app).get('/movie/' + testData[0]._id);
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
//# sourceMappingURL=movies.test.js.map