const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/mynotebook?directConnection=true";
// localhost to 127.0.0.1 because of an error

const connectToMongo = async ()=>{
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully!");
      } catch (error) {
        console.log(error);
      }
    };

module.exports = connectToMongo;