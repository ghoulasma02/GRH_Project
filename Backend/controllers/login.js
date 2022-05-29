const User = require('../models/user');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const _ =require('lodash');
const nodemailer = require('nodemailer');



exports.signin = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              message: 'login succeeded !',
              userId: user._id,
              token: jwt.sign(
                { userId: user._id, role: user.role },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
              
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
  
 exports.forgotPass = (req,res)=> {
    if (!req.body.email) {
      return res
      .status(500)
      .json({ message: 'Email is required' });
      }
   
      User.findOne({ email: req.body.email}, (err, user) => {
      if (err || !user) {
      return res .status(400) .json({ message: 'Email does not exist' });
      }
    })
     
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
      text: token
      }  ;
 
      transporter.sendMail(mailOptions, (err, res) => {
        if(err){
            console.log('une erreur survenue', err)
        }else{
            res.status(200).json('un email est envoye')
        }
    })
      
        User.updateOne({resetLink: token}, (err,success) =>{
           if(err){
              return res.status(400).json({error: 'reset password link error'})
            }else{
                    res.status(200).json('un email est envoye')
                };
            });

      
  };
  
  exports.resetPass=(req,res)=> {
   const {resetLink, newPass,email} = req.body;
   if(resetLink){
    jwt.verify(resetLink,'RANDOM_TOKEN_SECRET_RESETT', (err,decodedData) =>{
     if (err) 
       return res.status(401).json({ error: 'incorrect token or it is expired!' });
   User.findOne({ email }, function (err, user) {
      if (!user) {
        return res
          .status(409)
          .json({ message: 'User does not exist' });
      }
      return bcrypt.hash(newPass, 10, (err, hash) => {
        if (err) {
          return res
            .status(400)
            .json({ message: 'Error hashing password' });
        }
        

        user.updateOne({
          password: hash
        }, function (err) {
         

          if (err) {
            return res
              .status(400)
              .json({ message: 'Password can not reset.' });
          } else {
            return res
              .status(201)
              .json({ message: 'Password reset successfully' });
          }

        });
      });
    });
})}else{
  res.status(200).json('une erreur est survenue')    
}
   }


 /*   if(resetLink){
       jwt.verify(resetLink,'RANDOM_TOKEN_SECRET_RESETT', (err,decodedData) =>{
        if (err) 
          return res.status(401).json({ error: 'incorrect token or it is expired!' });
          
        User.findOne({resetLink}, (err,user)=>{
          if (err || !user) {
            return res .status(400) .json({ error: 'User with this token does not exist' });
            }
        
      /*   const obj={
            password: newPass
          }
        user=_.extend(user,obj);*/

    /*    user.password = hash;
      
        user.save((err) =>{
          if (err) {
            return res
              .status(400)
              .json({ message: 'Password can not reset.' });
          } else {
            return res
              .status(201)
              .json({ message: 'Password reset successfully' });
          }
        })
          
       })
       bcrypt.hash(newPass, 10)
       .then(hash => {
         const user = new User({
           password: hash
         });

         user.save()
         .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
         .catch(error => res.status(400).json({ error }));
     })
      })*/
 
