import React from 'react'
import { NavLink } from 'react-router-dom'
import 'date-fns'
import { format } from 'date-fns'

const Post = ({ _id,title, summary, cover, content, createdAt,info }) => {

 
  return (
    <div className='w-10/11 max-w-max mx-auto flex justify-center  mt-9'>

      <div className=' w-full items-center  flex flex-wrap p-14 gap-9 '>

        <div className=' max-w-[300px] ' >
          <NavLink to={`post/${_id}`}>
            <img
             className='rounded-md shadow-xl shadow-gray-700'
             src={`http://localhost:5000/${cover}`} alt={` ${cover}`} />
          </NavLink>

        </div>

        <div className="w-[450px]  overflow-hidden">
          <NavLink to={`post/${_id}`}>
            <h1 className='font-semibold text-5xl text-amber-500 '>{title}</h1>
          </NavLink>

          {/* <h1 className='font-extrabold text-2xl mt-[0.3rem]'>Was FTX an empire ‘built on lies’ or a startup that ‘grew too quickly’?</h1> */}
          <p className='mt-[.3rem] text-gray-800 text-xl'>{summary}</p>
          <p className='mt-[0.3rem] text-gray-500 font-semibold'>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</p>

          <div 
          className='text-[1.1rem] font-medium'
           dangerouslySetInnerHTML={{ __html: `${content.substring(0, 200)}..` }} />


        </div>


      </div>

    </div>
  )
}

export default Post
