import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import setCookie from "set-cookie-parser";

const data_uri =
  "mongodb://db:27017/ownmusic?readPreference=primary&appname=Server&ssl=false";

describe('Test Login API functionalities', () => {
    beforeAll(() => {
        mongoose.connect(data_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
    })

    afterAll(async (done) => {
        mongoose.disconnect(done);
    })
    test("Success Login", done => {
        request(app).post("/api/auth/login").send({
            "password": "123456",
            "email": "lamnguyen@gmail.com"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .then(response => {
            const cookies = setCookie.parse(response, {
                map: true,
            })
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({
                "token": expect.any(String)
            }))
            expect(cookies.token).toEqual(expect.objectContaining({
                name: "token",
                value: expect.any(String),
                maxAge: 3600,
                httpOnly: true
            }))
            done();
        })
    })
    test("User Not Found", done => {
        request(app).post("/api/auth/login").send({
            "password": "123456",
            "email": "lamnguyen1000@gmail.com"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual(expect.objectContaining({
                message: "User is not found"
            }))
            done();
        })
    })
    test("Wrong Password", done => {
        request(app).post("/api/auth/login").send({
            "password": "1234567",
            "email": "lamnguyen@gmail.com"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual(expect.objectContaining({
                message: "Password is incorrect"
            }))
            done();
        })
    })
    test("Missing Email", done => {
        const expecting = ["Invalid email"];
        request(app).post("/api/auth/login").send({
            "password": "123456",
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual(expect.objectContaining({
                message: expect.arrayContaining(expecting)
            }))
            done();
        })
    })
    test("Missing Password", done => {
        const expecting = ["Invalid password"];
        request(app).post("/api/auth/login").send({
            "email": "testuser@gmail.com"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual(expect.objectContaining({
                message: expect.arrayContaining(expecting)
            }))
            done();
        })
    })
    test("Missing Password And Email", done => {
        const expecting = ["Invalid password", "Invalid email"];
        request(app).post("/api/auth/login").send({
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual(expect.objectContaining({
                message: expect.arrayContaining(expecting)
            }))
            done();
        })
    })
})
