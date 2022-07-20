import axios from 'axios';
<<<<<<< HEAD
import Cookies from 'js-cookie';
=======
>>>>>>> master
import React, { useContext, useEffect, useState } from "react";
const AuthContext = React.createContext();

export function useAuthContext(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){

    console.log('auth context rendered');

<<<<<<< HEAD
    // eslint-disable-next-line no-unused-vars
=======
>>>>>>> master
    const [loading,setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();
    const [token,setToken] = useState(null);

    const api = axios.create({
        baseURL: 'http://localhost:3001/api/v1/',
<<<<<<< HEAD
        withCredentials: true,
=======
>>>>>>> master
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