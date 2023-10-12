import React, { useContext, useState } from 'react'
import Header from './Header'
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';


const Login = () => {

  const { login } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function submitHandler(event) {
    event.preventDefault();
    
    try {
      const response = await axios.post('/login', { email, password });
      login(); // Call login function to set the authentication status
      toast.success('Logging in successfully');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Logging in failed');
    }
  }
  
  return (
    <div className='w-screen flex flex-col'>

      <div>
        <Header />
      </div>

      <div className='m-20 mb-9 text-center font-bold text-4xl'>
        <h1>Login</h1>
      </div>


      <div className=' flex items-center w-11/12 max-w-max mx-auto  '>


        <form 
        onSubmit={submitHandler}
        className='max-w-[450px] m-auto border-[1px] border-slate-950 rounded-md p-6 bg-slate-200' >



          <label className='font-semibold text-xl m-2' >Email : {" "}
            <input 
              type="email"
              required
              value={email}
              onChange={event => setEmail(event.target.value)}
              className='border-2 border-gray-700 rounded-md p-[0.1rem] text-center w-[290px]' 
              placeholder='abc@gmail.com' />
          </label>

          <label className='font-semibold text-xl m-2'> Password :{" "}
            <input
             type="password"
             value={password}
             onChange={event => setPassword(event.target.value)}
             required className='border-2 border-gray-700 rounded-md p-[0.1rem] text-center'
             placeholder='password' />
          </label>
          <br />

          <button className='font-bold text-[1rem] m-2 p-1 border-[1px] w-[400px]    rounded-md hover:text-white border-gray-800 hover:bg-gray-600 '>Login</button>

        </form>

      </div>


    </div>
  )
}

export default Login



