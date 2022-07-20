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

    const api = axios.create({
        baseURL: 'http://localhost:3001/api/v1/',
        withCredentials: true,
      });

    useEffect(()=>{

       setLoading(false);

    },[])

    

    const createStory = async(body)=>{


        const story = await api.post(`/stories`,body);
        return {...story.data.data};
    
    }

    const getAllStories = async()=>{

        const stories = await api.get(`/stories`);
        return {...stories.data};
    
    }

    const getAllStoriesOfAuthor = async(authorName)=>{

        const stories = await api.get(`/${authorName}/stories`);
        console.log(stories + 'getAuthorsStories');
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

 

    const deleteStory = async(id)=>{
        const Story = await api.delete(`/stories/${id}`);
        return {...Story.data.data};
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