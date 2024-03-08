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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Index_1 = __importDefault(require("./routes/Index"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./documentation/swagger_output.json"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
const port = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use('/API/v1', Index_1.default);
// dbConnect();
function server() {
    return __awaiter(this, void 0, void 0, function* () {
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
        mongoose_1.default.set('strictQuery', true);
        //    mongoose.connect("mongodb+srv://mbabazi069:mbabazi@cluster0.wnkbwfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        mongoose_1.default.connect("mongodb://localhost:27017/")
            .then(() => {
            console.log('connected to the database');
        }).catch((err) => {
            console.log('error', err);
        });
    });
}
;
server();
