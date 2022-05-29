import axios from 'axios';
import React from 'react'; 
import './post.css';
import {useEffect,useState} from 'react';
import { useNavigate } from 'react-router';




function Lister() {

  let navigate=useNavigate();
  const routeChange=() => {
    let path=`/AjoutPost`;
    navigate(path);
  };
  let nav=useNavigate();
   const routeChanged=() => {
     let path=`/UpdatePost`;
     nav(path);
   };

 const[data,setDate]=useState([])

 useEffect(() => {
   axios.get('http://localhost:4000/post')
   .then(res => {
       console.log("getting from :::",res.data)
       setDate(res.data)
   })
   .catch(err => {
       console.log(err);
   })
 },[])
 const arr = data.map((data, index) => {
   return(
     <tr>
     
       <td>{data.userId.Nom} {data.userId.Prenom}</td>
       <td>{data.depId.NomD}</td>
       <td>{data.nomP}</td>
       <td>{data.Situation}</td>
       <td>{data.StatusP}</td>
       <td>{data.Salaire}</td>
       <td>{data.DateE}</td>
       <td>{data.DateS}</td>
       <td><button className='bu' onClick={routeChanged}>Update</button></td>
   

      
     </tr>
     
   )
 })
 
 return(
   <React.Fragment>
   <div className='listerP'>  
   <h1>Liste des Postes</h1>
   <button className='btn' onClick={routeChange}>Ajouter Post</button>
   <table>
       <tr>
           <th>Nom du l'employé</th>
           <th>Nom du departement</th>
           <th>Nom du Post</th>
           <th>Situation </th>
           <th>Status</th>
           <th >Salaire</th>
           <th >Date entrée</th>
           <th >Date sortie</th>
           <th >Actions</th>
         
          
       </tr>
       {arr}
   </table>

</div>

 
  </React.Fragment>



    )
    
}
export default Lister;