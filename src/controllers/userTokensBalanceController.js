const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const newBalance = await prisma.userTokensBalance.create({ data: req.body });
  res.json(newBalance);
});

module.exports = router;
