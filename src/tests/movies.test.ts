import request from 'supertest';
import initApp from '../index'; // Adjust the path as necessary
import movies from '../models/moviesModel';
import { Express } from 'express';


let app: Express;

type MovieTestData = { title: string; year: number; _id?: string; };

const testData: MovieTestData[] = [
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
]


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

        for (const movie of testData) {
            const response = await request(app)
                .post('/movie')
                .send(movie);
            expect(response.statusCode).toBe(201);
            expect(response.body).toMatchObject(movie);
        }


    });

    test("test get all movies after adding", async () => {

        const response = await request(app).get('/movie');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(testData.length);
    });

    test("test get movie by filter", async () => {
        const movie = testData[0];
        const response = await request(app).get(
            '/movie?year=' + movie.year
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].year).toBe(movie.year);
        testData[0]._id = response.body[0]._id; // Save the ID for later tests


    });

    test("test get movie by id", async () => {
        const response = await request(app).get('/movie/' + testData[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(testData[0]._id);
    });

    test("test get movie by invalid id format", async () => {
        const response = await request(app).get('/movie/5469842345698745');
        expect(response.statusCode).toBe(500);
        expect(response.body).toBe("error retrieving data");
    });

    test("test put movie by id", async () => {
        testData[0].year = 2010;
        testData[0].title = "Inception Updated";
        const response = await request(app)
            .put('/movie/' + testData[0]._id)
            .send(testData[0]);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(testData[0].title);
        expect(response.body.year).toBe(testData[0].year);
        expect(response.body._id).toBe(testData[0]._id);
    });



    test("test delete a movie", async () => {
        const response = await request(app).delete('/movie/' + testData[0]._id);
        expect(response.statusCode).toBe(200);

        const getResponse = await request(app).get('/movie/' + testData[0]._id);
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