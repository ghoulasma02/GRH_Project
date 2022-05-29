const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const demAbs= new Schema({

 //userId: { type: mongoose.Schema.Types.ObjectId,  ref: 'User' },
  userId:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  dateDebut: {type: Date},
   //  required: true},
  dateFin: {type: Date}, 
    //required: true},
  motif:{type: String},
  justification: {type: String},
  etat:{type:String, enum: ['En attente','Acceptée','Non-Acceptée'], default:'En attente'},
  
  
},


{timestamps: true}
);



module.exports = mongoose.model('demandeAbsence', demAbs);