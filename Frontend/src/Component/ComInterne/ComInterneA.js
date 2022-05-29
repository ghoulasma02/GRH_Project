import React from 'react';
import axios from 'axios';
import './ComI.css';
function Ajout() {
    return (
        <div className='ajoutCI'> 
         <br />
         &nbsp;<h1>Créer ComInterne :</h1>
            <form onSubmit={(e) => ajt(e)}>
            &nbsp; &nbsp; &nbsp;<label for="da">Date :</label><br />
            &nbsp; &nbsp; &nbsp;<input type="date" id="da" name="da" ></input><br />
                &nbsp; &nbsp; &nbsp;<label for="ti">Titre :</label><br />
                &nbsp; &nbsp; &nbsp;<input type="text" id="ti" name="ti" ></input><br />
               &nbsp; &nbsp; &nbsp;<label for="co">Contenu :</label><br />
               <textarea id="co" name="co"  rows="8" cols="60"  placeholder="Ecrivez votre annonce ici..."></textarea>
               <br /><br />
                &nbsp; &nbsp; &nbsp;<input id='bb' type="submit" value="Ajouter"></input>
            </form>
        </div>






    )

}
    
function ajt(e){
    e.preventDefault();
    let request={
        Titre:document.getElementById('ti').value,
        Date:document.getElementById('da').value,
        Contenu:document.getElementById('co').value
    }
    axios.post('http://localhost:4000/ComInterne',request)
    .then(resp => {
        alert(resp.data.message);
    })
    .catch(err => {
        console.log(err);
    })
}
export default Ajout;
