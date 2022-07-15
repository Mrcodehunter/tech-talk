import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { AuthProvider } from "../../contexts/AuthContext";
import { useUserContext } from "../../contexts/UserContext";
import classes from '../../styles/Profile.module.css';


export default function Profile(){

    // eslint-disable-next-line no-unused-vars
    const [user,setUser] = useState();
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);

    const {getUser} = useUserContext();
    const {username} = useParams();
    const navigate = useNavigate();

    //console.log(username)
    useEffect(()=>{
       async function getUserDetails(){
           try{ const userData = await getUser(username);
            setUser(userData);
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
    },[username,getUser,navigate])

    console.log('profile')
    return(
        <div className={classes.profile}>
           {!loading && !error && (
            <div className={classes.profileInformation}> 
               <p> <h3>{user.name}</h3><br/>
                Email : {user.email}</p>
            </div>
              
              ) 
           }
        </div>
    )
}