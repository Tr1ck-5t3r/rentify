const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Property = require("../models/property_model");

const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      address,
      city,
      state,
      zipCode,
      country,
      area,
      bedrooms,
      bathrooms,
      type,
      amenities,
      yearBuilt,
    } = req.body;

    const ownerId = req.params.ownerId;

    const newProperty = new Property({
      title,
      description,
      price,
      address,
      city,
      state,
      zipCode,
      country,
      area,
      bedrooms,
      bathrooms,
      type,
      amenities,
      yearBuilt,
      ownerId,
    });

    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPropertyByOwnerId = async (req, res) => {
  try {
    const properties = await Property.find({ ownerId: req.params.ownerId });
    if (properties.length === 0) {
      return res
        .status(404)
        .json({ message: "No properties found for this owner" });
    }
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const {
      title,
      description,
      price,
      address,
      city,
      state,
      zipCode,
      country,
      area,
      bedrooms,
      bathrooms,
      type,
      amenities,
      yearBuilt,
    } = req.body;

    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      {
        title,
        description,
        price,
        address,
        city,
        state,
        zipCode,
        country,
        area,
        bedrooms,
        bathrooms,
        type,
        amenities,
        yearBuilt,
      },
      { new: true }
    );

    res.json(updatedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getallPropertyInListed = async (req, res) => {
  try {
    const propertyIds = req.body.properties;
    if (!Array.isArray(propertyIds)) {
      return res
        .status(400)
        .json({ message: "properties must be an array of IDs" });
    }

    const idsArray = propertyIds.map((id) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid ObjectId: ${id}`);
      }
      return new mongoose.Types.ObjectId(id);
    });

    const properties = await Property.find({ _id: { $in: idsArray } });
    res.json(properties);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

router.post("/properties/create/:ownerId", createProperty);
router.get("/properties", getAllProperties);
router.get("/properties/:propertyId", getPropertyById);
router.get("/properties/owner/:ownerId", getPropertyByOwnerId);
router.post("/properties/listed", getallPropertyInListed); // Ensure it's a POST request
router.patch("/properties/owner/:propertyId", updateProperty);

module.exports = router;
