import request from 'supertest';
import initApp from '../index'; // Adjust the path as necessary
import user from '../models/userModel';
import { Express } from 'express';
import Movie from '../models/moviesModel';

let app: Express;


type MovieTestData = {
    title: string;
    year: number;
    _id?: string;
};


beforeAll(async () => {
    app = await initApp();
    // Any setup needed before tests run

    await user.deleteMany({});
    await Movie.deleteMany({});
});

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

const movie: MovieTestData = {
    title: "test movie title",
    year: 2024,
};

describe('Auth API', () => {
    // Relevant whene the register do a register and login actions

    /* test("access restricted url denied with no token", async () => {
         const response = await request(app)
             .post('/movie')
             .send({ movieData });
         expect(response.statusCode).toBe(401);
     });
 */

    test("test register a user", async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                email: userData.email,
                password: userData.password
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("token");
        userData._id = response.body._id;
        userData.token = response.body.token;
    });

    test("test access with token permitted", async () => {
        const response = await request(app)
            .post('/movie')
            .set("Authorization", "Bearer " + userData.token)
            .send(movie);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("_id");
        movie._id = response.body._id;
    });

    test("test login a user", async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: userData.email,
                password: userData.password
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("token");
    });


});