import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import userModel from "../models/users";
import { hashPassword } from "../utils/password";
import setCookie from "set-cookie-parser";
import passport from "passport";

let savedCookies;

describe('Test User related API', () => {
    beforeAll(async () => {
        require("../utils/passport")(passport);
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        await userModel.create({
            "name": "Test User",
            "password": await hashPassword("123456"),
            "email": "testUser0@gmail.com",
        });
    });

    afterAll(async (done) => {
        await userModel.deleteOne({email: "testUser0@gmail.com"}, (err) => {
            if(err){
                console.log(err);
            }
        });
        mongoose.disconnect(done);
    });

    it('Login With Agent', async (done) => {
        request(app).post("/api/auth/login").send({
            "password": "123456",
            "email": "testUser0@gmail.com"
        })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .then(response => {
                const cookies = setCookie.parse(response, {
                    map: true,
                });
                expect(response.statusCode).toBe(200);
                expect(response.body).toEqual(expect.objectContaining({
                    "token": expect.any(String)
                }));
                expect(cookies.token).toEqual(expect.objectContaining({
                    name: "token",
                    value: expect.any(String),
                    httpOnly: true
                }));
                savedCookies = response.headers['set-cookie'];
                done();
            });
    });
    
    it('Get User Info', async (done) => {
        request(app).get("/api/user")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set('Cookie', savedCookies)
            .then(response => {
                expect(response.body).toStrictEqual({message: "ok"});
                done();
            });
    });
});
