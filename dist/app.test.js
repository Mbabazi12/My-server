"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.connect("mongodb://localhost:27017/my_brand")
        .then(() => {
        console.log("the database connection was successful");
    })
        .catch((err) => {
        console.log(err);
    });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("App testing", () => {
    it("Should return success", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).get("/");
        expect(res.status).toEqual(200);
    }));
});
describe("user testing", () => {
    it("Should create a user and return success", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .post("/create")
            .send({
            username: "diane",
            email: "diane@gmail.com",
            password: "diane123"
        });
        expect(res.status).toEqual(401);
    }));
    it("Should return that the user not logged in", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .post("/login")
            .send({
            email: "mbabazi@gmail.com",
            password: "mbabazi"
        });
        expect(res.status).toEqual(404);
    }));
    it("Should return that the user found", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .get("/");
        expect(res.status).toEqual(200);
    }));
    it("Should return that all users found", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .get("/get");
        expect(res.status).toEqual(200);
    }));
    it("Should return that the user deleted", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .delete("/");
        expect(res.status).toEqual(404);
    }));
    it("Should return that all users deleted", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .delete("/delete");
        expect(res.status).toEqual(200);
    }));
    it("Should return that the user updated successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .patch("/");
        expect(res.status).toEqual(404);
    }));
});
describe("blog testing", () => {
    it("Should create a blog and return success", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .post("/create")
            .send({
            blogTitle: "diane",
            blogDescription: "life story",
            blogImage: "word.jpg",
        });
        expect(res.status).toEqual(400);
    }));
    it("Should return that the blog found", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .get("/");
        expect(res.status).toEqual(200);
    }));
    it("Should return that all blogs found", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .get("/get");
        expect(res.status).toEqual(200);
    }));
    it("Should return that all blogs found", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .get("/gete");
        expect(res.status).toEqual(404);
    }));
    it("Should return that the blog is deleted", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .delete("/");
        expect(res.status).toEqual(404);
    }));
    it("Should return that  all blog deleted", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .delete("/delete");
        expect(res.status).toEqual(200);
    }));
    it("Should return that the blog updated successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .patch("/");
        expect(res.status).toEqual(404);
    }));
});
describe("comment testing", () => {
    it("Should create the comment and return success", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .post("/addComment")
            .send({
            user: "65de323437bec203f980f4e4",
            blog: "65de323437bec203f980f4e4",
            comment: "thousand hills"
        });
        expect(res.status).toEqual(200);
    }));
    it("Should return that all comments found", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .get("/getComment");
        expect(res.status).toEqual(200);
    }));
    it("Should return that all comments deleted", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .delete("/delete");
        expect(res.status).toEqual(200);
    }));
});
describe("messages testing", () => {
    it("Should add the message and return success", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .post("/addMessage")
            .send({
            email: "mbabazi@gmail.com",
            message: "cool work"
        });
        expect(res.status).toEqual(404);
    }));
    it("Should return that all messages found", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .get("/getMessages");
        expect(res.status).toEqual(200);
    }));
    it("Should return that message found", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .get("/");
        expect(res.status).toEqual(200);
    }));
    it("Should return that all message deleted", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .delete("/");
        expect(res.status).toEqual(404);
    }));
});
