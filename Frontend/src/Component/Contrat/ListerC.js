import axios from 'axios';
import React from 'react'; 
import {useEffect,useState} from 'react';
import { useNavigate } from 'react-router';





function Lister() {

  let navigate=useNavigate();
   const routeChange=() => {
     let path=`/AjoutCont`;
     navigate(path);
   };

 const[data,setDate]=useState([])

 useEffect(() => {
   axios.get('http://localhost:4000/contrat')
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
       <td>{data.posteId.userId.Nom} {data.posteId.userId.Prenom}</td>
       <td>{data.posteId.nomP}</td>
       <td>{data.dateEd}</td>
      <td></td>
     <td><button>Update</button></td>
   

      
     </tr>
     
   )
 })
 
 return(
   <React.Fragment>
   <div className='listerC'>  
   <h1>Liste des Contrats</h1>
   <button className='btn' onClick={routeChange}>Ajouter Contrat</button>
   <table>
       <tr>
          <th>Nom du l'employé</th>
           <th>Nom du post</th>
           <th>date de creation</th>
           
           <th> Piece jointe</th>
           <th>Actions</th>
         
          
       </tr>
       {arr}
   </table>

</div>

 
  </React.Fragment>



    )
    
}
export default Lister;