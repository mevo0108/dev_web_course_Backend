import request from 'supertest';
import initApp from '../index'; // Adjust the path as necessary
import user from '../models/userModel';
import { Express } from 'express';

let app: Express;


beforeAll(async () => {
    app = await initApp();
    // Any setup needed before tests run

    await user.deleteMany({});
});

afterAll((done) => {
    // Any cleanup needed after tests run
    console.log('Finished Auth API tests.');
    done();
});

describe('Auth API', () => {
    // Relevant whene the register do a register and login actions
    test("test register a user", async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                email: "testuser@example.com",
                password: "testpassword"
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("token");
    });

    test("test login a user", async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: "testuser@example.com",
                password: "testpassword"
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("token");
    });

    test("test logout a user", async () => {
        const response = await request(app)
            .post('/auth/logout')
            .send({
                email: "testuser@example.com"
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message", "Logged out successfully");
    });

});