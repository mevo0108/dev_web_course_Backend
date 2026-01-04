const request = require('supertest');
const app = require('../index'); // Adjust the path as necessary

beforeAll(done => {
    // Any setup needed before tests run
    console.log('Starting Movies API tests...');

    done();
});

afterAll(done => {
    // Any cleanup needed after tests run
    console.log('Finished Movies API tests.');
    done();
});

describe('Movies API', () => {
    test("test 1 ", async () => {
        // Your test code here
        console.log("movies test 1");
        const stam = 5;
        expect(stam).toBe(5);
    });
});