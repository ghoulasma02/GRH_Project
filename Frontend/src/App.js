/*import React from 'react';
import axios from 'axios'


   const Login = ()=>{
     const [form,setForm] = React.useState({NomD:null,RespId:null})
    const onSubmit = (event)=>{
      event.preventDefault()
      axios.post('http://localhost:4000/dep' , form )
      .then(response => console.log(response.data))
      .catch(error=>console.error(error))
    }
    const handleForm = (current)=>(e)=>{
      setForm({...form,[current]:e.target.value})
    }

     return <div>

     <div className='container'>
     <h1 className='co'> Connection </h1>

         <div className='form-div'>

             <form onSubmit={onSubmit}>
               
               <input type='text'  onChange={handleForm('NomD')} 
               value={form.NomD} className='form-control '/><br/><br/><br/>
               <input type='text'  onChange={handleForm('RespId')} 
               value={form.RespId} className='form-control '/><br/><br/><br/>
               <input type='submit' className='btn' value='Ajouter'/><br/>
             </form>
         </div>
     </div>
</div>
   }



export default Login;
*/
/*
import axios from "axios"
import React, { useState } from "react"
import "./App.css"

function App() {


	const [ NomD, setNomD ] = useState("")
	const [ RespId, setRespId ] = useState("")

/*	useEffect(() => {
		axios.get("http://localhost:4000/home").then(function(response) {
			setHome(response.data)
		})
	}, [])

	const postData = (e) => {
		e.preventDefault()
	 axios.post("http://localhost:4000/", {
				NomD,
        RespId
			}).then(res => console.log('posting data',res)).catch(err => console.log(err)) 
	}

	return (
		<div className="App">
			<form>
				<input type="text" value={NomD} onChange={(e) => setNomD(e.target.value)} />
        <input type="text" value={RespId} onChange={(e) => setRespId(e.target.value)} />
				<button onClick={postData}>Send</button>
			</form>
		</div>
	)
}

export default App*/
import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
import AjoutP from './Component/Post/AjoutP';
import ListerP from './Component/Post/ListerP';
import UpdateP from './Component/Post/UpdateP';
import ListerD from './Component/Departement/Lister';
import AjoutD from './Component/Departement/Ajout';
import UpdateD from './Component/Departement/UpdateD';
import AjoutCI from './Component/ComInterne/ComInterneA';
import ListerCI from './Component/ComInterne/ComInterneL';
import UpdateCI from './Component/ComInterne/ComInterneU';
import AjoutC from './Component/Contrat/AjoutC';
import ListerC from './Component/Contrat/ListerC';
import UpdateC from './Component/Contrat/UpdateC';
import AjoutCA from './Component/ConAn/ConA';
import ListerCA from './Component/ConAn/ConL';
import UpdateCA from './Component/ConAn/ConU';


function App(){
  
    return (
      <div>
        <Router>
      <div className="body">
        <Routes>
          <Route path="/ListDep" element={<ListerD />} />
          <Route path="/AjoutDep" element={<AjoutD />} />
          <Route path="/UpdateDep" element={<UpdateD />} />
          <Route path="ListPost" element={<ListerP />} />
          <Route path="AjoutPost" element={<AjoutP />} />
          <Route path="UpdatePost" element={<UpdateP />} />
          <Route path="ListCont" element={<ListerC />} />
          <Route path="AjoutCont" element={<AjoutC />} />
          <Route path="UpdateCont" element={<UpdateC />} />
          <Route path="ListComI" element={<ListerCI />} />
          <Route path="AjoutComI" element={<AjoutCI />} />
          <Route path="UpdateComI" element={<UpdateCI />} />
          <Route path="ListCong" element={<ListerCA />} />
          <Route path="AjoutCong" element={<AjoutCA />} />
          <Route path="UpdateCong" element={<UpdateCA />} />
        </Routes>
      </div>
    </Router>
      
      </div>
      )

}


export default App;
