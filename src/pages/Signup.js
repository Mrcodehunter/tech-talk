// import signupImage from '../../assets/images/signup.svg';
// import Illustration from '../Illustration';
// import SignupForm from '../SignupForm';

import signupImage from '../assets/images/signup.svg';
import Illustration from '../components/Illustration';
import SignupForm from '../components/SignupForm';
export default function Signup(){
    return(
        <>
          <h1>Create an account</h1>
          <div className="column">
            <Illustration alt= 'Signup'>{signupImage}</Illustration>
            <SignupForm/>
          </div>
        </>

    );
}