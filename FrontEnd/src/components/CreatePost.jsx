import React, { useState } from 'react'
import Header from './Header'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

const CreatePost = () => {

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('')
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  async function createNewPost(event) {

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    event.preventDefault();
    console.log(files)
    const post = await axios.post('/post', data)
    console.log(post);

    if (post.status === 200) {
      setRedirect(true);
    }
  }

  if (redirect) {
    navigate('/')
  }

  return (

    <div className='w-full'>
      <Header />

      <div className=' mt-20 mb-9 text-4xl font-bold w-11/12 max-w-max mx-auto '>
        <h1>Here Create New Post</h1>
      </div>

      <div className=' w-11/12 max-w-max ml-auto '>

        <form
          onSubmit={createNewPost}
          className='flex flex-wrap gap-4 ' >

          <input
            type='text'
            value={title}
            required
            onChange={event => setTitle(event.target.value)}
            className='w-11/12 border-2 rounded-md p-2 border-b-slate-500 border-l-slate-500 border-r-slate-500'
            placeholder='Title' />



          <input
            type='text'
            value={summary}
            required
            onChange={event => setSummary(event.target.value)}
            className='w-11/12 border-2 rounded-md p-2 border-b-slate-500 border-l-slate-500 border-r-slate-500'
            placeholder='Summary' />


          <input
            type="file"
            onChange={event => setFiles(event.target.files)}
            className='w-11/12 border-2 rounded-md p-2 border-b-slate-500 border-l-slate-500 border-r-slate-500'
          />

          <div className='w-11/12 border-2 rounded-md border-l-slate-500 border-b-slate-500 border-r-slate-500 '  >
            <ReactQuill
              value={content}
              required
              onChange={newValue => setContent(newValue)}
              modules={modules}
              formats={formats} />
          </div>

          <button className='w-11/12 p-2  rounded-md font-bold text-[1.1rem] border-[1px]  hover:text-white border-gray-800 hover:bg-gray-600 ' >Create Post</button>

        </form>

      </div>

    </div>
  )
}

export default CreatePost
