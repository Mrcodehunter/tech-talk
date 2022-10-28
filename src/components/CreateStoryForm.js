import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoryContext } from '../contexts/StoryContext';
import classes from '../styles/StoryUpdateForm.module.css';
import Button from './Button';
import Form from './Form';

export default function CreateStoryForm(){

    console.log('story UpdateForm rendered');
    const [title,setTitle] = useState();
    const [description, setDescription] = useState();

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const navigate = useNavigate();
    const {createStory} = useStoryContext();

    async function handleSubmit(e){

        e.preventDefault();
        
        try{
            setError('');
            setLoading(true);
            console.log('call started');
            const response = await createStory({
                title,
                body:description
            });
            console.log(response);
            navigate('/');
        }catch(err){
          console.log(err);
          setLoading(false);
          setError('Failed to post story');
        }


    }
    return(
        <div>
            <Form className={`${classes.storyUpdateForm} form`} onSubmit ={handleSubmit}>
                    <p>Title</p>
                    <textarea type = 'text' 
                        fontSize = '50px'
                        required 
                        rows = '3'
                        value = {title} onChange = { (e) => setTitle(e.target.value) } />
                    <br/>
                    <p>Description</p>
                    <textarea 
                        rows = '20'
                        type = 'text' 
                        required 
                        value = {description} onChange = { (e) => setDescription(e.target.value) } />
                    <br/>
                    <Button disabled = {loading} type = 'submit'>Post</Button>
                    {error && <p className='error'>{error}</p>}
            </Form>
        </div>
    )
}