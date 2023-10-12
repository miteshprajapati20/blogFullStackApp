// AppContextProvider.js
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" || false
  );

  useEffect(() => {
    if (!isLoggedIn) {
      axios.get('/profile').then(({ verify }) => {
        setIsLoggedIn(verify);
        localStorage.setItem("isLoggedIn", verify);
      });
    }
  }, [isLoggedIn]);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
  };

  const logout = () => {
    
    document.cookie = "miteshCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
     setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", false);
  };

  const value = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
}

export default AppContextProvider;





// import axios from "axios";
// import { createContext, useEffect, useState  } from "react";


// export const AppContext = createContext();

// function AppContextProvider({ children }) {
 
// const [isLoggedIn,setIsLoggedIn] = useState(null)

// useEffect(()=>{
//   if(!isLoggedIn){
//     axios.get('/profile').then(({verify}) => {
//       setIsLoggedIn(verify)
//     })
//   }
// },[])

//   const value = {
//    isLoggedIn,
//    setIsLoggedIn,
  
//   }



//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>
// }

// export default AppContextProvider