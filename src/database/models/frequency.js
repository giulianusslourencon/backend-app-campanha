const mongoose = require("mongoose");

const frequencySchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member"
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }
});

module.exports = mongoose.model("Frequency", frequencySchema);