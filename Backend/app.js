const express = require('express');
const app = express();
var cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const loginRoutes = require('./routes/login');
const registerEmpRoutes = require('./routes/registerEmp');
const demConRoutes = require('./routes/demCong');
const demPapRoutes = require('./routes/demPapier');
const demAbsRoutes = require('./routes/demAbs');
const presenceRoutes = require('./routes/presence');
const depRoutes = require('./routes/departement');
const posteRoutes = require('./routes/poste');
const contratRoutes = require('./routes/contrat');
const ComInterneRoutes = require("./routes/ComInterne");
const congeRoutes=require('./routes/conge')

mongoose.connect('mongodb+srv://bout:bout@cluster0.l5dg8.mongodb.net/Doctrine?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  app.use(cors())
 app.use(express.json());
//app.use('/', loginRoutes);
 //app.use('/', resetRoutes);
//app.use('/', registerEmpRoutes);
//app.use('/resetPass', loginRoutes);
//app.use('/',demConRoutes);
//app.use('/',demAbsRoutes);
//app.use('/',presenceRoutes);
app.use('/demP',demPapRoutes);
app.use('/dep',depRoutes);
app.use('/post',posteRoutes);
app.use('/contrat',contratRoutes);
app.use('/conge', congeRoutes); 
app.use("/ComInterne", ComInterneRoutes);


app.use('/fichier', express.static(path.join(__dirname, 'fichier')));
 

  module.exports = app;

  
  
  
 
 
  
  



