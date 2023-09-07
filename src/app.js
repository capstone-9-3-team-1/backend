const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json("Welcome! Resources can be found at the /names endpoint");
});

//for Receipts
app
  .route("/receipts")
  .get(async (req, res) => {
    const allReceipts = await prisma.receipt.findMany();
    res.json(allReceipts);
  })
  .post(async (req, res) => {
    const newReceipt = await prisma.receipt.create({ data: req.body });
    res.json(newReceipt);
  });

app.delete("/receipts/:id", async (req, res) => {
  const id = req.params.id;
  const deletedReceipt = await prisma.receipt.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedReceipt);
});

app.get("*", (req, res) => {
  res
    .status(404)
    .json("Could not find resource, please check spelling and try again");
});

module.exports = app;
