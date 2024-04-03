const catchAsync = require('../utils/catchAsync');
const { Inquiry } = require('../models');

const createInquiry = catchAsync(async (req, res) => {

    await Inquiry.create(req.body);
    
    return res.status(200).send('Inquiry saved successfully');

});

const getInquiry = catchAsync(async (req, res) => {
  try {

    const inquiry = await Inquiry.findById(req.params.id);
    return res.status(200).send(inquiry)
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(404).json('No inquiry foud');
  }
});

const getInquiries = catchAsync(async (req, res) => {
    
    try {
      const { key } = req.query;
      
      const query = {};
    // Add search filters to the query object
    if (key) {
      query.name = { $regex: key, $options: 'i' }; // Case-insensitive regex search for name

      // If key is provided
      const allInquiries = await Inquiry.find(query);
      return res.status(200).json(allInquiries);
    }
      
      // If no key is provided, return all agents
      const allInquiries = await Inquiry.find(query);
      return res.status(200).json(allInquiries);
    } catch (error) {
      // Handle errors
      console.error(error);
      return res.status(500).json('Internal server error');
    }
});

module.exports = {
    createInquiry,
    getInquiry,
    getInquiries,
};
