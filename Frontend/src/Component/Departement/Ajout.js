import React from 'react';
import axios from 'axios';
import './Lis.css';

function Ajout() {
    return (
        <div className='ajout'> 
         <br />
         &nbsp;<h1>Créer Département :</h1>
            <form onSubmit={(e) => ajt(e)}>
                &nbsp; &nbsp; &nbsp;<label for="fname">Nom du departement :</label><br /><br />
                &nbsp; &nbsp; &nbsp;<input type="text" id="fname" name="fname"></input><br />
                &nbsp; &nbsp; &nbsp;<label for="lname">Mail de responsable:</label><br /><br />
                &nbsp; &nbsp; &nbsp;<input type="text" id="lname" name="lname" ></input><br />
                &nbsp; &nbsp; &nbsp;<input id='bb' type="submit" value="Ajouter"></input>
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
    axios.post('http://localhost:4000/dep',request)
    .then(resp => {
        alert(resp.data.message);
    })
    .catch(err => {
        console.log(err);
    })
}
export default Ajout;
