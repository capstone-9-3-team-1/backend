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
  const updatedProductData = req.body;
  const updatedProduct = await prisma.product.update({
    where: {
      id: id,
    },
    data: updatedProductData,
  });
  res.json(updatedProduct);
});





// comment
module.exports = router;
