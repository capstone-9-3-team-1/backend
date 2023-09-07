const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const userController = require("./controllers/userController") ; 
const receiptController = require("./controllers/receiptController");
const productController = require("./controllers/productController");
const addProductToReceiptController = require("./controllers/addProductToReceiptController");

const prisma = new PrismaClient();
const app = express();


app.use(cors());
app.use(express.json());

// a note !! there is no error handling in controllers yet 
app.use("/users", userController);
app.use("/receipts", receiptController);
app.use("/products", productController);
app.use("/addProductToReceipt", addProductToReceiptController)









//for ProductToReceipt 

// app.post('/addProductToReceipt/:receiptId', async (req, res) => {
//   const { receiptId } = req.params;
//   const productData = req.body;

//   try {
//     const createdProduct = await prisma.product.create({
//       data: {
//         ...productData,
//         receipts: {
//           connect: { id: receiptId },
//         },
//       },
//     });

//     res.status(201).json(createdProduct);
//   } catch (error) {
//     console.error('Error adding product to receipt:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



app.get("*", (req, res) => {
  res
    .status(404)
    .json("Could not find resource, please check spelling and try again");
});

module.exports = app;
