const express = require("express");

const productRouter = express.Router();

productRouter
  .route("/")
  .get(async (req, res) => {
    const allProducts = await prisma.receipt.findMany();
    res.json(allProducts);
  })
  .post(async (req, res) => {
    const { name, category, business, description, tokenValue, receipts } =
      req.body;
    const newProduct = await prisma.receipt.create({ data: req.body });
    res.json(newProduct);
  });

productRouter
  .route("/:id")
  .delete(async (req, res) => {
    const id = req.params.id;
    const deletedProduct = await prisma.receipt.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedProduct);
  })
  .put(async (req, res) => {
    const id = req.params.id;
    const updatedProduct = await prisma.receipt.delete({
      where: { id: parseInt(id) },
    });
    res.json(updatedProduct);
  });

module.exports = productRouter;
