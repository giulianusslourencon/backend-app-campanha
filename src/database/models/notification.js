var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    summary: String,
    isActive: Boolean
});

module.exports = mongoose.model("Event", eventSchema);