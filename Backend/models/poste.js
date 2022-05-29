const mongoose=require('mongoose')
const { stringify } = require('nodemon/lib/utils')


 const poste= new mongoose.Schema({
    
    nomP: {type: String, required: true},
    Situation :{type: String, enum:["En phase d'essai","Intégré"] },
       //     ,required: true},
        
    Salaire :{type: Number},
      //    ,required: true },
        
    StatusP :{type: String, enum:['Actif','Non-actif']},
      // ,required: true},
    
    DateE: {type: Date},
      //      , required: true},
        
    DateS:{type: Date},
          //  , required: true},
         
    depId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Departement' },
    userId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }
    },
    {timestamps: true}
    )
 module.exports = mongoose.model('Poste',poste)
 