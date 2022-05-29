const Joi = require("joi");
const conge = require("../models/conge");
const nodemailer = require("nodemailer");

exports.planifierConge = async (req, res) => {
  const schema = Joi.object({
   DateDebut: Joi.date(),
   DateFin: Joi.date(),
   Status:Joi.string()
  });
  let valid = await schema.validateAsync(req.body);
  res.send(valid);

  const RequestConge = new conge({
    DateDebut:req.body.DateDebut,
    DateFin:req.body.DateFin,
    Status: "En cours",
  });


  RequestConge.save()

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
    subject: "Planification de congé annuel " ,
    text:
      " Bonjour a vous, Je vous informe que le Début de congé annuel est bien evidemment le "+ req.body.DateDebut+" jusqu'a le "+ req.body.DateFin+" Bonne Vacances !  "
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log("une erreur survenue", err);
    } else {
      res.status(200).json("un email est bien envoyé");
    }
  });
};

exports.ListerLesPlanificationDeCongéAnnuelPourAdmin = async (req, res) => {
  

  conge.find({}, function (err, docs) {
    if (err){
    console.log(err);
    }
    else{
    res.send(docs);
    }
    });
    };


/*
exports.notifierLesEmployésFinDeCongé = async (req, res) => {
  console.log("la Planification de Congé Annuel est  : ");

  console.log(req.body);

  congé.find({}, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Second function call : ", docs);
    }
  });
  res.send("listing of request");
};*/
