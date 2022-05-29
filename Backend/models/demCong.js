const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const demCong= new Schema({

  
 //_userId: { type: mongoose.Schema.Types.ObjectId,  ref: 'User' },
  userId:{type:mongoose.Schema.Types.ObjectId, ref: 'user' },
  dateDebut: {type: Date},
   //  required: true},
  dateFin: {type: Date}, 
    //required: true},
  type: {type: String},
    // required: true},
  motif:{type: String}, 
  cause: {type: String},// support electronique
  autoAdmin:{type:String, enum:['En attente','Acceptée','Non-Acceptée'], default:'En attente'}, 
  autoManag:{type:String,enum: ['En attente','Acceptée','Non-Acceptée'] ,default:"En attente" },
  
},


{timestamps: true}
);



module.exports = mongoose.model('demandeConge', demCong);