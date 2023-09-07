const express = require("express");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const receiptRouter = express.Router();

receiptRouter
  .route("/")
  .get(async (req, res) => {
    const allReceipts = await prisma.receipt.findMany({
      include: {
        products: true,
      },
    });
    res.json(allReceipts);
  })
  .post(async (req, res) => {
    const { userId } = req.body;
    const newReceipt = await prisma.receipt.create({ data: { userId } });
    res.json(newReceipt);
  });

receiptRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedReceipt = await prisma.receipt.delete({
    where: { id: id },
  });
  res.json(deletedReceipt);
});

module.exports = receiptRouter;
