import axios from 'axios';
import React from 'react'; 
import {useEffect,useState} from 'react';
import { useNavigate } from 'react-router';





function Lister() {


 let navigate=useNavigate();
   const routeChange=() => {
     let path=`/AjoutComI`;
     navigate(path);
   };
   let nav=useNavigate();
   const routeChanged=() => {
     let path=`/UpdateComI`;
     nav(path);
   };
  
 const[data,setDate]=useState([])

 useEffect(() => {
   axios.get('http://localhost:4000/ComInterne')
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
       <td>{data.Titre}</td>
       <td>{data.Contenu}</td>
       <td>{data.Date}</td>
       <td><button className='bu' onClick={routeChanged}>Update</button></td>
   

      
     </tr>
     
   )
 })
 
 return(
   <React.Fragment>
   <div className='listerCI'>  
   <h1>Liste des COmInternes</h1>
   <button className='btn' onClick={routeChange}>Ajouter ComInterne</button>
   <table>
       <tr>
           <th>Titre </th>
           <th>Contenu</th>
           <th>Date</th>
           <th>Actions</th>
         
          
       </tr>
       {arr}
   </table>

</div>

 
  </React.Fragment>



    )
    
}
export default Lister;
