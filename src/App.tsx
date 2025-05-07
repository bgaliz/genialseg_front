import './App.css';
import AppRoutes from './routes/routes';
import Login from './pages/Login';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
  const [token, setToken] = useState("");
  
  useEffect(() => {
    const localToken = localStorage.getItem("token")
    if(!localToken && !window.location.href.includes("/login")){
      window.location.href = "/login"
    } else {
      setToken(localToken!)
    }
  }, [])

  return <div className="App">
    <ToastContainer />
    {
      token ? <AppRoutes /> : <Login />
    }
  </div>;
}

export default App;
