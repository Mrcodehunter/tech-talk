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

    useEffect(()=>{
        console.log('inside useEffect');
        async function getStoryDetails(){
          try{ 
                const storyDetails = await getStory(id);
                console.log(storyDetails);
                setStory(storyDetails);
                
                setTitle(storyDetails.data.title);
                setDescription(storyDetails.data.body);

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
                body:description
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
                        value = {title} onChange = { (e) => setTitle(e.target.value) } ></textarea>
                    <br/>
                    <p>Description</p>
                    <textarea 
                        type = 'text' 
                        rows = '20'
                        fontSize = '50px'
                        required 
                        value = {description} onChange = { (e) => setDescription(e.target.value) } ></textarea> 
                    <br/>
                    <Button disabled = {loading} type = 'submit'>Update</Button>
                    {error && <p className='error'>{error}</p>}
            </Form>
            )}
        </div>
    )
}
//defaultValue={story.data.title}defaultValue={story.data.body}