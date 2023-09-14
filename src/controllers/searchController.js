const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/:key", async (req, res) => {
  const key = req.params.key;
  const allProducts = await prisma.product.findMany();
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(key.toLowerCase())
  );
  res.json(filteredProducts);
});

module.exports = router;
