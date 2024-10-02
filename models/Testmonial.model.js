const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TestmonialSchema = new Schema(
    {
        agentId: {
            type: Schema.Types.ObjectId,
            ref: "Agent",
        },
        Username: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            trim: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        }
    },
    {
        timestamps: true,
    }
);

/**
 * @typedef Testmonial
 */
const Testmonial = mongoose.model("Testmonial", TestmonialSchema);

module.exports = Testmonial;
