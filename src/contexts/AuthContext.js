import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
const AuthContext = React.createContext();

export function useAuthContext(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){

    console.log('auth context rendered');

    const [loading,setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();
    const [token,setToken] = useState(null);

    const api = axios.create({
        baseURL: 'http://localhost:3001/api/v1/',
      });

    useEffect(()=>{

       setLoading(false);

    },[currentUser])

    const signup = async(email,password,username)=>{
        
        const response = await api.post('/signup',{
            email: email,
            password: password,
            name: username
        });
        
      setCurrentUser(
        response.data.data.name
       )
      setToken(
        response.headers.token
      )
      
    }

    const login = async(name,password) =>{
        
        const response = await api.post('/signin',{
            name: name,
            password: password
        });
        
        setCurrentUser(response.data.data.name);
        setToken(
            response.headers.token
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