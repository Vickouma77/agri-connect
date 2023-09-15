const request = require('request');
const { describe, it } = require('mocha');
const { expect } = require('chai');
const app = require('../server');
const db = require('../models/init');
const User = db.user;
const Role = db.role;

describe('Server', () => {
    let server;
    let testUser = {
        username: 'testuser',
        email: 'user@gmail.com',
        password: 'testpassword',
    };

    // ... Other test variables ..

    before((done) => {
        server = app.listen(5000, done);
    });

    after((done) => {
        server.close(done);
    });

    beforeEach(async () => {
        await User.deleteMany({});
        await Role.deleteMany({});
        await new Role({
            name: 'user',
        }).save();
        await new Role({
            name: 'moderator',
        }).save();
        await new Role({
            name: 'admin',
        }).save();
    });

    describe('POST /signup', () => {
        // ... Other test cases ...

        it('Should signup a new user', (done) => {
            request.post(
                'http://localhost:5000/signup',
                {
                    json: {
                        username: 'newuser',
                        email: 'testUser.email', // email field
                        password: 'newpassword',
                    },
                },
                (error, response, body) => {
                    expect(response.statusCode).to.equal(200);
                    expect(body.message).to.equal('User was registered successfully!'); // success message
                    done();
                }
            )
        });

        it('Should not signup a new user with an empty username', (done) => {
            request.post(
                'http://localhost:5000/signup',
                {
                    json: {
                        username: '',
                        email: 'testUser.email', // email field
                        password: 'newpassword',
                    },
                },
                (error, response, body) => {
                    expect(response.statusCode).to.equal(400);
                    expect(body.message).to.equal('Username is required!'); // error message
                    done();
                }
            );
        })

        it('Should not signup a new user with an empty email', (done) => {
            request.post(
                'http://localhost:5000/signup',
                {
                    json: {
                        username: 'newuser',
                        email: '', // email field
                        password: 'newpassword',
                    },
                },
                (error, response, body) => {
                    expect(response.statusCode).to.equal(400);
                    expect(body.message).to.equal('Email is required!'); // error message
                    done();
                }
            );
        })

        it('Should not signup a new user with an empty password', (done) => {
            request.post(
                'http://localhost:5000/signup',
                {
                    json: {
                        username: 'newuser',
                        email: 'testUser.email', // email field
                        password: '',
                    },
                },
                (error, response, body) => {
                    expect(response.statusCode).to.equal(400);
                    expect(body.message).to.equal('Password is required!'); // error message
                    done();
                }
            );
        });

        it('Should not signup a new user with an invalid email', (done) => {
            request.post(
                'http://localhost:5000/signup',
                {
                    json: {
                        username: 'newuser',
                        email: 'testUser.email', // email field
                        password: 'newpassword',
                    },
                },
                (error, response, body) => {
                    expect(response.statusCode).to.equal(400);
                    expect(body.message).to.equal('Invalid Email!'); // error message
                    done();
                }
            );
        })

        it('Should not signup a new user with a password less than 6 characters', (done) => {
            request.post(
                'http://localhost:5000/signup',
                {
                    json: {
                        username: 'newuser',
                        email: 'testUser.email', // email field
                        password: '12345',
                    },
                },
                (error, response, body) => {
                    expect(response.statusCode).to.equal(400);
                    expect(body.message).to.equal('Password must be at least 6 characters!'); //error message
                    done();
                }
            );
        });
    });
});
