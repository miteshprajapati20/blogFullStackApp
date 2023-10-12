import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom'

function Privateroute({ children }) {

    const {isLoggedIn } = useContext(AppContext)
    
    if(isLoggedIn){
        return children
    }
    else{
        return <Navigate to='/login'></Navigate>
    }


}

export default Privateroute
