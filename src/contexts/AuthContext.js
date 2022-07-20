import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
const AuthContext = React.createContext();

export function useAuthContext(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){

    console.log('auth context rendered');


    // eslint-disable-next-line no-unused-vars

    
    const [loading,setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();

    const api = axios.create({
        baseURL: 'http://localhost:3001/api/v1/',

        withCredentials: true,

      });

    useEffect(()=>{

       const verifyToken= async()=>{
        const response = await api.post('/verify');
        console.log(response);
        setCurrentUser(response.data.data.name);
        setLoading(false);
       }

       
     verifyToken();
    setLoading(false);
    },[api,currentUser])

    const signup = async(email,password,username)=>{
        
        const response = await api.post('/signup',{
            email: email,
            password: password,
            name: username
        });
        
      setCurrentUser(
        response.data.data.name
       )
     
      
    }

    const login = async(name,password) =>{
        
        const response = await api.post('/signin',{
            name: name,
            password: password
        });
        console.log(response);
        setCurrentUser(response.data.data.name);   
    }


    const logout = async() =>{ 
        
        await api.post('/logout');
        setCurrentUser(null);
       
    }
    const value ={
        signup,
        login,
        logout,
        currentUser
    }

    return(
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
    )

}