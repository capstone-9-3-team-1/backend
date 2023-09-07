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

//for Users
app.get("/users", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

app.post("/users", async (req, res) => {
  const newUser = await prisma.user.create({ data: req.body });
  res.json(newUser);
});

app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  const newName = req.body.name;
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { name: newName },
  });
  res.json(updatedUser);
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedUser);
});

//for Receipts
app.get("/receipts", async (req, res) => {
  const allReceipts = await prisma.receipt.findMany();
  res.json(allReceipts);
});

app.post("/receipts", async (req, res) => {
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
