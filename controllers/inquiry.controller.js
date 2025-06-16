const nodemailer = require("nodemailer");
const catchAsync = require("../utils/catchAsync");
const { Inquiry } = require("../models");

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail", // true for 465, false for other ports
  auth: {
    user: "floridaluxurioussubmissions@gmail.com",
    pass: "FLPsubmissions123",
  },
});

const createInquiry = catchAsync(async (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  // Define email content
  let mailOptions = {
    from: "floridaluxurioussubmissions@gmail.com",
    to: "technologygenesis6@gmail.com",
    subject: "New Contact Us Form Submission",
    text: `Name: ${firstName + lastName}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });

  await Inquiry.create(req.body);

  return res.status(200).send("Inquiry saved successfully");
});

const getInquiry = catchAsync(async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id)
      .populate({
        path: "propertyId",
      })
      .exec();

    return res.status(200).send(inquiry);
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(404).json("No inquiry foud");
  }
});

const getInquiries = catchAsync(async (req, res) => {
  const { key, limit = 10, page = 1 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  let query = {};

  // Add search filters to the query object
  if (key) {
    // query.firstName = { $regex: key, $options: 'i' }; // Case-insensitive regex search for name
    query = {
      $or: [
        { firstName: { $regex: key, $options: "i" } },
        { lastName: { $regex: key, $options: "i" } },
        { email: { $regex: key, $options: "i" } },
        { phoneNumber: { $regex: key, $options: "i" } },
      ],
    };
  }
  // Find total count of inquiries
  const totalCount = await Inquiry.countDocuments(query);

  // If key is provided
  const inquiries = await Inquiry.find(query)
    .limit(parseInt(limit))
    .skip(skip)
    .sort({ createdAt: -1 });
  return res.status(200).json({ inquiries, totalCount });
});

module.exports = {
  createInquiry,
  getInquiry,
  getInquiries,
};
