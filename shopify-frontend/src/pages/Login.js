import { useState } from 'react';
import { Page, TextField, Button, Card, Layout, Text } from '@shopify/polaris';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const successMessage = location.state?.success;
  const navigate = useNavigate();

  const handleSubmit = async () => {

     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        setError('Please enter a valid email address.');
        return;
      }

      if (!password) {
        setError('Password is required.');
        return;
      }

  try {
    // Get CSRF cookie 
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    });

    const csrfToken = Cookies.get('XSRF-TOKEN');
    // Login
     await axios.post(
      'http://localhost:8000/api/login',
      {
        email,
        password,
      },
      {
        withCredentials: true, 
        headers: {
          'X-XSRF-TOKEN': csrfToken,
        },
      }
    );

    console.log('Logged in successfully');
    navigate('/dashboard', { state: { success: 'Login successful!' } });
  } catch (error) {
    console.error(error);
    setError('Invalid credentials');
  }
};

  return (
   <Page >
  <Layout>
    <Layout.Section>
      <Card sectioned>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-600 mb-1">Task Manager App</h1>
          <p className="text-gray-600">Manage your tasks efficiently and stay organized.</p>
        </div>
      </Card>
    </Layout.Section>

    <Layout.Section>
      <Card sectioned>
        {successMessage && (
          <p style={{ color: 'green', marginBottom: '1rem' }}>{successMessage}</p>
        )}

        <TextField
          label="Email"
          value={email}
          type="email"
          onChange={setEmail}
          autoComplete="email"
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="flex justify-center mt-4">
          <Button primary onClick={handleSubmit}>Login</Button>
        </div>

        <div className="text-center mt-4">
          <span className="text-gray-600">New user?</span>{' '}
          <a href="/register" className="text-blue-600 hover:underline font-medium">
            Register
          </a>
        </div>


      </Card>
    </Layout.Section>
  </Layout>
</Page>
  );
}