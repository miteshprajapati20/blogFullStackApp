import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import Post from './Post'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

const Home = () => {

 const[posts,setPosts] = useState([]) ;

const {isLoggedIn} = useContext(AppContext);

useEffect(() => {
  axios.get('/post')
    .then(res => {
      const postsData = res.data; // Assuming the data is an array of posts
      setPosts(postsData);
      console.log(postsData)
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}, []); 


  return (
    <div className='w-full'>
      
      <Header />

      {
        posts.length > 0 && posts.map(post => (
          <Post {...post}/>
        ))
      }

      {
        posts.length === 0 ? ( isLoggedIn ? <div className='w-11/12 max-w-max mx-auto mt-60 '>

              <h1 className='text-xl font-semibold mb-6'>Go to Create Post Page</h1>
             
         
        </div>  : (  <div  className='w-11/12 max-w-max mx-auto mt-60 text-xl font-semibold mb-6'>

          login to Create new Post

        </div> )  ):(<post />)
         
      }
        
    </div>
  )
}

export default Home





