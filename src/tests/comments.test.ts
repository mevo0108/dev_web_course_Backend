import request from 'supertest';
import initApp from '../index'; // Adjust the path as necessary
import comments from '../models/commentsModel';
import { Express } from 'express';
import User from '../models/userModel';
import { userData, moviesData, commentsData, registerTestUser } from './testUtils';


let app: Express;



beforeAll(async () => {
    app = await initApp();
    // Any setup needed before tests run

    await comments.deleteMany({});
    await User.deleteMany({});
    //register a user and save the token for authenticated requests
    await registerTestUser(app);
});

afterAll((done) => {
    // Any cleanup needed after tests run
    console.log('Finished Comments API tests.');
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
        for (const comment of commentsData) {
            const response = await request(app)
                .post('/comment')
                .set('Authorization', `Bearer ${userData.token}`)
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
        expect(response.body.length).toBe(commentsData.length);
    });

    test("test get comment by MovieID", async () => {
        const comment = commentsData[0];
        const response = await request(app).get(
            '/comment?MovieId=' + comment.MovieId
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].MovieId).toBe(comment.MovieId);
        commentsData[0]._id = response.body[0]._id; // Save the ID for later tests


    });

    test("test get comment by id", async () => {
        const response = await request(app).get('/comment/' + commentsData[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(commentsData[0]._id);
    });

    test("test get comment by invalid id format", async () => {
        const response = await request(app).get('/comment/5469842345698745');
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid ID format");
    });

    test("test put comment by id", async () => {
        commentsData[0].message = "Updated comment";
        const response = await request(app)
            .put('/comment/' + commentsData[0]._id)
            .set('Authorization', `Bearer ${userData.token}`)
            .send(commentsData[0]);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(commentsData[0].message);
        expect(response.body.MovieId).toBe(commentsData[0].MovieId);
        expect(response.body.userId).toBe(commentsData[0].userId);

    });



    test("test delete a comment", async () => {
        const response = await request(app)
            .delete('/comment/' + commentsData[0]._id)
            .set('Authorization', `Bearer ${userData.token}`);
        expect(response.statusCode).toBe(200);

        const getResponse = await request(app).get('/comment/' + commentsData[0]._id);
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