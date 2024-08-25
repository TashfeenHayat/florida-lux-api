const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
        },
        content: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

/**
 * @typedef Report
 */
const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
