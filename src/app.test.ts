import app from "./server";
import request from "supertest";
import mongoose from "mongoose";

beforeAll(async () => {
    mongoose
      .connect(
        "mongodb://localhost:27017/my_brand"
      )
      .then(() => {
        console.log("the database connection was successful");
      });
});

describe("App testing", () =>{
    it("Should return success", async () => {
        const res = await request(app).get("/");
        expect(res.status).toEqual(200);
    });
});

// describe("blog testing", () =>{
//     it("Should return the blog is found", async () => {
//         const res = await request(app).get("/blog");
//         expect(res.status).toEqual(200);
//     });
// });

// describe("user testing", () =>{
// it("Should return that the user created successfully", async () => {
//        const res = await request(app).post("/user/");
//        expect(res.status).toEqual(200);
            
//      });
//    });

//    describe("login testing", () =>{
//     it("Should return that the user successfully logged in", async () => {
//            const res = await request(app).post("/user/login");
//            expect(res.status).toEqual(200);
                
//          });
//        });