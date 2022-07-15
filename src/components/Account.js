import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import classes from '../styles/Account.module.css';
export default function Account(){
    const {currentUser, logout} = useAuthContext();
    console.log('Account rendered')

    return (
        <div className={classes.account}>
           <Link to='/about'>About</Link>
           <Link to='/' >Home</Link>
        {currentUser? (
          <>
            <span className="material-icons-outlined" title="Account">
            account_circle
            </span>
            <Link to={`/users/${currentUser}`} activeclassname="current">{currentUser}</Link>
            <span className="material-icons-outlined" title="Logout" onClick={logout}> logout </span>
          </>
        ) : (
          <>
            <Link to="/signup">signup</Link>
            <Link to="/login">login</Link>
          </>
        )}
      </div>
    )
    
}