"use strict";
// // import express from "express";
// // import "dotenv/config";
// // import cors from "cors";
// // import init from "./startup/init";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // const app = express();
// // app.use(cors());
// // app.use(express.json());
// // init(app);
// // app.get("/", (req, res) => {
// //     res.send("Root endpoint.");
// // });
// // // ------ LOCAL ---------
// // // app.listen(4001, () => {
// // //     console.log("Server is running on port 4001");
// // // });
// // // ------ RENDER ----------
// // const PORT = process.env.PORT || 4001;
// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });
// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import init from "./startup/init";
// const app = express();
// // CORS: i produktion begræns til FRONTEND_URL
// const corsOrigin = process.env.FRONTEND_URL || "*";
// app.use(cors({ origin: corsOrigin }));
// app.use(express.json());
// init(app);
// app.get("/", (req, res) => {
//   res.send("Root endpoint.");
// });
// const PORT = process.env.PORT || 4001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const init_1 = __importDefault(require("./startup/init"));
const app = (0, express_1.default)();
// PRODUKTIONSKLAR CORS
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"]
    .filter(Boolean); // <--- fjern undefined og cast til string[]
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true
}));
app.use(express_1.default.json());
(0, init_1.default)(app);
app.get("/", (req, res) => {
    res.send("Root endpoint.");
});
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
