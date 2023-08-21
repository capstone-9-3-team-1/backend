const express = require("express");
const cors = require("cors");
const prisma = require("@prisma/client");
const prismaClient = new prisma.PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json("Welcome! Resources can be found at the /names endpoint");
});

app.get("*", (req, res) => {
  res
    .status(404)
    .json("Could not find resource, please check spelling and try again");
});

module.exports = app;
