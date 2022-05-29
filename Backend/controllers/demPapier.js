const req = require('express/lib/request');
const Papier = require('../models/demPapier');
const User = require('../models/user');





exports.createDemPap = (req, res) => {
         
        const p = new Papier({
         ...req.body,
          userId: req.user
        });
        p.save()
          .then(() => res.status(201).json({ message: 'request saved !' }))
          .catch(error => res.status(500).json({ error }));
    }

    exports.checklistDemPapUser = (req, res,next) => {
    
        Papier.find({$and: [{"userId" : req.user},{...req.body}]})
         .then(demande => {
            if (!demande) 
            return res.status(401).json({ error: 'No request !' });
            res.status(200).json(demande);    })
          .catch(error => res.status(500).json({ error }))
    
    }



    exports.listDemPapier = async (req,res)=>{
        

      let t= new Array();
      let dem= await  Papier.find({ ...req.body})
        if (!dem) {
          return res.status(401).json({ error: 'cette section est vide !' }); } 
          for(let i=0;i<dem.length;i++){
          let user= await User.findById(dem[i].userId)
        
            t[i]={
                Nom: user.Nom,
               Prenom: user.Prenom,
                Nom_Papier: d.Nom,
                etat_demande: d.etatD,
                format: d.format,
                
              }
        
           } res.status(200).json(t);   
     }
           
            

      exports.checkoneDemPap = async  (req, res,next) => {
        let d= await  Papier.findById(req.params.id)
            if( !d){
              res.status(500).json('error')
            }
           let user= await User.findById(d.userId)
           if(  !user){
             res.status(500).json( 'error' )
           }
          
       
             let dem={
                   Nom: user.Nom,
                   Prenom: user.Prenom,
                   Nom_Papier: d.Nom,
                   etat_demande: d.etatD,
                   format: d.format,
                   
                 }
              res.status(200).json(dem);   
       }

      exports.resDemPapier = (req,res)=> {
        Papier.findOneAndUpdate({_id: req.params.id}, {etatD: req.body.etatD}, (err) =>{
   if(err){
      return res.status(400).json({error})
    }else{
           
            res.status(200).json('modification sauvegardee')
            }
        })
       }

       