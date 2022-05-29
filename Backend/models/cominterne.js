const { string } = require("joi");
const mongoose = require("mongoose");


const ComInterneTemplate = new mongoose.Schema(
  {
    Date:String,
    Titre:String,
    Contenu:String
   
  },
  
);
module.exports = mongoose.model("ComInterne", ComInterneTemplate);