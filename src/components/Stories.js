/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Story from '../components/Story';
import classes from '../styles/Stories.module.css';
export default function Stories({...props}){

  const [stories,setStories] = useState();
  const [loading,setLoading] = useState(true);
  //console.log(props.stories.data)

  useEffect(()=>{
    setStories(props.stories.data);
    setLoading(false);
  },[props.stories])

    // const story = {
    //     title : "TATA POWER TO INVEST RS 3,000 CRORE IN MEGA SOLAR ...",
    //     description: "Mint Homegrown integrated power company Tata Power...",
    //     author:"s"
    // }
    console.log('stories rendered');
    //console.log(typeof stories);
    
    return(
        <div className={classes.stories}>
           
           {stories && !loading && 
             // eslint-disable-next-line array-callback-return
             stories.map( (story) => {
                //console.log(story);
                return <Story key = {story.id} story ={story}/>
             })
           }
        </div>
    )
}