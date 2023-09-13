const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const newTokensIssued = await prisma.tokensIssued.create({ data: req.body });
  res.json(newTokensIssued);
});

// comment
module.exports = router;
