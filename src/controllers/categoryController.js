const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//get all categories
router.get("/", async (req, res) => {
  const allCategories = await prisma.category.findMany();
  res.json(allCategories);
});

// get one Category
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const category = await prisma.category.findUnique({
    where: { id: id },
  });
  res.json(category);
});

// create new Category
router.post("/", async (req, res) => {
  const newCategory = await prisma.category.create({ data: req.body });
  res.json(newCategory);
});

//update Category
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedCategoryData = req.body;
  const updatedCategory = await prisma.category.update({
    where: {
      id: id,
    },
    data: updatedCategoryData,
  });
  res.json(updatedCategory);
});

// delete Category
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedCategory = await prisma.category.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedCategory);
});

module.exports = router;
