const express = require("express");
const router = express.Router();
const axios = require("axios");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
  console.log(req.body);
  const receiptOcrEndpoint =
    "https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict";

  const receiptResult = await axios.post(
    receiptOcrEndpoint,
    {
      document: req.body.photo,
    },
    { headers: { Authorization: "Token d08debaaf613b1da78ff63683fdd2d24" } }
  );
console.log(receiptResult)
let productsOnReceipt 
try {
  productsOnReceipt = receiptResult.data.document.inference.pages[0].prediction.line_items.map(item => ({
    name: item.description,
    quantity: item.quantity
   }))

}catch (e){
  console.error(e);
  throw new Error("broke when parsing receipt")
}
const productsFromDB = await prisma.product.findMany({
  where: {
    OR: productsOnReceipt.map(product => product.name)
  },
 } 
)

const productUserLinks = productsFromDB.map((product) => ({ productId: product.id, userId: req.body.userId }));
  const newReceipt = await prisma.receipt.create({ data: {userId:req.body.userId, products: productUserLinks } });
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
