import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStoryContext } from "../../contexts/StoryContext";
import { useUserContext } from "../../contexts/UserContext";
import classes from '../../styles/Profile.module.css';
import Stories from "../Stories";
export default function Profile(){
    
    const [user,setUser] = useState();
    const [stories,setStories] = useState();
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);

    const {getUser} = useUserContext();
    const {getAllStoriesOfAuthor} = useStoryContext();
    const {username} = useParams();
    const navigate = useNavigate();

    console.log('username: '+username)
    
    
    useEffect(()=>{

        async function getUserDetails(){
            try{
                 const userData = await getUser(username);
                 setUser(userData);
                 console.log('userData :' + userData);
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
        getUserDetails();
        
    },[username,navigate,getUser]);

    
    useEffect(()=>{

        async function getAllStoriesSpecifiedByAuthor(){
            try{
                    setLoading(true);
                    const response = await getAllStoriesOfAuthor(user);
                    console.log('Aurhor stories: '+ response);
                    setStories(response);
                    setLoading(false);
               }catch(err){
                    console.error(err);
                    setLoading(false);
                    setError(err.response.data.message);
               }
           }
           getAllStoriesSpecifiedByAuthor();

    },[getAllStoriesOfAuthor,user])
   
    
    
   
    console.log('profile: ' + user);
    return(
        <>
            <div className={classes.profile}>
            {!loading && !error && (
                <div className={classes.profileInformation}> 
                <p> <h3>{user.name}</h3><br/>
                    Email : {user.email}</p>
                </div>
                
                ) 
            }
            </div>
            <div>

            {!loading && !error && user &&(
                <Stories stories = {stories} />
                
                ) 
            }
                 
            </div>
        </>
    )
}