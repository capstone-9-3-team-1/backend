const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//search products
router.get("/products/:key", async (req, res) => {
  const key = req.params.key;
  const allProducts = await prisma.product.findMany();
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(key.toLowerCase())
  );
  res.json(filteredProducts);
});

//search rewards
router.get("/rewards/:key", async (req, res) => {
  const key = req.params.key;
  const allRewards = await prisma.reward.findMany();
  const filteredRewards = allRewards.filter((reward) =>
    reward.rewardName.toLowerCase().includes(key.toLowerCase())
  );
  res.json(filteredRewards);
});

module.exports = router;
