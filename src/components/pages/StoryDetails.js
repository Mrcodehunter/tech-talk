import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from "../../contexts/AuthContext";
import { useStoryContext } from "../../contexts/StoryContext";
import classes from "../../styles/StoryDetails.module.css";
import Button from '../Button';
import Popup from "../Popup";

export default function Story(){

  const [story,setStory] = useState();

  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {getStory,deleteStory} = useStoryContext();
  const {currentUser} = useAuthContext();
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

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

 async function handleDelete(){
    console.log('came to delete') 
    togglePopup();
    try{ 
      await deleteStory(id);
      setStory(null);
      setLoading(false);
      navigate('/');
     }catch(err){
          console.error(err);
          setLoading(false);
          setError(err.response.data.message);
          if (err.response.status === 404) {
            navigate('/notfound');
          }
     }
  }
  function handleEdit(){
    console.log('edit ');

    navigate(`/story/${id}/edit`)

  }

  console.log(story);

    return (
      <>
        <div className={classes.storyDetails}>
          {!loading && !error && story && (
          <>
            <div className={classes.storyDetailsTitle}>
                <h1>{story.title}</h1>
                <ul>
                  <li>
                    Author : <Link to={`/users/${story.author}`} > {story.author} </Link>
                  </li>
                  { story.author === currentUser &&(
                    <li><Button onClick = {handleEdit}> Edit Story </Button></li>
                  )}
                  { story.author === currentUser &&(
                    <li><Button onClick = {togglePopup}> Delete Story </Button></li>
                  )}
                </ul>
            </div>
           <br/><br/>
           {story.description}
           
          </>
        )}
        {isOpen && <Popup
          content={<>
            <b>Want to delete the story?</b>
            <ul>
              <li><Button onClick={togglePopup}>Cancel</Button></li>
              <li><Button onClick={handleDelete}>Yes</Button></li>
            </ul>
          </>}
          handleClose={togglePopup}
        />}
        
     </div>
     </>
    
    )
}