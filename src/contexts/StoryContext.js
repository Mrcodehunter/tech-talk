/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
import { useAuthContext } from './AuthContext';
const StoryContext = React.createContext();


export function useStoryContext(){
    return useContext(StoryContext);
}

export function StoryProvider({children}){

    console.log('Story context rendered');

    const [loading,setLoading] = useState(true);
    const {token} = useAuthContext();
    const [pageSize, setPageSize] = useState(3);
    const api = axios.create({
        baseURL: 'https://localhost:7057/api/Blog/',
        withCredentials: true,
      });

    useEffect(()=>{

       setLoading(false);

    },[])

    

    const createStory = async(body)=>{


        const story = await api.post("",body,{
            headers:{
                Authorization : `bearer ${localStorage.getItem('Token')}`
            }
        });
        console.log(story);
        return {...story};
    
    }

    const getAllStories = async(pageNumber)=>{

        const stories = await api.get(`?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return {...stories};
    
    }

    const getAllStoriesOfAuthor = async(username,pageNumber)=>{

        const stories = await api.get(`/author/${username}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        console.log(stories + 'getAuthorsStories');
        return {...stories};
    
    }

    const getStory = async(id)=>{

        const story = await api.get(`/${id}`);
        return {...story};
    
    }
    const updateStory = async(id,body)=>{
        const story = await api.put(`/${id}`,body,{
            headers:{
                Authorization : `bearer ${localStorage.getItem('Token')}`
            }
        });
        return {...story};
    }

 

    const deleteStory = async(id)=>{
        const Story = await api.delete(`/${id}`,{
            headers:{
                Authorization : `bearer ${localStorage.getItem('Token')}`
            }
        });
        return {...Story};
    }

    const value ={
        createStory,
        getAllStories,
        getAllStoriesOfAuthor,
        getStory,
        updateStory,
        deleteStory,
    }

    return(
        <StoryContext.Provider value={value}>
          {!loading && children}
        </StoryContext.Provider>
    )

}