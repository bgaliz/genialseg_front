import AppRoutes from './routes/routes';
import './App.css';
import { useEffect } from 'react';
import Login from './pages/Login';

function App() {
  const token = localStorage.getItem('token');

  return <div className="App">
    {
      token ? (<AppRoutes />) : (<Login />)
    }
  </div>;
}

export default App;
