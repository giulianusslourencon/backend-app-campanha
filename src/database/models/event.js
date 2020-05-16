var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    summary: String,
    team: {
        type: String,
        ref: "Team"
    },
    eventGroup: String,
    date: mongoose.Schema.Types.Date,
    location: String,
    conclusion: String
});

module.exports = mongoose.model("Event", eventSchema);