const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://predictor:Fantastic88.@ds261096.mlab.com:61096/predictor",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connection Established"))
  .catch(err => console.log(err.message));
