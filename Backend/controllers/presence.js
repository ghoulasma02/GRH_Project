const XLSX = require('xlsx')
const presence = require('../models/presence');
const User = require('../models/user');
const moment = require('moment');
const { object } = require('joi');




exports.savePres =  async (req, res, next) => {
  const file=req.file;
  const workbook = XLSX.readFile(file.path);
  const worksheet = workbook.SheetNames;
  const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[worksheet[0]],{header:1, defval: ""})
   tab= new Array(); 
    //for( let i=0; i<worksheet.length; i++){
  for( let i=2; i<xlData.length; i++){  
    //  console.log(xlData);
     //t=xlData.map(obj=>{Object.values(obj)});
  
     
    let j=4; 
    let mn=new Date(xlData[i][3].concat('T',xlData[i][j],':00'));
    let mx=new Date(xlData[i][3].concat('T',xlData[i][j],':00'));
    
    while(((xlData[1][j]==='En service')||(xlData[1][j]==='En repos'))&&(xlData[i][j])&&(j<xlData[i].length)){
      let  d= new Date(xlData[i][3].concat('T',xlData[i][j],':00'));
      mx=Math.max(d.getTime(),mx);
      mn=Math.min(d.getTime(),mn);
      j++; }
        let user = await User.findOne({Nom : xlData[i][1]})
        
      if(!user)
        return res.status(400).json({error});
      
      tab[i-2]={
       enService: new Date(mn),
       enRepos:new Date(mx),
       userId: user._id,
       etat: "Present"
       }
      }
       presence.insertMany(tab)
       .then(() => res.status(201).json({ message: 'presence creee!' }))
       .catch(error => res.status(400).json({ error }))
       
    }
    // }
    
  // })
       
    /*   h1= parseInt(pres.service1);
       h4=parseInt(pres.service2);
       console.log(h1,h4);
         if(h1===Math.max(h1,h4)){
          enservice= jr.concat('T',h11,':00');
         }else{
          enservice= jr.concat('T',h44,':00');
         }
        const user= await  User.findOne({Nom : pres.nom})
          if(!user)
            return res.status(400).json({error});
           const data= new presence({
         enService: new Date(enservice),
       //  enRepos:new Date(enrepos),
         userId: user._id
       })
    const d= await   data.save()
    if(!d){
    return res.status(400).json({error});}
    else{
      res.status(201).json({ message: 'presence creee!' })
    }


    //.then(() => res.status(201).json({ message: 'presence creee!' }))
  //  .catch(error => res.status(400).json({ error }));
  
    })*/



exports.updatePres=(req, res,next) => {
  
  presence.findOneAndUpdate({_id: req.params.id},{...req.body} ,(err ) =>{
    if(err){
         res.status(400).json({error: 'modification ne peut etre sauvegarder'})
    }else{
       res.status(200).json('modification sauvegardee' )  }  });
      }





exports.getPres =async (req, res,next) => {
  let t= new Array();
  let p= await  presence.find({ ...req.body})
    if (!p) {
      return res.status(401).json({ error: 'cette section est vide !' }); } 
      for(let i=0;i<p.length;i++){
      let user= await User.findById(p[i].userId)
      let manag= await User.findById(user.managId)
        t[i]={
          Nom: user.Nom,
          Prenom: user.Prenom,
          En_service: p[i].enService,
          En_repos: p[i].enRepos,
          Manager: manag.Nom + ' ' + manag.Prenom } }
           res.status(200).json(t);   }

 exports.checkAnomaliePres = async (req, res,next) => {

  //let p= await presence.aggregate([{$project:{ enService:{$gt: [{$hour: "$enService"}, '09:01:00']}}}])
  let i=0;
  let t= new Array();
  let tab= await presence.find()
    if (!tab) 
    { return res.status(401).json({ error: 'Cette section est vide !' })}
    //tab.map(async p=>{
    for(let j=0; j<tab.length; j++){
    let hs=new Date(tab[j].enService);
    ms=hs.getMinutes();
    hs=hs.getHours();
    let hr=new Date(tab[j].enRepos);
    rs=hr.getMinutes();
    hr=hr.getHours();
     
     if(((hs>9)||(hs==9 && ms>01 ))||((hr<17)||(hr==17 && rs<30 ))) {
     let user= await User.findById(tab[j].userId)
     if(!user)
     { return res.status(401).json({ error: 'Cette section est vide !' })}
     else{
     t[i]={
       Nom: user.Nom,
       Prenom: user.Prenom,
       En_service: tab[j].enService,
       En_repos: tab[j].enRepos
     }
     i++;
     }
     } 
    }
     res.status(200).json(t)
  
}
 
 
  
  


    

