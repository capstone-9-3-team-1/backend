const express = require("express");
const router = express.Router();
const { ClerkExpressWithAuth } = require("@clerk/clerk-sdk-node");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const mindee = require("mindee");
const mindeeClient = new mindee.Client({
  apiKey: process.env.MINDEE_API_KEY,
});

//get all products in one receipt
router.get("/:id/products", async (req, res) => {
  const id = req.params.id;
  const receipt = await prisma.receipt.findUnique({
    where: {
      id: id,
    },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });
  if (!receipt) {
    return res.status(404).json({ error: "Receipt not found" });
  }
  const productsInReceipt = receipt.products.map((rp) => rp.product);
  res.json(productsInReceipt);
});

//get all receipts
router.get("/", async (req, res) => {
  const allReceipts = await prisma.receipt.findMany();
  res.json(allReceipts);
});

// get one receipt
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const receipt = await prisma.receipt.findUnique({
    where: { id: id },
  });
  res.json(receipt);
});

// create new receipt
router.post("/", async (req, res) => {
  const { photo } = req.body;

  if (!photo) {
    res.json({ message: "Request needs photo" });
  }
  try {
    const inputSource = mindeeClient.docFromBase64(photo, "new-recipt");
    const result = await mindeeClient.parse(
      mindee.product.ReceiptV5,
      inputSource
    );
    console.log(result.document.inference.prediction.date.value);
    // for (const lineItemsElem of result.document.inference.prediction
    //   .lineItems) {
    //   console.log(lineItemsElem.value);
    // }
    res.json(result.document.toString());
  } catch (error) {
    res.json(error);
  }

  // const newReceipt = await prisma.receipt.create({ data: req.body });
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
