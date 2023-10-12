import { AppContext } from "../context/AppContext"
import { useContext } from "react"
import { Navigate } from "react-router-dom"

const PrivateEdit = ({children}) => {
 
    const {isLoggedIn } = useContext(AppContext)
    
    if(isLoggedIn){
        return children
    }
    else{
        return <Navigate to='/login'></Navigate>
    }

}

export default PrivateEdit
