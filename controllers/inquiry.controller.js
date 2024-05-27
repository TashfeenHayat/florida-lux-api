const nodemailer = require("nodemailer");
const catchAsync = require("../utils/catchAsync");
const { Inquiry } = require("../models");

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "7464c0001@smtp-brevo.com",
    pass: "w5bhdQsRDjGKtPUC",
  },
});

const createInquiry = catchAsync(async (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  // Define email content
  let mailOptions = {
    from: "support@floridaluxurious.com",
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
  try {
    const { key } = req.query;

    const query = {};
    // Add search filters to the query object
    if (key) {
      query.name = { $regex: key, $options: "i" }; // Case-insensitive regex search for name

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
    return res.status(500).json("Internal server error");
  }
});

module.exports = {
  createInquiry,
  getInquiry,
  getInquiries,
};
