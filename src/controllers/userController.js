const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get all users
router.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

// get one user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
  });
  res.json(user);
});

// add new user
router.post("/", async (req, res) => {
  const newUser = await prisma.user.create({ data: req.body });
  res.json(newUser);
});

//update user's username and balance
router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { username, balance } = req.body;
  const updatedUser = await prisma.user.update({
    where: {
      id: parseInt(userId),
    },
    data: {
      username: username,
      balance: balance,
    },
  });
  res.json(updatedUser);
});

// delete user (will delete all of his receipts as well)
router.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(userId) },
  });
  res.json(deletedUser);
});

module.exports = router;
