import request from 'supertest';
import initApp from '../index'; // Adjust the path as necessary
import movies from '../models/moviesModel';
import { Express } from 'express';

let app: Express;

type CommentData = {
    messsage: string;
    movieId: string;
    userId: string;
    postedAt: Date;
    _id?: string;
}

const testData: CommentData[] = [
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



beforeAll(async () => {
    app = await initApp();
    // Any setup needed before tests run

    await movies.deleteMany({});
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
        const response = await request(app).get('/movie');
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
                messsage: comment.messsage,
                movieId: comment.movieId,
                userId: comment.userId,
                postedAt: comment.postedAt,
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
            '/comment?movieId=' + comment.movieId
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].movieId).toBe(comment.movieId);
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
        expect(response.body).toBe("error retrieving comment");
    });

    test("test put comment by id", async () => {
        testData[0].messsage = "Updated comment";
        const response = await request(app)
            .put('/comment/' + testData[0]._id)
            .send(testData[0]);
        expect(response.statusCode).toBe(200);
        expect(response.body.messsage).toBe(testData[0].messsage);
        expect(response.body.movieId).toBe(testData[0].movieId);
        expect(response.body.userId).toBe(testData[0].userId);
        expect(response.body._id).toBe(testData[0]._id);
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