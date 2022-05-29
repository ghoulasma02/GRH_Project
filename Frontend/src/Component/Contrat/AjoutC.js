import React from 'react';
import axios from 'axios';
import './Contrat.css';
function AjoutC() {
    return (
        <div className='ajoutC'> 
        <br /><br />
        &nbsp;<h1>Créer Contrat :</h1>
            <form onSubmit={(e) => ajt(e)}>
                <label for="nomPost">Mail du l'employé: </label> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    
                <label for="file">Contrat:</label><br /><br />
                <input type="text" id="nomPost" name="nomPost" ></input>
                &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;
                <input type="file" id="file" name="PJ"></input><br />
                <label for="DE">Date Edition:</label><br /><br />
                <input type="date" id="DE" name="DE" ></input><br />
               

                <input  id="cb" type="submit" value="Ajouter le Contrat"></input>
            </form>
        </div>






    )

}
function ajt(e){
    e.preventDefault();
    let request={
        email:document.getElementById('nomPost').value,
        dateEd:document.getElementById('DE').value,
        pj:document.getElementById('file').value,
        
    }

    axios.post('http://localhost:4000/contrat',request)
    .then(resp => {
        alert(resp.data.message);
    })
    .catch(err => {
        console.log(err);
    })
}
export default AjoutC;
