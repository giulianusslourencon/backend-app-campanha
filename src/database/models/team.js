var mongoose = require("mongoose");

var teamSchema = new mongoose.Schema({
    _id: String,
    name: String,
    shortName: String,
    description: String,
    score: Number
});

module.exports = mongoose.model("Team", teamSchema);