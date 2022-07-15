/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
const UserContext = React.createContext();

export function useUserContext(){
    return useContext(UserContext);
}

export function UserProvider({children}){

    console.log('User context rendered');

    const [loading,setLoading] = useState(true);
    

    const api = axios.create({
        baseURL: 'http://localhost:3001/api/v1/',
      });

    useEffect(()=>{

       setLoading(false);

    },[])

    const getUser = async(username)=>{

        const user = await api.get(`/users/${username}`);
        return {...user.data.data};
    
    }
    const updateUser = async(username,body)=>{
        const user = await api.put(`/users/${username}`,body);
        return {...user.data.data};
    }

    const deleteUser = async(username,body)=>{
        const user = await api.delete(`/users/${username}`,body);
        return {...user.data.data};
    }

    const value ={
        getUser,
        updateUser,
        deleteUser,
    }

    return(
        <UserContext.Provider value={value}>
          {!loading && children}
        </UserContext.Provider>
    )

}