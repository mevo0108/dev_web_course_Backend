import request from 'supertest';
import initApp from '../index'; // Adjust the path as necessary
import comments from '../models/commentsModel';
import { Express } from 'express';

let app: Express;

type CommentData = {
    message: string;
    MovieId: string;
    userId: string;
    _id?: string;
}

const testData: CommentData[] = [
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



beforeAll(async () => {
    app = await initApp();
    // Any setup needed before tests run

    await comments.deleteMany({});
});

afterAll((done) => {
    // Any cleanup needed after tests run
    console.log('Finished Movies API tests.');
    done();
});

describe('Comments API', () => {
    test("test get all empty DB ", async () => {
        // Your test code here
        console.log("test is running");
        const response = await request(app).get('/comment');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);

    });

    test("Create a comment", async () => {
        for (const comment of testData) {
            const response = await request(app)
                .post('/comment')
                .send(comment);
            expect(response.statusCode).toBe(201);
            expect(response.body).toMatchObject({
                message: comment.message,
                MovieId: comment.MovieId,
                userId: comment.userId,
            });
        }

    });

    test("test get all Comments after adding", async () => {

        const response = await request(app).get('/comment');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(testData.length);
    });

    test("test get comment by MovieID", async () => {
        const comment = testData[0];
        const response = await request(app).get(
            '/comment?MovieId=' + comment.MovieId
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].MovieId).toBe(comment.MovieId);
        testData[0]._id = response.body[0]._id; // Save the ID for later tests


    });

    test("test get comment by id", async () => {
        const response = await request(app).get('/comment/' + testData[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(testData[0]._id);
    });

    test("test get comment by invalid id format", async () => {
        const response = await request(app).get('/comment/5469842345698745');
        expect(response.statusCode).toBe(500);
        expect(response.body).toBe("error retrieving data");
    });

    test("test put comment by id", async () => {
        testData[0].message = "Updated comment";
        const response = await request(app)
            .put('/comment/' + testData[0]._id)
            .send(testData[0]);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(testData[0].message);
        expect(response.body.MovieId).toBe(testData[0].MovieId);
        expect(response.body.userId).toBe(testData[0].userId);

    });



    test("test delete a comment", async () => {
        const response = await request(app).delete('/comment/' + testData[0]._id);
        expect(response.statusCode).toBe(200);

        const getResponse = await request(app).get('/comment/' + testData[0]._id);
        expect(getResponse.statusCode).toBe(404);
    });



    test("test missing DATABASE_URL env var", async () => {
        const originalDbUrl = process.env.DATABASE_URL;
        delete process.env.DATABASE_URL;

        try {
            await initApp();
        } catch (err) {
            expect(err).toBe('DATABASE_URL is not defined in environment variables');
        }

        process.env.DATABASE_URL = originalDbUrl;
    });


});