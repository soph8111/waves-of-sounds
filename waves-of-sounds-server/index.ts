// // import express from "express";
// // import "dotenv/config";
// // import cors from "cors";
// // import init from "./startup/init";

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


import express from "express";
import "dotenv/config";
import cors from "cors";
import init from "./startup/init";

const app = express();

// PRODUKTIONSKLAR CORS
const allowedOrigins = [
  process.env.FRONTEND_URL, 
  "http://localhost:5173",
  "http://localhost:8081"
].filter(Boolean) as string[];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


app.use(express.json());

init(app);

app.get("/", (req, res) => {
  res.send("Root endpoint.");
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
