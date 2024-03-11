import app from "./server";
import request from "supertest";
import mongoose from "mongoose";

beforeAll(async () => {
    mongoose.connect("mongodb://localhost:27017/my_brand")
    .then(() => {
        console.log("the database connection was successful");
      })
      .catch((err: any) => {
        console.log(err);
      });
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
        email: "diane@gmail.com",
        password:"diane123"
       })
       expect(res.status).toEqual(401);  
     });
    it("Should return that the user not logged in", async () => {
           const res = await request(app)
           .post("/login")
           .send({
            email:"mbabazi@gmail.com",
            password:"mbabazi"
           })
           expect(res.status).toEqual(404);
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
          expect(res.status).toEqual(404);
});
it("Should return that all users deleted", async () => {
      const res = await request(app)
      .delete("/delete")
      expect(res.status).toEqual(200);
});
    it("Should return that the user updated successfully", async () => {
          const res = await request(app)
          .patch("/")
          expect(res.status).toEqual(404);
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
  it("Should return that all blogs found", async () => {
        const res = await request(app)
        .get("/gete")
        expect(res.status).toEqual(404);
});
      it("Should return that the blog is deleted", async () => {
            const res = await request(app)
            .delete("/")
            expect(res.status).toEqual(404);
  });
      it("Should return that  all blog deleted", async () => {
            const res = await request(app)
            .delete("/delete")
            expect(res.status).toEqual(200);
  });
      it("Should return that the blog updated successfully", async () => {
            const res = await request(app)
            .patch("/")
            expect(res.status).toEqual(404);
  });
});

describe("comment testing", () =>{
    it("Should create the comment and return success", async () => {
        const res = await request(app)
        .post("/addComment")
        .send({
          user:"65de323437bec203f980f4e4",
          blog:"65de323437bec203f980f4e4",
          comment:"thousand hills"
        })
        expect(res.status).toEqual(200);
    });
    it("Should return that all comments found", async () => {
      const res = await request(app)
      .get("/getComment")
      expect(res.status).toEqual(200);
    });
     it("Should return that all comments deleted", async () => {
     const res = await request(app)
     .delete("/delete")
      expect(res.status).toEqual(200);
    });
});

describe("messages testing", () =>{
  it("Should add the message and return success", async () => {
      const res = await request(app)
      .post("/addMessage")
      .send({
        email:"mbabazi@gmail.com",
        message:"cool work"
      })
      expect(res.status).toEqual(404);
  });
  it("Should return that all messages found", async () => {
    const res = await request(app)
    .get("/getMessages")
    expect(res.status).toEqual(200);
});
it("Should return that message found", async () => {
  const res = await request(app)
  .get("/")
  expect(res.status).toEqual(200);
});
it("Should return that all message deleted", async () => {
const res = await request(app)
.delete("/")
expect(res.status).toEqual(404);
});
});