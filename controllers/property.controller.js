const request = require("request");
const catchAsync = require("../utils/catchAsync");
const { Agent, Filter, Property } = require("../models");
const mlsApi = "https://api.simplyrets.com/";
const mlsKey = "Basic " + btoa("mweis_18f15548" + ":" + "3346216f22164a64");

// Define the options for the request
let options = {
  headers: {
    accept: "application/json",
    Authorization: mlsKey,
  },
};

const createProperty = catchAsync(async (req, res) => {
  const { permissions } = req.user.roleId;
  const all = permissions.find((i) => i.module === "all");

  if (!all) {
    return res.status(403).send("Forbidden! You are not allowed to create a property");
  }

  const primaryAgent = await Agent.findById(req.body.Primary_agentId);
  if (!primaryAgent) {
    return res.status(404).send("Primary agent not found");
  }

  if (req.body.Secondary_agentId) {
    const secondaryAgent = await Agent.findById(req.body.Secondary_agentId);

    if (!secondaryAgent) {
      return res.status(404).send("Secondary agent not found");
    }
  }

  const filters = await Filter.find({ _id: { $in: req.body.filters || [] } });
  if (req.body.filters && filters.length !== req.body.filters.length) {
    return res.status(404).send("Some filters not found");
  }

  const property = await Property.create(req.body);
  return res.status(200).send({ message: "Property created successfully", property });
});

const getProperty = catchAsync(async (req, res) => {
  let property = {};
  if (req.query.mlsOnly) {
    property.mlsId = req.params.id;
  } else {
    property = await Property.findById(req.params.id)
      .populate("Primary_agentId")
      .populate("Secondary_agentId")
      .populate("filters")
      .exec();
  }

  if (property) {
    options.url = mlsApi + `properties/${property.mlsId}?count=true`;

    if (req.query.mlsOnly) {
      options.url = `${mlsApi}properties/${property.mlsId}?count=true`;
      request(options, async (error, response, body) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Error fetching MLS data");
        }
        const mls = JSON.parse(body);
        return res.status(200).send({ property, mls });
      });
    } else {
      return res.status(200).send({ property });
    }
  } else {
    return res.status(404).send("Property not found");
  }
});


const updateProperty = catchAsync(async (req, res) => {
  const { permissions } = req.user.roleId;
  const all = permissions.find((i) => i.module === "all");

  if (!all) {
    return res.status(403).send("Forbidden! You are not allowed to update a property");
  }

  if (req.body.Primary_agentId) {
    const primaryAgent = await Agent.findById(req.body.Primary_agentId);
    if (!primaryAgent) {
      return res.status(404).send("Primary agent not found");
    }
  }

  if (req.body.Secondary_agentId) {
    const secondaryAgent = await Agent.findById(req.body.Secondary_agentId);
    if (!secondaryAgent) {
      return res.status(404).send("Secondary agent not found");
    }
  }

  if (req.body.filters && req.body.filters.length > 0) {
    const filters = await Filter.find({ _id: { $in: req.body.filters } });
    if (filters.length !== req.body.filters.length) {
      return res.status(404).send("Some filters not found");
    }
  }

  const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
  if (!updatedProperty) {
    return res.status(404).send("Property not found");
  }

  return res.status(200).send({ message: "Property updated successfully", updatedProperty });
});

const getProperties = catchAsync(async (req, res) => {
  try {
    const {
      key,
      limit = 10,
      page = 1,
      status,
      agentId,
      filterId,
      minBedCount,
      maxBedCount,
      minBathCount,
      maxBathCount,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      counties,
      type,
      state,
      cities,
      mlsOnly,
      fromPress,
      withoutPress,
    } = req.query;

    const query = {};
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Add search filters to the query object
    if (key) {
      query.$or = [
        { name: { $regex: key, $options: "i" } },
        { neighborhood: { $regex: key, $options: "i" } },
        { status: { $regex: key, $options: "i" } },
        { addressLine1: { $regex: key, $options: "i" } },
        { addressLine2: { $regex: key, $options: "i" } },
        { state: { $regex: key, $options: "i" } },
        { city: { $regex: key, $options: "i" } },
        { country: { $regex: key, $options: "i" } },
        { zipCode: { $regex: key, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (agentId) {
      query.$or = [
        { Primary_agentId: agentId },
        { Secondary_agentId: agentId }
      ];
    }

    if (filterId) {
      query.filters = { $in: [filterId] };
    }

    if (minBedCount || maxBedCount) {
      query.bedroomCount = { $gte: minBedCount || 0, $lte: maxBedCount || Infinity };
    }

    if (minBathCount || maxBathCount) {
      query.bathCount = { $gte: minBathCount || 0, $lte: maxBathCount || Infinity };
    }

    if (minPrice || maxPrice) {
      query.salePrice = { $gte: minPrice || 0, $lte: maxPrice || Infinity };
    }

    if (minArea || maxArea) {
      query.area = { $gte: minArea || 0, $lte: maxArea || Infinity };
    }

    if (fromPress) {
      query.press = { $ne: null };
    }

    if (withoutPress) {
      query.press = { $exists: false };
    }

    if (mlsOnly) {
      options.qs = { ...req.query, limit, offset: (page - 1) * limit };
      options.url = `${mlsApi}properties?count=true`;

      return request(options, (error, response) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Error fetching MLS data");
        }
        const properties = JSON.parse(response.body);
        return res.status(200).json({ properties, totalCount: response.headers["x-total-count"] });
      });
    }

    const totalCount = await Property.countDocuments(query);
    const properties = await Property.find(query)
      .populate("Primary_agentId")
      .populate("Secondary_agentId")
      .populate("filters")
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).json({ properties, totalCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const deleteProperty = catchAsync(async (req, res) => {
  const { permissions } = req.user.roleId;
  const all = permissions.find((i) => i.module === "all");

  if (!all) {
    return res.status(403).send("Forbidden! You are not allowed to delete a property");
  }

  const result = await Property.deleteOne({ _id: req.params.id });
  if (result.deletedCount > 0) {
    return res.status(200).send("Property deleted successfully");
  } else {
    return res.status(404).send("Property not found");
  }
});

const getIdxProperties = catchAsync(async (req, res) => {
  try {
    const {
      idx = "ignore",
      key,
      limit = 10,
      page = 0,
      status,
      minBedCount,
      maxBedCount,
      minBathCount,
      maxBathCount,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      type,
      counties,
      state,
      cities,
    } = req.query;

    options.qs = { ...req.query, limit, offset: page * limit, idx };
    options.url = `${mlsApi}properties?count=true`;

    return request(options, (error, response) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error fetching IDX data");
      }
      const properties = JSON.parse(response.body);
      return res.status(200).json({ properties, totalCount: response.headers["x-total-count"] });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

module.exports = {
  createProperty,
  getProperty,
  updateProperty,
  getProperties,
  deleteProperty,
  getIdxProperties,
};
