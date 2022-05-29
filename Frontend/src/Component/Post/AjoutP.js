import React from 'react';
import axios from 'axios';
import './post.css';
import { BsFillRecordFill } from 'react-icons/bs';

function AjoutP() {
    return (
      
        <div className='ajoutP'> 
        <br /><br />
        <h1>Créer Poste :</h1>
            <form onSubmit={(e) => ajt(e)}>
            &nbsp;&nbsp;<label for="Man"><BsFillRecordFill />&nbsp;Mail du l'employé :</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" id="Man" name="Man" ></input>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label for="nomPost"> <BsFillRecordFill />&nbsp;Nom du post :</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" id="nomPost" name="nomPost" ></input> <br />
                &nbsp;&nbsp;<label for="nomDep"><BsFillRecordFill />&nbsp;Nom du département :</label>
                <input type="text" id="nomDep" name="nomDep" ></input>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
                <label for="Sit"><BsFillRecordFill /> &nbsp;Situation du post:</label>
                 <select name="Sit" id="Sit">
                 <option valeur="Intégré">Intégré</option>
                <option valeur="En phase d'essai">En phase d'essai</option>
                 </select><br />
                 &nbsp;&nbsp;<label for="Sal"><BsFillRecordFill />&nbsp;Salaire:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" id="Sal" name="Sal" ></input>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <label for="Sta"><BsFillRecordFill />&nbsp;Status:</label>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <select name="Sta" id="Sta">
                 <option valeur="Actif">Actif</option>
                <option valeur="Non-actif">Non-actif</option>
                 </select><br />
                 &nbsp;&nbsp; <label for="DE"><BsFillRecordFill />&nbsp;Date D'entrée:</label>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="date" id="DE" name="DE" ></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label for="DS"><BsFillRecordFill />&nbsp;Date de sortie:</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="date" id="DS" name="DS" ></input>
           
                <br />
                <input className='su' type="submit" value="Ajouter le  Post"></input>
                <br /> <br />
            </form>
        </div>
      





    )

}
function ajt(e){
    e.preventDefault();
    let request={
        email:document.getElementById('Man').value,
        nomP:document.getElementById('nomPost').value,
        NomD:document.getElementById('nomDep').value,
        Situation:document.getElementById('Sit').value,
        Salaire:document.getElementById('Sal').value,
        StatusP:document.getElementById('Sta').value,
        DateE:document.getElementById('DE').value,
        DateS:document.getElementById('DS').value,
     
      
    }
    axios.post('http://localhost:4000/post',request)
    .then(resp => {
        alert(resp.data.message);
    })
    .catch(err => {
        console.log(err);
    })
}
export default AjoutP;
