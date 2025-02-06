const request = require("request");
const catchAsync = require("../utils/catchAsync");
const { Agent, Filter, Property } = require("../models");
const { Console } = require("winston/lib/winston/transports");
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
  console.log(req.body)
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
  return res.status(200).send({ message: "Property created successfully", property, propertyId: property._id });
});

// const getProperty = catchAsync(async (req, res) => {
//   let property = {};
//   if (req.query.mlsOnly) {
//     property.mlsId = req.params.id;
//   } else {
//     property = await Property.findById(req.params.id)
//       .populate("Primary_agentId")
//       .populate("Secondary_agentId")
//       .populate("filters")
//       .exec();
//   }

//   if (property) {
//     options.url = mlsApi + `properties/${property.mlsId}?count=true`;

//     if (req.query.mlsOnly) {
//       options.url = `${mlsApi}properties/${property.mlsId}?count=true`;
//       request(options, async (error, response, body) => {
//         if (error) {
//           console.error(error);
//           return res.status(500).send("Error fetching MLS data");
//         }
//         const mls = JSON.parse(body);
//         return res.status(200).send({ property, mls });
//       });
//     } else {
//       return res.status(200).send({ property });
//     }
//   } else {
//     return res.status(404).send("Property not found");
//   }
// });

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
    options.url = `${mlsApi}properties/${property.mlsId}?count=true`;
    console.log("ali", req.query.mlsOnly)
    if (req.query.mlsOnly) {

      request(options, async (error, response, body) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Error fetching MLS data");
        }

        let mls = JSON.parse(body);

        // Sort the data by price in descending order
        if (mls && Array.isArray(mls)) {
          mls.sort((a, b) => b.price - a.price);
        }

        return res.status(200).send({ property, mls });
      });
    } else {
      console.log("ali")
      return res.status(200).send({
        property: Array.isArray(property) ? property.sort((a, b) => b.price - a.price) : property
      });
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

  return res.status(200).send({ message: "Property updated successfully", updatedProperty, propertyId: updateProperty._id });
});

const getProperties = catchAsync(async (req, res) => {
  try {
    console.log("Fetching properties...");
    const {
      key, status, agentId, filterId,
      minBedCount, maxBedCount, minBathCount, maxBathCount,
      minPrice, maxPrice, minArea, maxArea, countries, type,
      state, cities, mlsOnly, fromPress, withoutPress,
    } = req.query;

    const query = {};

    // Normalize the search term
    let searchTerm = key ? key.trim().replace(/\s+/g, ' ') : '';

    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { neighborhood: { $regex: searchTerm, $options: "i" } },
        { status: { $regex: searchTerm, $options: "i" } },
        { state: { $regex: searchTerm, $options: "i" } },
        { city: { $regex: searchTerm, $options: "i" } },
        { country: { $regex: searchTerm, $options: "i" } },
        { zipCode: { $regex: searchTerm, $options: "i" } },
        { addressLine1: { $regex: searchTerm, $options: "i" } },
        { addressLine2: { $regex: searchTerm, $options: "i" } },
        {
          features: {
            $elemMatch: {
              $or: [
                { name: { $regex: searchTerm, $options: "i" } }, // Search within the "name" field of features
                { description: { $regex: searchTerm, $options: "i" } } // Search within the "description" field of features
              ]
            }
          }
        },
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ["$addressLine1", " ", "$addressLine2"] },
              regex: ".*" + searchTerm + ".*", // Partial match for address fields
              options: "i"
            }
          }
        }
      ];
    }

    // Apply filters
    if (status) query.status = status;
    if (agentId) query.$or = [{ Primary_agentId: agentId }, { Secondary_agentId: agentId }];
    if (filterId) query.filters = { $in: [filterId] };
    if (minBedCount || maxBedCount) query.bedroomCount = { $gte: minBedCount || 0, $lte: maxBedCount || Infinity };
    if (minBathCount || maxBathCount) query.bathCount = { $gte: minBathCount || 0, $lte: maxBathCount || Infinity };
    if (minPrice || maxPrice) query.salePrice = { $gte: minPrice || 0, $lte: maxPrice || Infinity };
    if (minArea || maxArea) query.area = { $gte: minArea || 0, $lte: maxArea || Infinity };
    if (fromPress) query.press = { $ne: null };
    if (withoutPress) query.press = { $exists: false };

    if (mlsOnly) {
      options.qs = { ...req.query };
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

    // **STEP 1: Fetch all properties without limit**
    let allProperties = await Property.find(query)
      .populate("Primary_agentId")
      .populate("Secondary_agentId")
      .populate("filters")
      .exec();

    // Sort properties by sale price (or any other criteria)
    allProperties.sort((a, b) => b.salePrice - a.salePrice); // Sort in descending order by price
    // console.log("First 5 properties:", allProperties.slice(0, 5));

    // Return all properties without pagination
    return res.status(200).json({ properties: allProperties, totalCount: allProperties.length });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
const getSearchSuggestions = catchAsync(async (req, res) => {
  try {
    const { key } = req.query;

    if (!key) return res.json([]); // If no search key, return empty array

    let searchTerm = key.trim().replace(/\s+/g, " "); // Normalize search

    // Use a regex search with i (case-insensitive) and `.*` for partial matches anywhere in the string
    const suggestions = await Property.find(
      {
        $or: [
          { name: { $regex: ".*" + searchTerm + ".*", $options: "i" } }, // Partial match for name
          { neighborhood: { $regex: ".*" + searchTerm + ".*", $options: "i" } }, // Partial match for neighborhood
          { city: { $regex: ".*" + searchTerm + ".*", $options: "i" } }, // Partial match for city
          { state: { $regex: ".*" + searchTerm + ".*", $options: "i" } }, // Partial match for state
          { country: { $regex: ".*" + searchTerm + ".*", $options: "i" } }, // Partial match for country
          { zipCode: { $regex: ".*" + searchTerm + ".*", $options: "i" } }, // Partial match for zipCode
          { status: { $regex: ".*" + searchTerm + ".*", $options: "i" } }, // Partial match for status
          {
            features: {
              $elemMatch: {
                $or: [
                  { name: { $regex: ".*" + searchTerm + ".*", $options: "i" } }, // Partial match for features name
                  { description: { $regex: ".*" + searchTerm + ".*", $options: "i" } } // Partial match for features description
                ]
              }
            }
          },
          {
            $expr: {
              $regexMatch: {
                input: { $concat: ["$addressLine1", " ", "$addressLine2"] },
                regex: ".*" + searchTerm + ".*", // Partial match for address fields
                options: "i"
              }
            }
          }
        ]
      },
      "name neighborhood city state country zipCode status featured addressLine1 addressLine2 features" // Return only required fields including "features"
    ).limit(10); // Limit to 10 suggestions

    return res.status(200).json({ properties: suggestions });
  } catch (error) {
    console.error("Error fetching search suggestions:", error);
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
    console.log("req.query");
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
  getSearchSuggestions
};
