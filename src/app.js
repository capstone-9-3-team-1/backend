import express from "express";
import cors from "cors";
import bookRouter from "./controllers/bookController";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json("Welcome! Resources can be found at the /books endpoint");
});

app.use("/books", bookRouter);

app.get("*", (req, res) => {
  res
    .status(404)
    .json("Could not find resource, please check spelling and try again");
});

export default app;
