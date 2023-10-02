const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//get all Articles
router.get("/", async (req, res) => {
  const allArticles = await prisma.article.findMany();
  res.json(allArticles);
});

// get one Article
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(article);
  });

// create new article
router.post("/", async (req, res) => {
  const newArticle = await prisma.article.create({ data: req.body });
  res.json(newArticle);
});

//update article
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedArticleData = req.body;
  const updatedArticle = await prisma.article.update({
    where: {
      id: parseInt(id),
    },
    data: updatedArticleData,
  });
  res.json(updatedArticle);
});

// delete article
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedArticle = await prisma.article.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedArticle);
});

module.exports = router;
