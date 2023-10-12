import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom';

const PrivateForLogin = ({children}) => {

  const{isLoggedIn} = useContext(AppContext);
    console.log(isLoggedIn)
  if(!isLoggedIn){
    return children
}
else{
    return <Navigate to='/'></Navigate>
}

  
}

export default PrivateForLogin
