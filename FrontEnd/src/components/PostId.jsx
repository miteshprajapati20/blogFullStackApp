import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { AppContext } from '../context/AppContext';

const PostId = () => {
  const nevigate = useNavigate();
  const [postInfo, setPostInfo] = useState(null);
  const [email ,setEmail] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();
  const { isLoggedIn } = useContext(AppContext);
  console.log("p", postInfo);

  useEffect(() => {
    axios.get(`/post/${id}`)
      .then((res) => {
        setPostInfo(res.data.post); // Use res.data to access the JSON data
        setEmail(res.data.info.email);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });
  }, [id]); // Make sure to include id in the dependency array to trigger the effect when it changes

  if (!postInfo) {
    return( <div className='w-11/12 max-w-max mx-auto mt-60 '>
      <h1 className='text-center text-xl font-semibold'>Could you share the login detalis for this app?</h1>
      <NavLink
      className='text-center  font-semibold text-xl '
       to='/login'> Login here</NavLink>
      <br />
      <NavLink 
      className='text-center font-semibold text-xl'
      to='/signup'>Or create new account?</NavLink>
    </div>);
  }

  async function deleteHandler(){
    try{
    const res =  await axios.delete(`/delete/${id}`  )
    setRedirect(true);
    nevigate('/')
    }
     catch(err){
      console.log(err)
     }
  }

  return (
    <div className='w-screen flex flex-col mb-7 '>

      <div>
        <Header />
      </div>

      <div className=" items-center flex flex-col  mt-24 w-11/12 max-w-max mx-auto  ">
        <div>
          <h1 className='text-4xl font-bold text-yellow-950 mb-7 text-center'>{`${postInfo.title}`}</h1>
          <p className='text-xl font-bold text-slate-900 mb-7 text-center'>Author : {`${email}`}</p>
          <p className='text-lg text-center  font-medium mb-3 '>Created At :  <span className='mt-[0.3rem] text-gray-500 font-semibold'>{`${format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}`}</span></p>
       
         

          <img
            className='border shadow-xl shadow-gray-800 rounded-2xl w-96 mb-10'
            src={`http://localhost:5000/${postInfo.cover}`}
            alt={`${postInfo.title}`} />
        </div>
        {
          isLoggedIn.id === postInfo.id && (
            <div className=' mt-4 text-lg mb-10 flex font-bold gap-5'>

              <NavLink 
              to={`/edit/${postInfo._id}`}
              className='p-2 text-[1.3rem] border-[1px]  rounded-md bg-slate-800 text-white hover:text-white border-gray-900 hover:bg-gray-900'>
                Edit this Post
                </NavLink>

              <NavLink 
              // to={`/edit/${postInfo._id}`}
              onClick={deleteHandler}
              className='p-2 text-[1.3rem] border-[1px]  rounded-md bg-red-700 text-white hover:text-white border-gray-900 hover:bg-red-900'>
                 Delete this Post
                </NavLink>
                </div>
          )
        }
        <div className='postInfo text-lg font-serif' dangerouslySetInnerHTML={{ __html: postInfo.content }} />



      </div>
    </div>
  );
};

export default PostId;
