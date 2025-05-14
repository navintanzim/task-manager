import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import { AppProvider } from '@shopify/polaris';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@shopify/polaris/build/esm/styles.css';
import GuestRoute from './routes/GuestRoute';
import PrivateRoute from './routes/PrivateRoute';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import CreateTask from './pages/Create';
// import EditTask from './pages/Edit';
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const CreateTask = React.lazy(() => import('./pages/Create'));
const EditTask = React.lazy(() => import('./pages/Edit'));



function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/test')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('API error:', error);
        setMessage('Failed to connect to Laravel backend.');
      });
  }, []);

  return (
     <AppProvider>
      <Router>
        <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Routes>
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><CreateTask /></PrivateRoute>} />
          <Route path="/edit/:taskId" element={<PrivateRoute><EditTask /></PrivateRoute>} />
          <Route path="/" element={<Home />} />  
        </Routes>
        </Suspense>
      </Router>
    </AppProvider>
  );
}

export default App;
