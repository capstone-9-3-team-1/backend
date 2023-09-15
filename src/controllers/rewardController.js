const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// create new reward
router.post("/", async (req, res) => {
  const newReward = await prisma.reward.create({ data: req.body });
  res.json(newReward);
});

//get all rewards
router.get("/", async (req, res) => {
  const allRewards = await prisma.reward.findMany();
  res.json(allRewards);
});

// get single reward
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const reward = await prisma.reward.findUnique({
    where: { id: id },
  });
  res.json(reward);
});

// edit a reward
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedRewardData = req.body;
  const updatedReward = await prisma.reward.update({
    where: {
      id: id,
    },
    data: updatedRewardData,
  });
  res.json(updatedReward);
});

// delete reward
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedReward = await prisma.reward.delete({
    where: { id: id },
  });
  res.json(deletedReward);
});


module.exports = router;
