import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import classes from '../styles/LoginForm.module.css';
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";



export default function LoginForm(){
    
    const [username,setUSername] = useState('');
    const [password,setPassword] = useState('');
   
    const [error,setError] = useState();
    const [loading,setLoading] = useState();

    const {login} = useAuthContext();
    const navigate = useNavigate();
    
    async function handleSubmit(e){
        e.preventDefault();
        
        try{
            setError('');
            setLoading(true);
            await login(username,password);
            navigate('/');
        }catch(err){
          console.log(err);
          setLoading(false);
          setError('Failed to login');
        }

    }

    
    return(
        <Form className={`${classes.loginForm} form`} onSubmit={handleSubmit} >
            
            <TextInput type='text'
               placeholder='Enter name'
               icon = 'person' 
               required 
               value = {username} onChange = { (e) => setUSername(e.target.value) } />
             <TextInput type='password'
               placeholder='Enter password'
               icon = 'lock' 
               required 
               value = {password} onChange = { (e) => setPassword(e.target.value) }/>
             
             <Button disabled = {loading} type = 'submit'>Submit Now</Button>
             {error && <p className='error'>{error}</p>}

             <div className='info' > Don't have an account? <Link to="/signup"> Signup </Link> instead. </div>
        </Form>
    )
}