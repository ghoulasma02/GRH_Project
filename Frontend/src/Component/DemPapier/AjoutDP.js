import React from 'react';
import axios from 'axios';
function AjoutDemP() {
    return (
        <div className='ajout'> 
            <form onSubmit={(e) => ajt(e)}>
                <label for="nomUser">Nom d'utilisateur </label>
                <input type="text" id="nomUser" name="nomUser" ></input>
                <label for="Nom">Nom du papier</label>
                <input type="text" id="Nom" name="Nom" ></input>
                <label for="Form">Format du papier</label>
                 <select name="Form" id="Form">
                 <option valeur="Electronique">Electronique</option>
                <option valeur="Physiquei">Physique</option>
                 </select>
                
                <input type="submit" value="Envoyer la demande"></input>
            </form>
        </div>






    )

}
function ajt(e){
    e.preventDefault();
    let request={
        email:document.getElementById('nomUser').value,
        Nom:document.getElementById('Nom').value,
        format:document.getElementById('Form').value
        
    }
    axios.post('http://localhost:4000/demP',request)
    .then(resp => {
        alert(resp.data.message);
    })
    .catch(err => {
        console.log(err);
    })
}
export default AjoutDemP;
