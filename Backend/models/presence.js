const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const presence= new Schema({

 

enService: {type: Date},//heur arrivee
   //  required: true},
enRepos: {type: Date}, //heur sortie
    //required: true},
status:{type: String, enum:['Absent(e)','Présent(e)']},
typeAbs: {type: String, enum:['En Mission','En terrin']},
userId:{type: mongoose.Schema.Types.ObjectId,  ref: 'user'}
},

{timestamps: true}
);



module.exports = mongoose.model('presence', presence);