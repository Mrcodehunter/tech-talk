import { Link } from 'react-router-dom';
import imgStory1 from '../assets/images/tata invest.jpg';
import classes from '../styles//Story.module.css';
export default function Story({...props}){
  console.log('story rendered');
  //console.log(props);
    return (
        
          <div className={classes.story}>
            <Link to={`/stories/${props.story.id}`}>
            <img src={imgStory1} alt="First Story" />
            <span >
              <b>{props.story.title}</b>
              <p>{props.story.description}</p>
            </span>
            </Link>
            <div className={classes.qmeta}>
              <p><Link to={`/users/${props.story.author}`}>{props.story.author}</Link></p>
              {/* <p>Score : Not taken yet</p>*/}
            </div>
          </div>
        
    )
}