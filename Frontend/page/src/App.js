
import React from 'react';
import axios from 'axios'


   const Login = ()=>{
     const [form,setForm] = React.useState({email:null,password:null})
    const onSubmit = (event)=>{
      event.preventDefault()
      axios.post('http://localhost:4000' , form ).then(response => console.log(response.data))
    }
    const handleForm = (current)=>(e)=>{
      setForm({...form,[current]:e.target.value})
    }

     return <div>

     <div className='container'>
     <h1 className='co'> Connection </h1>

         <div className='form-div'>

             <form onSubmit={onSubmit}>
               
               <input type='text'  onChange={handleForm('email')} 
               value={form.email} className='form-control '/><br/><br/><br/>
               <input type='text'  onChange={handleForm('password')} 
               value={form.password} className='form-control '/><br/><br/><br/>
               <input type='submit' className='btn' value='Login'/><br/>
             </form>
         </div>
     </div>
</div>
   }



export default Login;
