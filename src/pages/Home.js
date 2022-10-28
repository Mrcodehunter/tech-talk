import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useStoryContext } from '../../contexts/StoryContext.js';
import { useStoryContext } from '../contexts/StoryContext.js';
//import Stories from '../Stories.js';
//import Stories from '../components/Stories.js';
import PaginatedItems from '../components/PaginatedItems.js';
export default function Home(){
    const {getAllStories} = useStoryContext();
    const [stories, setStories] = useState();
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState();
    const [pageNumber,setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [totalPages, setTotalPages] = useState();


    const navigate = useNavigate();
    console.log("Home rendered");
    useEffect(()=>{
        const getStories = async()=>{

            try{
                const response = await getAllStories(pageNumber);
                console.log(response.data);
                console.log("response--")

                setStories(response.data.data);
                setPageNumber(response.data.pageNumber);
                setPageSize(response.data.pageSize);
                setTotalPages(response.data.totalPages);

                setLoading(false);
            }catch(err){
                console.error(err);
                setLoading(false);
                setError(err.response.data);
                if (err.response.status === 404) {
                  navigate('/notfound');
                }

            }

        }
        getStories();
    },[getAllStories,navigate,pageNumber])

   
    //console.log(stories);
    return (
       <div>
         {
            !loading && !error && (
               <PaginatedItems itemsPerPage={pageSize} items={stories} totalPages={totalPages} changePageNumber={setPageNumber}/>
           // <Stories stories = {stories} />

        )}
        
       </div>
    )
}

