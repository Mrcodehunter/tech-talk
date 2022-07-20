// import loginImage from '../../assets/images/login.svg';
// import Illustration from '../Illustration';
// import LoginForm from '../LoginForm';
import loginImage from '../assets/images/login.svg';
import Illustration from '../components/Illustration';
import LoginForm from '../components/LoginForm';
export default function Login(){
    return(
        <>
          <h1>Login to your account</h1>
          <div className="column">
          <Illustration alt= 'Login'>{loginImage}</Illustration>
          <LoginForm/>
          </div>
        </>

    );
}