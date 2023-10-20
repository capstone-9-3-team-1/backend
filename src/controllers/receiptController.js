const express = require("express");
const router = express.Router();
const axios = require("axios");
const mindee = require("mindee");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const mindeeKey = process.env.MINDEE_API_KEY;

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
  const receiptOcrEndpoint =
    "https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict";
  
  //     const mindeeClient = new mindee.Client({apiKey:"" });
  //     const inputSource = mindeeClient.docFromBase64(req.body.photo, "receiptFile.jpg");
  // console.log(inputSource)
  //     const apiResponse = await mindeeClient.parse(
  //       mindee.product.ReceiptV5,
  //       inputSource
  //     );
  //     console.log(apiResponse.document.toString())

  const receiptResult = await axios.post(
    receiptOcrEndpoint,
    {
      document: req.body.photo,
    },
    { headers: { Authorization: `Token ${mindeeKey}`} }
  );
  
  // if (receiptResult.data.error) {
  //   console.log(receiptResult.data.error);
  // } else {
  //   console.log(receiptResult.data.document);
  // }

  let productsOnReceipt;
  try {
    productsOnReceipt =
      receiptResult.data.document.inference.pages[0].prediction.line_items.map(
        (item) => ({
          name: item.description,
          quantity: item.quantity,
          // 
        })
      );
      console.log(productsOnReceipt)
  } catch (e) {
    console.error(e);
    res.status(400).send("Could not parse receipt");
  }
 
  const productsFromDB = await prisma.product.findMany({
    where: {
      name: { in: productsOnReceipt.map((product) => product.name) },
    },
  });

  const productUserLinks = productsFromDB.map((product) => ({
    productId: product.id,
    quantity: 1,
  }));
  const newReceipt = await prisma.receipt.create({
    data: { userId: req.body.userId, products: { create: productUserLinks } },
  });
  console.log(newReceipt)
  res.json({...newReceipt, products: productsFromDB});
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
