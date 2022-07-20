import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from "react";
//import { useNavigate } from 'react-router-dom';
const AuthContext = React.createContext();

export function useAuthContext(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){

    console.log('auth context rendered');

    
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [token,setToken] = useState(null);
    
    //const navigate = useNavigate();
    const api = axios.create({
        baseURL: 'http://localhost:3001/api/v1/',
        withCredentials: true,
      });

    useEffect(()=>{

       const verifyToken= async()=>{
        try{
              const response = await api.post('/verify');
              //console.log(response);
              setCurrentUser(response.data.data.name);
              setLoading(false);
        }catch(err){

           console.error(err);
           setLoading(false);
           setError(err.response.data.message);
           console.log(error);
          //  if (err.response.status === 404) {
          //    navigate('/notfound');
          //  }
          //  else {
          //   navigate('/');
          //  }

        }
       }

       
     verifyToken();
    setLoading(false);
    } ,[api,error])

    const signup = async(email,password,username)=>{
        
        const response = await api.post('/signup',{
            email: email,
            password: password,
            name: username
        });

        console.log(response);
        
      setCurrentUser(
        response.data.data.name
       )
      setToken(
        Cookies.get('token')
      )
      
    }

    const login = async(name,password) =>{
        
        const response = await api.post('/signin',{
            name: name,
            password: password
        });
        console.log(response);
        setCurrentUser(response.data.data.name);
        setToken(
            Cookies.get('token')
          )
    }


    const logout = async() =>{ 
        
        await api.post('/logout',{},{
            headers : {
                token
            }
        });
        setCurrentUser(null);
        setToken(null);
    }
    const value ={
        signup,
        login,
        logout,
        token,
        currentUser
    }

    return(
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
    )

}