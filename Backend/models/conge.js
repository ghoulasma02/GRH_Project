const { string } = require("joi");
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

const CongeTemplate = new mongoose.Schema({
   DateDebut:String,
   DateFin:String,
   Status:String,
   });
module.exports = mongoose.model("CongeAnnuel", CongeTemplate);
