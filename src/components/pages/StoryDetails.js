import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStoryContext } from "../../contexts/StoryContext";
import classes from "../../styles/StoryDetails.module.css";

export default function Story(){

  const [story,setStory] = useState();

  const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);

    const {getStory} = useStoryContext();
    const {id} = useParams();
    const navigate = useNavigate();

  useEffect(()=>{
    async function getStoryDetails(){
      try{ const storyDetails = await getStory(id);
       setStory(storyDetails);
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
  getStoryDetails();

  },[getStory,navigate,id])

    return (
        <div className={classes.storyDetails}>
          {!loading && !error && (
          <>
            <div className={classes.storyDetailsTitle}>
                <h1>{story.title}</h1>
                <ul>
                  <li>
                    Author : <Link to={`/users/${story.author}`} > {story.author} </Link>
                  </li>
                </ul>
            </div>
           <br/><br/>
           <p>{story.description}</p>
          </>
        )}
     </div>
    )
}