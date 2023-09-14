const express = require("express");
const cors = require("cors");
const receiptController = require("./controllers/receiptController");
const productController = require("./controllers/productsController");
const receiptProductController = require("./controllers/receiptProduct");
const tokensIssuedController = require("./controllers/tokensIssuedController");
const userTokensBalanceController = require("./controllers/userTokensBalanceController");
const rewardController = require("./controllers/rewardController");
const searchController = require("./controllers/searchController");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json("Welcome! Resources can be found at the /names endpoint");
});

app.use("/receipts", receiptController);
app.use("/products", productController);
app.use("/receiptProduct", receiptProductController);
app.use("/tokensIssued", tokensIssuedController);
app.use("/userTokensBalance", userTokensBalanceController);
app.use("/rewards", rewardController);
app.use("/search", searchController);

app.get("*", (req, res) => {
  res
    .status(404)
    .json("Could not find resource, please check spelling and try again");
});

module.exports = app;
