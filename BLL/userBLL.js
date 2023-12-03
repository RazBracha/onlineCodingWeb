const UsersModel = require('../models/userModel');



const getIsMentor = () => {
    return UsersModel.findById("656cbeb34f30f3d70595977a");
  };

  const setIsMentor = (value) => {
    return UsersModel.findByIdAndUpdate("656cbeb34f30f3d70595977a", {isMentor : value})
  };


  module.exports = { getIsMentor,  setIsMentor}