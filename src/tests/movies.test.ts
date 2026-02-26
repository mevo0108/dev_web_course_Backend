import request from 'supertest';
import initApp from '../index'; // Adjust the path as necessary
import Movies from '../models/moviesModel';
import { Express } from 'express';
import User from '../models/userModel';
import { userData, moviesData, registerTestUser } from './testUtils';

let app: Express;


beforeAll(async () => {
    app = await initApp();
    // Any setup needed before tests run
    await Movies.deleteMany({});
    await registerTestUser(app);

});

afterAll((done) => {
    // Any cleanup needed after tests run
    console.log('Finished Movies API tests.');
    done();
});

describe('Movies API', () => {
    test("test get all empty DB ", async () => {
        // Your test code here
        console.log("test is running");
        const response = await request(app).get('/movie');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);

    });

    test("test add a movie", async () => {
        //add all test data

        for (const movie of moviesData) {
            const response = await request(app)
                .post('/movie')
                .set('Authorization', `Bearer ${userData.token}`)
                .send(movie);
            expect(response.statusCode).toBe(201);
            expect(response.body).toMatchObject(movie);
        }


    });

    test("test get all movies after adding", async () => {

        const response = await request(app).get('/movie');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(moviesData.length);
    });

    test("test get movie by filter", async () => {
        const movie = moviesData[0];
        const response = await request(app).get(
            '/movie?year=' + movie.year
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].year).toBe(movie.year);
        moviesData[0]._id = response.body[0]._id; // Save the ID for later tests


    });

    test("test get movie by id", async () => {
        const response = await request(app).get('/movie/' + moviesData[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(moviesData[0]._id);
    });

    test("test get movie by invalid id format", async () => {
        const response = await request(app).get('/movie/5469842345698745');
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid ID format");
    });

    test("test put movie by id", async () => {
        moviesData[0].year = 2010;
        moviesData[0].title = "Inception Updated";
        const response = await request(app)
            .put('/movie/' + moviesData[0]._id)
            .set('Authorization', `Bearer ${userData.token}`)
            .send(moviesData[0]);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(moviesData[0].title);
        expect(response.body.year).toBe(moviesData[0].year);
        expect(response.body._id).toBe(moviesData[0]._id);
    });



    test("test delete a movie", async () => {
        const response = await request(app)
            .delete('/movie/' + moviesData[0]._id)
            .set('Authorization', `Bearer ${userData.token}`);
        expect(response.statusCode).toBe(200);

        const getResponse = await request(app).get('/movie/' + moviesData[0]._id);
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