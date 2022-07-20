//import classes from '../../styles/About.module.css';
import classes from '../styles/About.module.css'
export default function About(){
    // eslint-disable-next-line no-unused-vars
    console.log('about rendered')
    return(
        <div className={classes.about}>
            This is about page
        </div>
    )
}