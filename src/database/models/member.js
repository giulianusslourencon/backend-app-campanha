var mongoose = require("mongoose");
const aws = require('aws-sdk');
const s3 = new aws.S3();

var memberSchema = new mongoose.Schema({
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
        key: String,
        url: String
    },
    course: String,
    hasCar: Number,
    coord: Boolean
});

memberSchema.pre('remove', function() {
    return s3.deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: this.image.key
    }).promise();
});

module.exports = mongoose.model("Member", memberSchema);