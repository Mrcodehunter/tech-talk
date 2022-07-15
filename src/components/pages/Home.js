import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoryContext } from '../../contexts/StoryContext.js';
import Stories from '../Stories.js';
export default function Home(){
    const {getAllStories} = useStoryContext();
    const [stories, setStories] = useState();
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState();
    const navigate = useNavigate();
    console.log("Home rendered");
    useEffect(()=>{
        const getStories = async()=>{

            try{
                const response = await getAllStories();
                //console.log(response);
                setStories(response);
                setLoading(false);
            }catch(err){
                console.error(err);
                setLoading(false);
                setError(err.response.data.message);
                if (err.response.status === 404) {
                  navigate('/notfound');
                }

            }

        }
        getStories();
    },[getAllStories,navigate])
    //console.log(stories);
    return (
       <div>
         {
            !loading && !error && (
            <Stories stories = {stories} />

        )}
        
       </div>
    )
}

/*
auth context rendered
auth context rendered
layout rendered
Nav rendered
Account rendered
Home rendered
*/

/*
auth context rendered
auth context rendered
layout rendered
Nav rendered
Account rendered
*/

/*
auth context rendered
auth context rendered
layout rendered
Nav rendered
Account rendered
auth context rendered
Account rendered
Home rendered
auth context rendered
*/

/*
auth context rendered
auth context rendered
layout rendered
Nav rendered
Account rendered
Home rendered
*/