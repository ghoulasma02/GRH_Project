import React from 'react';
import axios from 'axios';
import './Cong.css';
function Ajout() {
    return (
        <div className='ajoutCg'> 
         <br />
         &nbsp;<h1>Planifier votre Congé annuel  :</h1>
            <form onSubmit={(e) => ajt(e)}>
            &nbsp; &nbsp; &nbsp;<label for="da">Date de debut  :</label><br /><br />
            &nbsp; &nbsp; &nbsp;<input type="date" id="da" name="da" ></input><br />
            &nbsp; &nbsp; &nbsp;<label for="d">Date de fin  :</label><br /><br />
            &nbsp; &nbsp; &nbsp;<input type="date" id="d" name="d" ></input><br /><br />
                &nbsp; &nbsp; &nbsp;<input id='bb' type="submit" value="Ajouter"></input>
            </form>
        </div>






    )

}
    
function ajt(e){
    e.preventDefault();
    let request={
        DateDebut:document.getElementById('da').value,
        DateFin:document.getElementById('d').value
    }
    axios.post('http://localhost:4000/conge',request)
    .then(resp => {
        alert(resp.data.message);
    })
    .catch(err => {
        console.log(err);
    })
}
export default Ajout;
