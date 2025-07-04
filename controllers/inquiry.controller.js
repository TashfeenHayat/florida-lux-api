const nodemailer = require("nodemailer");
const catchAsync = require("../utils/catchAsync");
const { Inquiry } = require("../models");
const { decode } = require("html-entities");
// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail", // true for 465, false for other ports

  auth: {
    user: "floridaluxurioussubmissions@gmail.com",
    pass: "uofc trdb nceu bjzv",
     
  },
   debug: true,
  logger: true,
});
// let transporter = nodemailer.createTransport({
//   host: "smtpout.secureserver.net",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: "Info@FloridaLuxurious.com",
//     pass: "6R8a4M&zD#XpkE3N!Z#W",
//   },
// }); 
const createInquiry = catchAsync(async (req, res) => {
const { firstName, lastName, email, message, phoneNumber, propertyId, requestVisit, html } = req.body;
const decodedHtml = decode(html || '');
  // Define email content using frontend-sent HTML
  const mailOptions = {
    from: `"${firstName} ${lastName}" <${email}>`,
    to: 'Info@FloridaLuxurious.com',
    replyTo: email,
    subject: 'New Contact Us Form Submission',
    html:decodedHtml,// fallback plain HTML
    text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phoneNumber}\n ${message}` // for clients without HTML support
  };

console.log('Email HTML content:\n', html);
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
