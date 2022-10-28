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

    const {getUser,getUserByUsername} = useUserContext();
    const {getAllStoriesOfAuthor} = useStoryContext();
    const {username} = useParams();
    const navigate = useNavigate();

    const [pageNumber,setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [totalPages, setTotalPages] = useState();

    console.log('username: '+username)
    
    
    useEffect(()=>{

        async function getUserDetails(){
            try{
                 const userData = await getUserByUsername(username);
                 setUser(userData);
                 console.log('userData :');
                 console.log( userData);

                 const response = await getAllStoriesOfAuthor(username,pageNumber);
                 console.log('Aurhor stories: ');
                 console.log(response.data);
                 setStories(response.data.data);
                 setPageNumber(response.data.pageNumber);
                 setPageSize(response.data.pageSize);
                 setTotalPages(response.data.totalPages);

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
        
    },[username,pageNumber]);

   

    console.log('profile: ' + user);
    //console.log(stories.data);
    return(
        <div >
            <div className={classes.profile}>
                {!loading && !error && (
                    <div className={classes.profileInformation}> 
                    <p> {user.name}<br/>
                        Email : {user.email}</p>
                    </div>
                    
                    ) 
                }
                </div>
                <div >
                {
                    !loading && !error && (
                        <PaginatedItems itemsPerPage={pageSize} items={stories} totalPages={totalPages} changePageNumber={setPageNumber}/>

                )}
                
            </div>
        </div>
    )
}