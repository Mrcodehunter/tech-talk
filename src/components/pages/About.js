import { useAuthContext } from "../../contexts/AuthContext";
export default function About(){
    // eslint-disable-next-line no-unused-vars
    const {currentUser} = useAuthContext();
    console.log('about rendered')
    return(
        <div>
            This is about page
        </div>
    )
}