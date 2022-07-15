import { Link } from 'react-router-dom';
import logo from '../assets/images/tech-talk-logo.jpg';
import classes from '../styles/Nav.module.css';
import Account from './Account';
export default function Nav(){
  console.log('Nav rendered')
    return (
        <nav className={classes.nav}>
      <ul>
        <li>
          <Link to='/' className={classes.brand}>
            <img src={logo} alt="Tech Talk" />
            <h3>Tech Talk</h3>
          </Link>
        </li>
      </ul>
      <Account/>
    </nav>
    )
}