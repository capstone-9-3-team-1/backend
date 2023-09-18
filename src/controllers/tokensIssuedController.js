const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// create tokensIssued
router.post("/", async (req, res) => {
  const newTokensIssued = await prisma.tokensIssued.create({ data: req.body });
  res.json(newTokensIssued);
});

// see all tokensIssued
router.get("/", async (req, res) => {
  const allTokensIssued = await prisma.tokensIssued.findMany();
  res.json(allTokensIssued);
});

// see one tokensIssued
router.get("/:tokensIssuedId", async (req, res) => {
  const id = req.params.tokensIssuedId;
  const oneTokensIssued = await prisma.tokensIssued.findUnique({
    where: {id: id },
  });
  res.json(oneTokensIssued);
});

//update tokensIssued
router.put("/:tokensIssuedId", async (req, res) => {
  const id = req.params.tokensIssuedId;
  const updatedTokensIssuedData = req.body;
  const updatedTokensIssued = await prisma.tokensIssued.update({
    where: {
      id: id,
    },
    data: updatedTokensIssuedData,
  });
  res.json(updatedTokensIssued);
});

// delete tokensIssued
router.delete("/:tokensIssuedId", async (req, res) => {
  const id = req.params.tokensIssuedId;
  const deletedTokensIssued = await prisma.tokensIssued.delete({
    where: { id: id },
  });
  res.json(deletedTokensIssued);
});





// comment
module.exports = router;
