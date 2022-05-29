import axios from 'axios';
import React from 'react'; 
import './Lis.css';
import {useEffect,useState} from 'react';
import { useNavigate } from 'react-router';
import {useParams} from 'react-router-dom'





function Lister() {


 let navigate=useNavigate();
   const routeChange=() => {
     let path=`/AjoutDep`;
     navigate(path);
   };
   let nav=useNavigate();
   const routeChanged=(_id) => {
     let path=`/UpdateDep/${_id}`;
     nav(path);
   };
  
 const[data,setDate]=useState([])

 useEffect(() => {
   axios.get('http://localhost:4000/dep')
   .then(res => {
       console.log("getting from :::",res.data)
       setDate(res.data)
   })
   .catch(err => {
       console.log(err);
   })
 },[])
 const arr = data.map((d) => {
   return(
     <tr>
       <td>{d.NomD}</td>
       <td>{d.RespId.Nom} {d.RespId.Prenom}</td>
       <td><button className='bu' onClick={()=>routeChanged(d._id)}>Update</button></td>
   

      
     </tr>
     
   )
 })
 
 return(
   <React.Fragment>
   <div className='lister'>  
   <h1>Liste des départements</h1>
   <button className='btn' onClick={routeChange}>Ajouter département</button>
   <table>
       <tr>
           <th>Nom de departement</th>
           <th>Nom de responsable</th>
           <th>Actions</th>
         
          
       </tr>
       {arr}
   </table>

</div>

 
  </React.Fragment>



    )
    
}
export default Lister;
