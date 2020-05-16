const mongoose = require('mongoose'); // Interface to MongoDB

mongoose.connect(process.env.ACDATABASEURL || "mongodb://localhost/app_campanha", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.log(process.env.ACDATABASEURL, "ERROR: ", err.message);
});

module.exports = mongoose;