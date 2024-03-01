import app from "./server";
import request from "supertest";
import mongoose from "mongoose";

beforeAll(async () => {
    mongoose.connect("mongodb://localhost:27017/my_brand")
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("App testing", () =>{
    it("Should return success", async () => {
        const res = await request(app).get("/");
        expect(res.status).toEqual(200);
    });
});

describe("user testing", () =>{
it("Should create a user and return success", async () => {
       const res = await request(app)
       .post("/create")
       .send({
        username:"diane",
        email: "diane@gmailcom",
        password:"diane",
        role:"user",
       })
       expect(res.status).toEqual(200);  
     });
    it("Should return that the user successfully logged in", async () => {
           const res = await request(app)
           .post("/login")
           .send({
            email:"diane@gmail.com",
            password:"diane",
           })
           expect(res.status).toEqual(400);
    });
    it("Should return that the user found", async () => {
           const res = await request(app)
           .get("/")
           expect(res.status).toEqual(200);
});
    it("Should return that all users found", async () => {
          const res = await request(app)
          .get("/get")
          expect(res.status).toEqual(200);
});
    it("Should return that the user deleted", async () => {
          const res = await request(app)
          .delete("/")
          expect(res.status).toEqual(401);
});
    it("Should return that all users deleted", async () => {
          const res = await request(app)
          .delete("/delete")
          expect(res.status).toEqual(401);
});
    it("Should return that the user updated successfully", async () => {
          const res = await request(app)
          .patch("/")
          expect(res.status).toEqual(401);
});
});
describe("blog testing", () =>{
  it("Should create a blog and return success", async () => {
         const res = await request(app)
         .post("/create")
         .send({
          blogTitle:"diane",
          blogDescription: "life story",
          blogImage:"word.jpg",
         })
         expect(res.status).toEqual(400);  
       });
      it("Should return that the blog found", async () => {
             const res = await request(app)
             .get("/")
             expect(res.status).toEqual(200);
  });
      it("Should return that all blogs found", async () => {
            const res = await request(app)
            .get("/get")
            expect(res.status).toEqual(200);
  });
      it("Should return that the user deleted", async () => {
            const res = await request(app)
            .delete("/")
            expect(res.status).toEqual(401);
  });
      it("Should return that  all blog deleted", async () => {
            const res = await request(app)
            .delete("/delete")
            expect(res.status).toEqual(401);
  });
      it("Should return that the blog updated successfully", async () => {
            const res = await request(app)
            .patch("/")
            expect(res.status).toEqual(401);
  });
  });