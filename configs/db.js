const mongoose = require('mongoose');

const mongoURI =
'mongodb+srv://razbracha:mongodb1121@database.btnytff.mongodb.net/OnlineCodeApp?retryWrites=true&w=majority';


const connectDB = () => {
    mongoose
      .connect(mongoURI)
      .then(() => console.log('OnlineCodeApp db'))
      .catch((error) => console.log(error));
  };
  
  module.exports = connectDB;