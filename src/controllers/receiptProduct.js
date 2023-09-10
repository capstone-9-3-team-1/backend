const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get all receipts with all its products 
router.get("/", async (req, res) => {
  const allReceiptsAndItsProducts = await prisma.receiptProduct.findMany();
  res.json(allReceiptsAndItsProducts);
});

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

  


module.exports = router;
