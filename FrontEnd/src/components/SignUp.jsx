import React, { useState } from 'react'
import Header from './Header'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

  const { login } = useContext(AppContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPasword] = useState('');
  const [email, setEmail] = useState('')
  const navigate = useNavigate();

  async function submitHandler(event) {
    event.preventDefault();
    
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!firstName.match(nameRegex) || !lastName.match(nameRegex)) {
       toast.error('Enter valid name')
      return;
    }
   
    
   
    try {
      const response = await axios.post('/signup', { firstName, lastName, email, password, confirmPassword });
      login(); // Call login function to set the authentication status
      toast.success('Signup successful');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Signup failed');
    }
  }


  return (
    <div className='w-screen flex flex-col'>

      <div>
        <Header />
      </div>


      <div className='m-20 mb-9 text-center justify-center font-bold text-4xl'>
        <h1>SignUp</h1>
      </div>

      <div className=' flex items-center w-11/12 max-w-max mx-auto '>

        <form
          onSubmit={submitHandler}
          className='max-w-[500px] m-auto border-[1px] border-slate-950 rounded-md p-6 bg-slate-200' >


          <label className='font-semibold text-xl m-2 ' >Enter firstName : {" "}
            <input type="text"
              value={firstName}
              required
              onChange={event => setFirstName(event.target.value)}
              className='border-2  border-gray-700 rounded-md p-[0.1rem] text-center'
              placeholder='FirstName' />
          </label>

          <label className='font-semibold text-xl m-2'>Enter lastName : {" "}
            <input type="text"
              value={lastName}
              onChange={event => setLastName(event.target.value)}
              className='border-2 border-gray-700 rounded-md p-[0.1rem] text-center'
              placeholder='LastName' />
          </label>


          <label className='font-semibold text-xl m-2'>Email : {" "}
            <input type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              className='border-2 border-gray-700 rounded-md p-[0.1rem] text-center w-[350px]'
              placeholder='abc@gmail.com' />
          </label>


          <label className='font-semibold text-xl m-2' >Password :{" "}
            <input type="password"
              value={password}
              required
              minLength={6}
              onChange={event => setPassword(event.target.value)}
              className='border-2 border-gray-700 rounded-md p-[0.1rem] text-center w-[310px]'
              placeholder='Password' />
          </label>


          <label className='font-semibold text-xl m-2'>confirm Password :{" "}
            <input type="password"
              value={confirmPassword}
              required
              minLength={6}
              onChange={event => setConfirmPasword(event.target.value)}
              className='border-2 border-gray-700 rounded-md p-[0.1rem] text-center'
              placeholder='Confirm Password' />
          </label>

          <br />

          <button className='font-bold text-[1rem] m-2 p-1 border-[1px] w-[450px]    rounded-md hover:text-white border-gray-800 hover:bg-gray-600'>SignUp</button>

        </form>

      </div>


    </div>
  )
}

export default SignUp


