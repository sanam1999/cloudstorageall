

import { useState, createContext } from 'react'
import './App.css'
import Header from './components/Header/header.jsx'
import Footer from './components/Footer/footer.jsx'
import Body from './body';
import {  BrowserRouter as Router } from "react-router-dom"; 






function App() {
   const [user, setUser] = useState(null);
  
  return (
    <>
       <Router> 
       
          <Header user={user} setUser={setUser} />
             <Body user={user}/>
          <Footer />
        
       </Router>
    </>
  )
}

export default App
