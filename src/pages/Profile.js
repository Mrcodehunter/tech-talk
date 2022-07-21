/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useStoryContext } from "../../contexts/StoryContext";
// import { useUserContext } from "../../contexts/UserContext";
// import classes from '../../styles/Profile.module.css';
// import Stories from "../Stories";

import PaginatedItems from '../components/PaginatedItems';
import { useStoryContext } from "../contexts/StoryContext";
import { useUserContext } from "../contexts/UserContext";
//import classesPagination from '../styles/Pagination.module.css';
import classes from '../styles/Profile.module.css';



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

                 const response = await getAllStoriesOfAuthor(username);
                 console.log('Aurhor stories: '+ response.data);
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
        getUserDetails();
        
    },[username]);

    

    console.log('profile: ' + user);
    //console.log(stories.data);
    return(
        <div >
            <div className={classes.profile}>
                {!loading && !error && (
                    <div className={classes.profileInformation}> 
                    <p> <h3>{user.name}</h3><br/>
                        Email : {user.email}</p>
                    </div>
                    
                    ) 
                }
                </div>
                <div >
                {
                    !loading && !error && (
                    <PaginatedItems itemsPerPage={8} items={stories} />

                )}
                
            </div>
        </div>
    )
}