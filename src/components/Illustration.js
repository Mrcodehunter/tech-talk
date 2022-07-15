
import classes from '../styles/Illustration.module.css'
export default function Illustration({alt,children}){
    return(
        <div className={classes.illustration}>
            <img src={children} alt={alt} />
          </div>
    )
}