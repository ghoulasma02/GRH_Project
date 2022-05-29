const User = require('../models/user');
const bcrypt= require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');



/*exports.signupEmp = (req, res) => {
  User.findOne({ email: req.body.email })
  .then(user=> {
    if (user) {
      return res.status(401).json({ error: 'Utilisateur deja cree!' });
    }
      email=req.body.email;
      resetLink=req.body.resetLink;
         user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
               
    
     const token= jwt.sign(
        { _id: User._id },
        'RANDOM_TOKEN_SECRET_RESETT',
        { expiresIn: '1h' }
      );

      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
          user: 'boutre002@gmail.com',
          pass: 'bout2000'
        }
      });
      const mailOptions={
        from :'boutre002@gmail.com',
        to: req.body.email,
        subject: 'Reset password link',
        text: 'You are receiving this because you (or someone else) have requested to create account in Doctrine GRH with your email.nn' +
        'Please click on the following link'+'http://localhost:3000' +token+
        'If you did not request this, please ignore this email and your password will remain unchanged'};
   
        transporter.sendMail(mailOptions, (err, res) => {
          if(err){
              console.log('une erreur survenue', err)
          }else{
              res.status(200).json('un email est envoye')
          }
      })
      
     

    })
    .catch(error => res.status(400).json({ error }));
  }
*/


   
exports.signupEmp = (req, res) => {
  User.findOne({email: req.body.email }, function (err, userEmail) {
    if (userEmail) {
      return res
        .status(409)
        .json({ message: 'User  exist' });
    }else{
    
     const token= jwt.sign(
        { _id: User._id },
        'RANDOM_TOKEN_SECRET_RESETT',
        { expiresIn: '24h' }
      );

      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
          user: 'boutre002@gmail.com',
          pass: 'bout2000'
        }
      });
      const mailOptions={
        from :'boutre002@gmail.com',
        to: req.body.email,
        subject: 'Reset password link',
        text: token}
    
   
        transporter.sendMail(mailOptions, (err, res) => {
          if(err){
            res.status(500).json({error})
          }else{
              res.status(200).json('un email est envoye')
          }
      })
   
      bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
         
          password: hash,
          resetLink: token,
          ...req.body
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }))
   
    }
  })
}

exports.updateInfoUser = (req,res)=> {
  User.findOneAndUpdate({_id: req.params.id}, {...req.body}, (err) =>{
if(err){
return res.status(400).json({error: 'Modification peut etre effectuee'})
}else{
     
      res.status(200).json('Mdification effectuee')
      }
  })
 }

 exports.updateInfoEmployee = (req,res)=> {
  User.findOneAndUpdate({_id: req.params.id}, {...req.body}, (err) =>{
if(err){
return res.status(400).json({error: 'Modification peut etre effectuee'})
}else{
     
      res.status(200).json('Modification effectuee')
      }
  })
 }

exports.assignManag = (req,res)=> {
  User.findOne({email: req.body.manageremail}, (err,manager) =>{
if(err){
return res.status(500).json({error})
}else{
  if( !manager){
    return res
    .status(409)
    .json({ message: 'manager does not exist' });
  }else{
    User.findOneAndUpdate({_id: req.params.id}, {managId: manager._id}, (err) =>{
      if(err){
         return res.status(400).json({error: 'can not save manager'})
       }else{
              
               res.status(200).json('manager saved')
               }
           })

 }
}
  })
}

exports.listEmployee= async  (req,res,next) => {
  
  let user= await User.find({...req.body},{password:0,role:0,_id:0,createdAt:0,updatedAt:0,__v:0}).populate("managId","Nom Prenom")
  .then(user => {
    if (!user) 
     return res.status(409).json({ error: 'Cette section est vide !' });
    res.status(200).json(user);   })
  .catch(error => res.status(500).json({ error }));   
}



  /*
    let user= await  User.find({...req.body},{password:0,role:0,_id:0,createdAt:0,updatedAt:0,__v:0})
    let t= new Array();
      if (!user){
        return res.status(401).json({ error: 'Cette section est vide!' })}
        else{
        for(let i=0; i<user.length; i++){
        console.log(user[i]);
        let manag= await User.findById(user[i].managId)
         t[i]={
          Nom: user.Nom,
          Prenom: user.Prenom,
          prenomAr: user.prenomAr,
          nomAr: user.nomAr,
          sexe: user.sexe,
          dateNaiss: user.dateNaiss,
          situationFamiliale: user.situationFamiliale,
          adresse: user.adresse,
          trancheAge: user.trancheAge,
          ccp: user.ccp ,
          rib: user.rib,
          numSs:user.numSs,
          numCni: user.numCni,
          mobile: user.mobile,
          enfant: user.enfant,
          nbrEnfant: user.nbrEnfant,
          nomEps: user.nomEps,
          prenomEps: user.prenomEps,
          nomEpsAr: user.nomEps,
          prenomEpsAr: user.prenomEpsAr,
          prenomPere: user.prenomPere,
          nomMere: user.nomMere,
          prenomMere:user.prenomMere ,
          Manager: manag.Nom + ' ' + manag.Prenom
          }
         /* t[i]={
            ...user[i],
            Manager: manag.Nom + ' ' + manag.Prenom
          }
        }
        
      res.status(200).json(t);    
      }*/


exports.checkUser=(req,res)=>{
  User.findOne({_id:req.params.id})
  .then(user => {
    if (!user) 
      return res.status(401).json({ error: 'No user !' });
     res.status(200).json(user);   })
  .catch(error => res.status(500).json({ error })); 
}


exports.checkGroupeUser=(req,res)=>{
  User.find({$and: [{managId : req.user},{...req.body}]})
  .then(user => {
    if (!user) 
     return res.status(401).json({ error: 'No user !' });
    res.status(200).json(user);   })
  .catch(error => res.status(500).json({ error })); 
}

