const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const userController = require("./controllers/userController") ; 
const receiptController = require("./controllers/receiptController");
const productController = require("./controllers/productController")

const prisma = new PrismaClient();
const app = express();


app.use(cors());
app.use(express.json());

// a note !! there is no error handling in controllers yet 
app.use("/users", userController);
app.use("/receipts", receiptController);
app.use("/products", productController);









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

app.post('/addProductToReceipt', async (req, res) => {
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

// Usage
// Add product with ID 1 to receipt with ID 2, with a quantity of 3
// In this example, we create a new function addProductToReceipt that inserts a record into the ReceiptProduct table with the specified productId, receiptId, and quantity. You can call this function to associate products with receipts.

// This setup allows you to manage the relationship between products and receipts through the ReceiptProduct junction table while still being able to access associated products and receipts from the Product and Receipt models.








//for Products
app.get("/products", async (req, res) => {
  const allProducts = await prisma.product.findMany();
  res.json(allProducts);
});

app.post("/products", async (req, res) => {
  const newProduct = await prisma.product.create({ data: req.body });
  res.json(newProduct);
});

app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  const deletedProduct = await prisma.product.delete({
    where: { id: id },
  });
  res.json(deletedProduct);
});






app.get("*", (req, res) => {
  res
    .status(404)
    .json("Could not find resource, please check spelling and try again");
});

module.exports = app;
