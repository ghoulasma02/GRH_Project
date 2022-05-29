const mongoose=require('mongoose')


 const contrat= new mongoose.Schema({
    dateEd:{type: Date, required: true},
    pj:{type: String},
    posteId:{ type: mongoose.Schema.Types.ObjectId,  ref: 'Poste' }
},
{timestamps: true}
)
 module.exports = mongoose.model('Contrat',contrat)
