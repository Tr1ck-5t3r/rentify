const express = require("express");
const router = express.Router();
const Interests = require("../models/buyer_interests");

const createInterest = async (req, res) => {
  try {
    const { buyerId, propertyId } = req.body;

    const newInterest = new Interests({
      buyerId,
      propertyId,
    });

    const savedInterest = await newInterest.save();
    res.status(201).json(savedInterest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getInterestsByBuyerId = async (req, res) => {
  try {
    const interests = await Interests.find({ buyerId: req.params.buyerId });
    res.json(interests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteInterest = async (req, res) => {
  try {
    const interest = await Interests.find({
      propertyId: req.params.propertyId,
    });
    if (!interest) {
      return res.status(404).json({ message: "Interest not found" });
    }
    await interest.remove();
    res.json({ message: "Interest deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

router.post("/create", createInterest);
router.get("/:buyerId", getInterestsByBuyerId);
router.delete("/:propertyId", deleteInterest);

module.exports = router;
