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

  if (all) {
    const agent = await Agent.findById(req.body.agentId);

    if (agent) {
      const filters = await Filter.find({ _id: { $in: req.body.filters } });

      if (filters.length > 0) {
        await Property.create(req.body);
        return res.status(200).send("Property created successfully");
      } else {
        return res.status(404).send("Filters not found");
      }
    } else {
      return res.status(404).send("Agent not found");
    }
  } else {
    return res
      .status(403)
      .send("Forbiden! You are not allowed to create a property");
  }
});

const getProperty = catchAsync(async (req, res) => {
  let property = {};
  if (req.query.mlsOnly) {
    property.mlsId = req.params.id;
  } else {
    property = await Property.findById(req.params.id)
      .populate({
        path: "agentId",
      })
      .populate({
        path: "filters",
      })
      .exec();
  }

  if (property) {
    options.url = mlsApi + `properties/${property.mlsId}?count=true`;

    request(options, async (error, response, body) => {
      const mls = JSON.parse(body);

      return res.status(200).send({ property, mls });
    });
  } else {
    return res.status(404).send("Property not found");
  }
});

const updateProperty = catchAsync(async (req, res) => {
  const { permissions } = req.user.roleId;
  const all = permissions.find((i) => i.module === "all");

  if (all) {
    if (req.body.agentId) {
      const agent = await Agent.findById(req.body.agentId);
      if (!agent) {
        return res.status(404).send("Agent not found");
      }
    }

    if (req.body.filters && req.body.filters.length > 0) {
      const filters = await Filter.find({ _id: { $in: req.body.filters } });
      if (filters.length === 0) {
        return res.status(404).send("Filters not found");
      }
    }

    await Property.findByIdAndUpdate(req.params.id, req.body);

    return res.status(200).send("Property updated successfully");
  } else {
    return res
      .status(403)
      .send("Forbiden! You are not allowed to create a property");
  }
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
      mlsOnly,
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
      query.agentId = agentId;
    }

    if (filterId) {
      query.filters = { $in: [filterId] };
    }

    if (minBedCount || maxBedCount) {
      query.bedroomCount = { $gte: minBedCount, $lte: maxBedCount };
    }

    if (minBathCount || maxBathCount) {
      query.bathCount = { $gte: minBathCount, $lte: maxBathCount };
    }

    if (minPrice || maxPrice) {
      query.salePrice = { $gte: minPrice, $lte: maxPrice };
    }

    if (minArea || maxArea) {
      query.area = { $gte: minArea, $lte: maxArea };
    }

    if (mlsOnly) {
      if (key) {
        options.qs = { q: key };
      }
      if (status) {
        options.qs.status = status;
      }
      if (minBedCount) {
        options.qs.minbeds = minBedCount;
      }
      if (maxBedCount) {
        options.qs.maxbeds = maxBedCount;
      }
      if (minBathCount) {
        options.qs.minbaths = minBathCount;
      }
      if (maxBathCount) {
        options.qs.maxbaths = maxBathCount;
      }
      if (minPrice) {
        options.qs.minprice = minPrice;
      }
      if (maxPrice) {
        options.qs.maxprice = maxPrice;
      }
      if (minArea) {
        options.qs.minarea = minArea;
      }
      if (maxArea) {
        options.qs.maxarea = maxArea;
      }

      options.url = mlsApi + "properties?count=true";

      return request(options, (error, response) => {
        if (error) throw new Error(error);

        const properties = JSON.parse(response.body);

        return res.status(200).json({ properties });
      });
    }

    // Find total count of properties
    const totalCount = await Property.countDocuments(query);

    // If key or other query parameters are provided
    const properties = await Property.find(query)
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });
    return res.status(200).json({ properties, totalCount });
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const deleteProperty = catchAsync(async (req, res) => {
  const { permissions } = req.user.roleId;
  const all = permissions.find((i) => i.module === "all");

  if (all) {
    const property = await Property.deleteOne({ _id: req.params.id });

    if (property.deletedCount > 0) {
      return res.status(200).send("Property deleted successfully");
    } else {
      return res.status(404).send("Property not found");
    }
  } else {
    return res
      .status(403)
      .send("Forbiden! You are not allowed to create an agent");
  }
});

module.exports = {
  createProperty,
  getProperty,
  updateProperty,
  getProperties,
  deleteProperty,
};
