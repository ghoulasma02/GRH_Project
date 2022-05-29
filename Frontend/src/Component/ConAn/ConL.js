import axios from 'axios';
import React from 'react'; 
import {useEffect,useState} from 'react';
import { useNavigate } from 'react-router';
import './Cong.css';





function Lister() {


 let navigate=useNavigate();
   const routeChange=() => {
     let path=`/AjoutCong`;
     navigate(path);
   };
   let nav=useNavigate();
   const routeChanged=() => {
     let path=`/UpdateCong`;
     nav(path);
   };
  
 const[data,setDate]=useState([])

 useEffect(() => {
   axios.get('http://localhost:4000/conge')
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
       <td>{data.DateDebut}</td>
       <td>{data.DateFin}</td>
       <td>{data.Status}</td>
       <td><button className='bu' onClick={routeChanged}>Update</button></td>
   

      
     </tr>
     
   )
 })
 
 return(
   <React.Fragment>
   <div className='listerCg'>  
   <h1>Liste des Congés Annuels</h1>
   <button className='btn' onClick={routeChange}>Ajouter Congé Annuel</button>
   <table>
       <tr>
           <th>Date de Debut </th>
           <th>Date de Fin </th>
           <th>Status</th>
           <th>Actions</th>
         
          
       </tr>
       {arr}
   </table>

</div>

 
  </React.Fragment>



    )
    
}
export default Lister;
