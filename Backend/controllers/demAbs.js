const req = require('express/lib/request');
const Abs = require('../models/demAbs');
const User = require('../models/user');
const moment = require('moment');


exports.createDemAbs = (req, res) => {
    const abs = new Abs({
          ...req.body,
        dateFin: moment(req.body.dateFin,'YYYY-MM-DDT00:00:00').toDate(),
         dateDebut: moment(req.body.dateDebut,'YYYY-MM-DDT00:00:00').toDate(),
          userId: req.user  });
    abs.save()
          .then(() => res.status(201).json({ message: 'request saved !' }))
          .catch(error => res.status(400).json({ error }));
 }

exports.sendJust = (req, res, next) => {
try{
   const file= req.file;

    Abs.findOneAndUpdate(
      { _id: req.params.id },
      {  justification: file.path},
      function (err, docs) {
        if (err) {
          res.status(409).json({ err});
        } else {
          res.status(201).json({ message: 'Objet enregistré !'})
        }
      }
    ); 
}
catch(error){
  res.status(500).send(error.message)
}
};
exports.viewJust =(req, res) => {
  //return res.sendFile(path.join(`${__dirname}/../views/index.html`));
  Abs.findOne({_id:req.params.id},(err,demande)=>{
    if(err){
      return res .status(400) .json({ message: 'demande does not exist' });
    }else{
      return  res.download(demande.justification);
    }
  })
  
};



 exports.checklistDemAbsUser = (req, res,next) => {
  Abs.find({$and: [{"userId" : req.user},{...req.body}]})
  .then(demande => {
     if (!demande) 
     return res.status(409).json({ error: 'No request !' });
     res.status(200).json(demande); })
   .catch(error => res.status(500).json({ error }))
     
}

exports.checklistDemAbs =async   (req, res,next) => {
  
 
  let dem= await  Abs.find({ ...req.body})
    if (dem) { 
  let t= new Array();
      for(let i=0;i<dem.length;i++){
      let user= await User.findById(dem[i].userId)
      if(user){
      let manag= await User.findById(user.managId)
        t[i]={
          Nom: user.Nom,
          Prenom: user.Prenom,
          Date_Debut: dem[i].dateDebut,
          Date_Fin: dem[i].dateFin,
          Justification: dem[i].justification,
          Etat: dem[i].etat,
          Manager: manag.Nom + ' ' + manag.Prenom
           }
           
      }
       
     // Object.assign(dem[i],{nom: user.Nom});  
       } 
       res.status(200).json(t);  
      }else{
        
          return res.status(409).json({ error: 'cette section est vide !' }); }
      
         
 }



exports.checklistDemCgGroup = async (req, res,next) => {
  let t= new Array();
       let users= await  User.find({managId : req.user})
        if (!users) 
        return res.status(401).json({ error: 'Pas de groupe pour ce manager !' });
       for(let i=0; i<users.length; i++){
       let d=await  Abs.find({$and: [{"userId" : users[i]._id},{...req.body}]})
            if (!d) 
            return res.status(401).json({ error: 'Cette section est vide !' });
            t[i]={
              Nom: users[i].Nom,
              Prenom: users[i].Prenom,
              Date_Debut: dem[i].dateDebut,
              Date_Fin: dem[i].dateFin,
              Justification: dem[i].justification,
              Etat: dem[i].etat
            }
            res.status(200).json(t);      
        }
      }

exports.checkoneDemAbs = async  (req, res,next) => {

  let d= await  Abs.findById(req.params.id)
  if( !d){
    res.status(500).json('error')
  }
 let user= await User.findById(d.userId)
 if(  !user){
   res.status(409).json( 'error' )
 }
 let manag= await User.findById(user.managId)

   let dem={
    Nom: user.Nom,
    Prenom: user.Prenom,
    Date_Debut: d.dateDebut,
    Date_Fin: d.dateFin,
    Justification: d.justification,
    Etat: d.etat,
    Manager: manag.Nom + ' ' + manag.Prenom
        
        }
    res.status(200).json(dem);   
}

 
 exports.resDemAbsMan = (req,res)=> {
        Abs.findOneAndUpdate({_id: req.params.id}, {etat: req.body.etat}, (err) =>{
   if(err){
      return res.status(400).json({error})
    }else{
            res.status(200).json('reponse sauvegardee')
            }
        })
       }
     
 