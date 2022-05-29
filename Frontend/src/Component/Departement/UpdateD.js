/*import axios from 'axios';
import { useHistory } from 'react-router';
import React, {useState, useEffect} from 'react';
//import {toast}from 'react-toastify';


function update() {
  /*  e.preventDefault();
  
    

    const data = {
        NomD:this.state.NomD,
        RespId:this.state.RespId,
        
    }
    axios.put('http://localhost:4000/dep/${id}', data)
    .then(res => console.log(res.data));
}*/
/*let history = useHistory();

const [fname, setFirstName] = useState('');
const [lname, setLastName] = useState('');

useEffect(() => {
    setFirstName(localStorage.getItem('First Name'));
    setLastName(localStorage.getItem('Last Name'));
    
}, []);
const updateAPIData = () => {
    axios.put('http://localhost:4000/dep/${id}', {
        fname,
        lname
    }).then(() => {
        history.push('/read')
    })
}



    return (
        <div id='demo'> 
            <form onSubmit={(e) => update(e)}>
                <label for="fname">Nom de departement </label>
                <input type="text" value={fname} name="fname" onChange={(e) => setFirstName(e.target.value)}></input>
                <label for="lname">Mail de responsable</label>
                <input type="text" value={lname} name="lname" onChange={(e) => setLastName(e.target.value)}></input>
                <button  type="submit" onClick={updateAPIData}>
                        Update departement
                    </button>
            </form>
        </div>






    )

}*/
import React from 'react';
import axios from 'axios';
import './Lis.css';

function Update() {
    return (
        <div className='ajout'> 
         <br />
         &nbsp;<h1>Update Département :</h1>
            <form onSubmit={(e) => ajt(e)}>
                &nbsp; &nbsp; &nbsp;<label for="fname">Nom du departement :</label><br /><br />
                &nbsp; &nbsp; &nbsp;<input type="text" id="fname" name="fname" ></input><br />
                &nbsp; &nbsp; &nbsp;<label for="lname">Mail de responsable:</label><br /><br />
                &nbsp; &nbsp; &nbsp;<input type="text" id="lname" name="lname" ></input><br />
                &nbsp; &nbsp; &nbsp;<input id='bb' type="submit" value="Update"></input>
            </form>
        </div>






    )

}
function ajt(e){
    e.preventDefault();
    let request={
        NomD:document.getElementById('fname').value,
        email:document.getElementById('lname').value
    }
    axios.put('http://localhost:4000/dep',request)
    .then(resp => {
        alert(resp.data.message);
    })
    .catch(err => {
        console.log(err);
    })
}
export default Update;
