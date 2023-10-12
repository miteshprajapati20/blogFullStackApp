import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import CreatePost from './components/CreatePost'
import Privateroute from './components/Privateroute'
import PrivateForLogin from './components/PrivateForLogin'
import axios from 'axios'
import PostId from './components/PostId'
import EditPost from './components/EditPost'
import PrivateEdit from './components/PrivateEdit'


axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true ;

const App = () => {

  return (
    <div className='w-full flex '>

      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/login' element={
          <PrivateForLogin>
            <Login />
          </PrivateForLogin>
        } />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/createpost' element={
          <Privateroute >
            <CreatePost />
          </Privateroute>
        } />
      <Route path='/post/:id' element={<PostId/>}/>
      <Route path='/edit/:id' element={
    <PrivateEdit>
      <EditPost/>
    </PrivateEdit>
      }/>

      </Routes>


    </div>
  )
}

export default App
