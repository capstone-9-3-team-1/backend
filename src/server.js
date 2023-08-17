const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT || 3000, () => {
  console.log(`Currently running on ${PORT || 3000}`);
});
