const Joi = require("joi");
const ComInterne = require("../models/cominterne");
const nodemailer = require("nodemailer");


exports.ajouterComIn = async (req, res) => {


  const schema = Joi.object({
    Date: Joi.date(),
    Titre: Joi.string(),
    Contenu: Joi.string().required(),
  });
  let valid = await schema.validateAsync(req.body);
  res.send(valid);

  const Com = new ComInterne({
    Date: req.body.Date,
    Titre: req.body.Titre,
    Contenu: req.body.Contenu
  });
 
  Com.save()

    .then(() => res.status(200).json())

    .catch((error) => res.status(400).json());

  var transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 465,
      auth: {
        user: "azougliyacine04@gmail.com",
        pass: "29102001Y*",
      },
      tls: { ciphers: "SSLv3" },
    });
    const mailOptions = {
      from: "azougliyacine04@gmail.com", //un compte RH
      to:"ghoula567@gmail.com", //le compte Email Employe
      subject: req.body.Titre ,
      text:
           req.body.Contenu,
    };
  
    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.log("une erreur survenue", err);
      } else {
        res.status(200).json("un email est bien envoyé");
      }
    });
  };




exports.editcom = (req,res)=>{
    const cm={
     Titre:req.body.Titre,
     Contenu:req.body.Contenu

    };
    ComInterne.findOneAndUpdate({_id: req.params.id},{$set:cm}, {new: true}, (err ) =>{
 if(err){
      res.status(400).json({error: 'can not save response'})
 }else{
    res.status(200).json('reponse sauvegarder' )
         }


         });
        } ;   
exports.listerCom = async (req,res)=>{

    ComInterne.find({}, function (err, docs) {
            if (err){
            console.log(err);
            }
            else{
            res.send(docs);
            }
            });
            }