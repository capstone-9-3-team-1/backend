const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const newTokensIssued = await prisma.tokensIssued.create({ data: req.body });
  res.json(newTokensIssued);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedTokensIssued = await prisma.product.delete({
    where: { id: id },
  });
  res.json(deletedTokensIssued);
});

module.exports = router;
