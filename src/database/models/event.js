const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    },
    summary: String,
    team: {
        type: String,
        ref: "Team"
    },
    eventGroup: String,
    date: Date,
    location: String,
    conclusion: String
});

module.exports = mongoose.model("Event", eventSchema);