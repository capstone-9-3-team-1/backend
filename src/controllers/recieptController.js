const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//get all receipts
router.get("/", async (req, res) => {
  const allReceipts = await prisma.receipt.findMany();
  res.json(allReceipts);
});

// get one receipt 
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const receipt = await prisma.receipt.findUnique(
    {
      where:{id:id}
    }
  );
  res.json(receipt);
});

// create new receipt
router.post("/", async (req, res) => {
  const newReceipt = await prisma.receipt.create({ data: req.body });
  res.json(newReceipt);
});

// delete receipt 
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedReceipt = await prisma.receipt.delete({
    where: { id: id },
  });
  res.json(deletedReceipt);
});


module.exports = router;
