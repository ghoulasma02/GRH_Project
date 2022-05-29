const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const User= new Schema({

  
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetLink:{ data: String, default: ''},
  managId: {type:mongoose.Schema.Types.ObjectId, ref: 'user'},
  role:{ type: String, enum:['User','Admin','Manager'], required: true},
  Nom: { type: String},
  //,required: true }
  Prenom: { type: String},
  prenomAr: { type: String },
  nomAr: { type: String },
  sexe: { type: String, enum:['Femme','Homme'] },
  dateNaiss: { type: Date },
  situationFamiliale: { type: String, enum:['Célibataire','Marié','Divorcé'] },
  adresse: { type: String },
  ccp: { type: Number},
  rib: { type: Number},
  numSs: { type: Number},
  numCni: { type: Number},
  mobile: { type: String},
  nbrEnfant: { type: Number},
  prenomEnfant: {type: Array},
  eps:[{
    nomEps: String,
    prenomEps: String,
    nomEpsAr: String,
    prenomEpsAr: String
  }],
  prenomPere: { type: String },
  nomMere: { type: String },
  prenomMere: { type: String},
  droitCong:{type:Number}
  
},
{timestamps: true}
);

User.plugin(uniqueValidator);

module.exports = mongoose.model('user', User);

/*
User.plugin(uniqueValidator);

function userValidate(User)
{
  const Schema= {
    email: Joi.string().required.email(),
    password: Joi.string().integer().required()
  }

 return Joi.validate(User,Schema)
}
module.exports = mongoose.model('Doctrine', User);
module.exports = userValidate;*/