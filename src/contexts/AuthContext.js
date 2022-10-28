import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
const AuthContext = React.createContext();

export function useAuthContext(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){

    console.log('auth context rendered');


    // eslint-disable-next-line no-unused-vars

    
    const [loading,setLoading] = useState(true);
    const [currentUser , setCurrentUser] = useState();
    const [cookies, setCookies] = useCookies();

    const api = axios.create({
        baseURL: 'https://localhost:7057/api/auth',

        withCredentials: true,
        

      });

    useEffect(()=>{

       const verifyToken= async()=>{
        const response = await api.post('/verify',{},{
            headers:{
                Authorization : `bearer ${localStorage.getItem('Token')}`
            }
        });
        console.log("in verify");
        console.log(response);
        setCurrentUser(response.data.userName);
        setLoading(false);
        //localStorage.setItem('Token',response.data.token);
       }

       
     verifyToken();
    setLoading(false);
    },[api,currentUser])

    const signup = async(name,email,password,username)=>{
        
        const response = await api.post('/signup', {
            Name: name,
            Email: email,
            Password: password,
            UserName: username
        });
        
      setCurrentUser(
        response.data.userName
       )
       localStorage.setItem('Token',response.data.token);
  
    }

    const login = async(name,password) =>{
        
        const response = await api.post('/signin',{
            UserName: name,
            Password: password
        });
        console.log("loged in:")
        console.log(response);
        setCurrentUser(response.data.userName);   
       
        localStorage.setItem('Token',response.data.token);
    }


    const logout = async() =>{ 
        
        console.log("came to logout--")
        await api.post('/logout',{},{
            headers:{
                Authorization : `bearer ${localStorage.getItem('Token')}`
            }});
        localStorage.removeItem("Token");
        setCurrentUser(null);
        console.log("came to logout2--")
       
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