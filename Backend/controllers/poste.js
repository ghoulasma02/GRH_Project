const post = require('../models/poste');
const Dep = require('../models/departement');
const User = require('../models/user');
const Joi = require('joi');
const { join } = require('lodash');
const moment = require('moment');


exports.createPoste =  async (req,res)=>{
/*
  const schema = Joi.object({
     email: Joi.string().email(),
     Situation: Joi.string(),
     Salaire: Joi.number(),
     nomP: Joi.string(),
     StatusP : Joi.string(),
      DateE: Joi.date(),
      DateS: Joi.date(),
      NomD: Joi.string(),
      
      
     
  })
  
   let valid = await schema.validateAsync(req.body)*/
   
   let user= await User.findOne({ email : req.body.email})
    if (!user) {
    return res
    .status(409)
    .json({ message: 'Cette section est vide' });
    }
   const dep = await Dep.findOne({NomD:req.body.NomD});
    if (!dep) {
    return res
    .status(409)
    .json({ message: 'Departement n existe pas' });
    }
    
  const RequestPost= new post({
    ...req.body,
    DateE: moment(req.body.DateE,'YYYY-MM-DDT00:00:00').toDate(),
    depId:  dep._id,
    userId: user._id
                          })
    
    RequestPost.save()
    .then(()=> res.status(200).json({message:'poste enregistre !'}))
    .catch(error=> res.status(400).json({error}))

}


exports.listPost =  (req, res,next) => {
  
  
  post.find({ ...req.body},{_id:0,createdAt:0,updatedAt:0,__v:0}).populate("depId", "NomD").populate("userId", "Nom Prenom")
   .then((p)=>{
    if(!p){
      return res.status(401).json({ error: 'cette section est vide !' });
    }
    res.status(200).json(p);
   })
   .catch(error => res.status(500).json({ error }))
  } 
      
    
  exports.checkonePst =  (req, res,next) => {
     
    post.findById(req.params.id,{_id:0,createdAt:0,updatedAt:0,__v:0}).populate("depId", "NomD").populate("userId", "Nom Prenom")
  .then((p)=>{
   if(!p){
     return res.status(401).json({ error: 'cette section est vide !' });
   }
   res.status(200).json(p);
  })
  .catch(error => res.status(500).json({ error }))
  }

  exports.checkPstUser =  (req, res,next) => {
     
    post.findOne({userId: req.user},{_id:0,createdAt:0,updatedAt:0,__v:0}).populate("depId", "NomD").populate("userId", "Nom Prenom")
  .then((p)=>{
   if(!p){
     return res.status(401).json({ error: 'cette section est vide !' });
   }
   res.status(200).json(p);
  })
  .catch(error => res.status(500).json({ error }))
  }

  exports.editPost = async (req,res)=>{
    if(req.body.DateE){
      req.body.DateE = moment(req.body.DateE,'YYYY-MM-DDT00:00:00').toDate()
     }
     if(req.body.DateS){
      req.body.DateS = moment(req.body.DateS,'YYYY-MM-DDT00:00:00').toDate()
     }
    const pst={
     ...req.body

    };
   post.findOneAndUpdate({_id: req.params.id},{$set:pst}, {new: true}, (err ) =>{
 if(err){
      res.status(400).json({error: 'Modification ne peut etre sauvegardee'})
 }else{
    res.status(200).json('Modification sauvegardee' )
         }    });
        } ;   