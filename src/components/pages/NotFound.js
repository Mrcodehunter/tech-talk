import imgNotFound from '../../assets/images/404notFound.png'
import classes from '../../styles/NotFound.module.css'
export default function NotFound(){
    return(
        <div className={classes.notFound}>
            <img className={classes.image} src={imgNotFound} alt="404" />
        </div>
    )
}