/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
<<<<<<< HEAD
import { useAuthContext } from './AuthContext';
const StoryContext = React.createContext();


=======
const StoryContext = React.createContext();

>>>>>>> master
export function useStoryContext(){
    return useContext(StoryContext);
}

export function StoryProvider({children}){

    console.log('Story context rendered');

    const [loading,setLoading] = useState(true);
<<<<<<< HEAD
    const {token} = useAuthContext();

    const api = axios.create({
        baseURL: 'http://localhost:3001/api/v1/',
        withCredentials: true,
=======
    

    const api = axios.create({
        baseURL: 'http://localhost:3001/api/v1/',
>>>>>>> master
      });

    useEffect(()=>{

       setLoading(false);

    },[])

    const createStory = async(body)=>{

<<<<<<< HEAD
        const story = await api.post(`/stories`,body,{
            headers : {
                token
            }
        });
=======
        const story = await api.post(`/stories`,body);
>>>>>>> master
        return {...story.data.data};
    
    }

    const getAllStories = async()=>{

        const stories = await api.get(`/stories`);
        return {...stories.data};
    
    }

    const getStory = async(id)=>{

        const story = await api.get(`/stories/${id}`);
        return {...story.data.data};
    
    }
    const updateStory = async(id,body)=>{
        const story = await api.put(`/Stories/${id}`,body);
        return {...story.data.data};
    }

    const deleteStory = async(id,body)=>{
        const Story = await api.delete(`/Stories/${id}`,body);
        return {...Story.data.data};
    }

    const value ={
        createStory,
        getAllStories,
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