const req = require('express/lib/request');
const Cong = require('../models/demCong');
const User = require('../models/user');
const moment = require('moment');




exports.createDemCong = (req, res) => {
        //var n= req.body.dateDebut.toString();
         
        const cong = new Cong({
         ...req.body,
         dateFin: moment(req.body.dateFin,'YYYY-MM-DDT00:00:00').toDate(),
         dateDebut: moment(req.body.dateDebut,'YYYY-MM-DDT00:00:00').toDate(),
          userId: req.user
        });
        cong.save()
          .then(() => res.status(201).json({ message: 'request saved !' }))
          .catch(error => res.status(500).json({ error }));
   //   if(req.body.type==='exceptionnel'){ }
 }

exports.sendCause = (req, res, next) => {
try{
   const file= req.file;

    Cong.findOneAndUpdate(
      { _id: req.params.id },
      {  cause: file.path},
      function (err, docs) {
        if (err) {
          res.status(409).json({ err})
        } else {
          res.status(201).json({ message: 'Objet enregistré !'})
        }
      }
    ); 
}
catch(error){
  res.status(400).send(error.message)
}
};
exports.viewCause =(req, res) => {
  //return res.sendFile(path.join(`${__dirname}/../views/index.html`));
  Cong.findOne({_id:req.params.id},(err,demande)=>{
    if(err){
      return res .status(500) .json({err});
    }else{
      return  res.download(demande.cause);
    }
  })
  
};



 exports.checklistDemCgUser = (req, res,next) => {
    
    Cong.find({$and: [{"userId" : req.user},{...req.body}]})
     .then(demande => {
        if (!demande) 
        return res.status(401).json({ error: 'No request !' });
        res.status(200).json(demande);    })
      .catch(error => res.status(500).json({ error }))

}

exports.checklistDemCg = async (req, res,next) => {
  let t= new Array();
 let dem= await  Cong.find({ ...req.body})
   if (!dem) {
     return res.status(401).json({ error: 'cette section est vide !' }); } 
     for(let i=0;i<dem.length;i++){
     let user= await User.findById(dem[i].userId)
     let manag= await User.findById(user.managId)
       t[i]={
         Nom: user.Nom,
         Prenom: user.Prenom,
         Date_Debut: dem[i].dateDebut,
         Date_Fin: dem[i].dateFin,
         type: dem[i].type,
         Autorisation_Admin: dem[i].autoAdmin,
         Autorisation_Manager: dem[i].autoManag,
         Manager: manag.Nom + ' ' + manag.Prenom } }
          res.status(200).json(t);   }
      
       

exports.checklistDemCgGroup =  async (req, res,next) => {
      let t= new Array();
       let users= await  User.find({managId : req.user})
        if (!users) 
        return res.status(401).json({ error: 'Pas de groupe pour ce manager !' });
       for(let i=0; i<users.length; i++){
       let d=await  Cong.find({$and: [{"userId" : users[i]._id},{...req.body}]})
            if (!d) 
            return res.status(401).json({ error: 'Cette section est vide !' });
            t[i]={
              Nom: users[i].Nom,
              Prenom: users[i].Prenom,
              Date_Debut: d[i].dateDebut,
              Date_Fin: d[i].dateFin,
              type: d[i].type,
              Autorisation_Admin: d[i].autoAdmin,
              Autorisation_Manager: d[i].autoManag,
            }
            res.status(200).json(t);      
        }
      }
exports.checkoneDemCg =async  (req, res,next) => {
 let d= await  Cong.findById(req.params.id)
     if( !d){
       res.status(500).json('error')
     }
    let user= await User.findById(d.userId)
    if(  !user){
      res.status(500).json( 'error' )
    }
    let manag= await User.findById(user.managId)

      let dem={
            Nom: user.Nom,
            Prenom: user.Prenom,
            Date_Debut: d.dateDebut,
            Date_Fin: d.dateFin,
            type: d.type,
            Autorisation_Admin: d.autoAdmin,
            Autorisation_Manager: d.autoManag,
            Manager: manag.Nom + ' ' + manag.Prenom
          }
       res.status(200).json(dem);   
}

 exports.resDemCongAdm = (req,res)=> {
   Cong.findOneAndUpdate({_id: req.params.id}, { ...req.body}, (err) =>{
        if(err){
         return res.status(400).json({error})
        } else {  res.status(200).json('modification sauvegardee')}
    })
 }
 exports.resDemCongMan = (req,res)=> {
        Cong.findOneAndUpdate({_id: req.params.id}, {autoManag: req.body.autoManag}, (err) =>{
   if(err){
      return res.status(400).json({error})
    }else{
           
            res.status(200).json('modification sauvegardee')
            }
        })
       }
     
 