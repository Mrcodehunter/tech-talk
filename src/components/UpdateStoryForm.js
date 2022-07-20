import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoryContext } from '../contexts/StoryContext';
import classes from '../styles/StoryUpdateForm.module.css';
import Button from './Button';
import Form from './Form';

export default function UpdateStoryForm(){

    console.log('story UpdateForm rendered');

    const [story,setStory] = useState();
    const [title,setTitle] = useState();
    const [description, setDescription] = useState();


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const navigate = useNavigate();
    const {updateStory,getStory} = useStoryContext();
    const {id} = useParams();
    console.log(id);

    useEffect(()=>{
        console.log('inside useEffect');
        async function getStoryDetails(){
          try{ 
                const storyDetails = await getStory(id);
                console.log(storyDetails);
                setStory(storyDetails);
                setLoading(false);
          }catch(err){
               console.error(err);
               setLoading(false);
               setError(err.response.data.message);
               if (err.response.status === 404) {
                 navigate('/notfound');
               }
          }
          
      }
      getStoryDetails();
    
      },[getStory,navigate,id])

    async function handleSubmit(e){

        e.preventDefault();
        
        try{
            setError('');
            setLoading(true);
            console.log('call started');
            const response = await updateStory(id,{
                title,
                description
            });
            console.log(response);
            navigate(`/stories/${id}`);
        }catch(err){
          console.log(err);
          setLoading(false);
          setError('Failed to update story');
        }
    }
    console.log(story);
    return(
        <div>
            {!loading && (
            <Form className={`${classes.storyUpdateForm} form`} onSubmit ={handleSubmit}>
                    <p>Title</p>
                    <textarea type = 'text' 
                        fontSize = '50px'
                        required 
                        rows = '3'
                        value = {title} onChange = { (e) => setTitle(e.target.value) } defaultValue={story.title}></textarea>
                    <p>Description</p>
                    <textarea 
                        rows = '9'
                        type = 'text' 
                        required 
                        value = {description} onChange = { (e) => setDescription(e.target.value) } defaultValue={story.description}></textarea> 
                    
                    <Button disabled = {loading} type = 'submit'>Update</Button>
                    {error && <p className='error'>{error}</p>}
            </Form>
            )}
        </div>
    )
}