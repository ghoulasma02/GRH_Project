const mongoose=require('mongoose')



 const departement= new mongoose.Schema({

    NomD:{type: String, required: true},
    RespId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user'}//RESPONSABLE DU DEP
},
{timestamps: true}
)
 module.exports = mongoose.model('Departement',departement)
 