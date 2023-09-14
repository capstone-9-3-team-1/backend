const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Post new tokenBalance to user
router.post("/", async (req, res) => {
  const newBalance = await prisma.userTokensBalance.create({ data: req.body });
  res.json(newBalance);
});

//get all tokenBalances
router.get("/", async (req, res) => {
  const allBalances = await prisma.userTokensBalance.findMany();
  res.json(allBalances);
});

// // get single user tokenBalance
// router.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   const oneBalance = await prisma.userTokensBalance.findUnique({
//     where: { id: id },
//   });
//   res.json(oneBalance);
// });

module.exports = router;
