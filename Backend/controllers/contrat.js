const req = require('express/lib/request');
const Cont = require('../models/contrat');
const Poste = require('../models/poste');
const moment = require('moment');
const { find } = require('lodash');

const User = require('../models/user');
const post = require('../models/poste');

exports.createContrat =async  (req, res) => {
    let user= await User.findOne({email: req.body.email})
    if (!user) {
      return res
      .status(401)
      .json({ message: 'Cette section est vide' });
      }
    let p= await Poste.findOne({userId: user._id})
    if (!p) {
    return res
    .status(401)
    .json({ message: 'Cette section est vide' });
    }
    const cont = new Cont({
         dateEd: moment(req.body.dateEd,'YYYY-MM-DDT00:00:00').toDate(),
         posteId:p._id
        });
        cont.save()
          .then(() => res.status(201).json({ message: 'Contrat cree !' }))
          .catch(error => res.status(500).json({ error }))
 }

 exports.sendPj = (req, res, next) => {
    try{
       const file=req.file;
        Cont.findOneAndUpdate(
          { _id:req.params.id },
          {  pj:file.path}, 
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
    }};

    exports.viewPj =(req, res) => {
        //return res.sendFile(path.join(`${__dirname}/../views/index.html`));
        Cont.findOne({_id:req.params.id},(err,contrat)=>{
          if(err){
            return res .status(500) .json({err});
          }else{
            return  res.download(contrat.pj);
          }
        })
        
      };

    exports.listCont=  (req,res)=>{
      Cont.find({ ...req.body},{_id:0,createdAt:0,updatedAt:0,__v:0}).populate({path: 'posteId',
       populate:{path: 'userId', select: 'Nom Prenom' },select: 'nomP'
    })
      .then((p)=>{
       if(!p){
         return res.status(401).json({ error: 'cette section est vide !' });
       }
       res.status(200).json(p);
      })
      .catch(error => res.status(500).json({ error }))
      }

      exports.getOneCont=  (req,res)=>{
        Cont.findById(req.params.id,{id:0,createdAt:0,updatedAt:0,__v:0}).populate({path: 'posteId',
         populate:{path: 'userId', select: 'Nom Prenom' },select: 'nomP'
      })
        .then((p)=>{
         if(!p){
           return res.status(401).json({ error: 'cette section est vide !' });
         }
         res.status(200).json(p);
        })
        .catch(error => res.status(500).json({ error }))
        }
      exports.checkContUser = async   (req, res,next) => {
     
      let p = await   post.findOne({'userId': req.user},{createdAt:0,updatedAt:0,__v:0})
      
       if(!p){
         return res.status(401).json({ error: 'cette section est vide !' });
       }
       Cont.findOne({posteId:p._id },{_id:0,createdAt:0,updatedAt:0,__v:0}).populate({path: 'posteId',populate:{path: 'depId', select: 'NomD' },
       populate:{path: 'userId', select: 'Nom Prenom' },select: 'nomP'
    })
      .then((c)=>{
       if(!c){
         return res.status(401).json({ error: 'cette section est vide !' });
       }
       res.status(200).json(c);
      })
      .catch(error => res.status(500).json({ error }))
    
      } 

       exports.editCont = (req,res)=>{
             Cont.findOneAndUpdate({_id: req.params.id},{...req.body} ,(err ) =>{
          if(err){
               res.status(400).json({error: 'modification ne peut etre sauvegardee'})
          }else{
             res.status(200).json('modificaation sauvegarde' )  }  });};  