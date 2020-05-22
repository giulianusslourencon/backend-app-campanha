const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: String,
    realName: String,
    email: String,
    password: String,
    wpp: String,
    team: {
        type: String,
        ref: "Team"
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    },
    course: String,
    hasCar: Number,
    coord: Boolean
});

module.exports = mongoose.model("Member", memberSchema);