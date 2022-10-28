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
        baseURL: 'https://localhost:7057/api/User',
        withCredentials: true,
      });

    useEffect(()=>{

       setLoading(false);

    },[])

    const getUser = async(id)=>{

        const user = await api.get(`/${id}`);
        console.log('getUSer: '+ {...user.data});
        return {...user.data};
    
    }
    const getUserByUsername = async(username)=>{

        const user = await api.get(`/username/${username}`);
        console.log('getUSer: '+ {...user.data});
        return {...user.data};
    
    }
    const updateUser = async(id,body,)=>{
        const user = await api.put(`/${id}`,body,{
            headers:{
                Authorization : `bearer ${localStorage.getItem('Token')}`
            }
        });
        return {...user.data};
    }

    const deleteUser = async(username,body)=>{
        const user = await api.delete(`/${username}`,body,{
            headers:{
                Authorization : `bearer ${localStorage.getItem('Token')}`
            }
        });
        return {...user.data};
    }

    const value ={
        getUser,
        getUserByUsername,
        updateUser,
        deleteUser,
    }

    return(
        <UserContext.Provider value={value}>
          {!loading && children}
        </UserContext.Provider>
    )

}