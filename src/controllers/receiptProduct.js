const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// add product to a receipt 
router.post('/', async (req, res) => {
    const { productId, receiptId, quantity } = req.body;
    try {
      await prisma.receiptProduct.create({
        data: {
          productId: productId,
          receiptId: receiptId,
          quantity: quantity,
        },
      }); 
      res.status(201).json({ message: 'Product added to receipt successfully.' });
    } catch (error) {
      console.error('Error adding product to receipt:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await prisma.$disconnect();
    }
  });

  // get all receipts with all products within them 
router.get("/", async (req, res) => {
  const allReceiptsAndItsProducts = await prisma.receiptProduct.findMany();
  res.json(allReceiptsAndItsProducts);
});

  // delete receiptProduct composite 
router.delete("/:receiptId/:productId", async (req, res) => {
  const receiptId = req.params.receiptId;
  const productId = req.params.productId;
  const deletedReceiptProduct = await prisma.receiptProduct.delete({
    where: {
      receiptId_productId: {
        receiptId: receiptId,
        productId: productId,
      },
    },
  });
  res.json(deletedReceiptProduct);
});

  


module.exports = router;
