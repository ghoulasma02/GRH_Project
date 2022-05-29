const mongoose=require('mongoose')


 const demPapier= new mongoose.Schema({
    
    format:{type:String, enum:['Electronique','Physique']},  //Type du papier
    etatD:{type:String, enum:['En attente','Envoyé'] ,default:"En attente"},
    Nom:{type:String},
  
    userId:{type:mongoose.Schema.Types.ObjectId, ref: 'user' }
},
{timestamps: true}
)
 module.exports = mongoose.model('DemPapier',demPapier)