import { useState } from 'react';
import { Page, TextField, Card, Layout, Button, Text } from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Home({ onLogin }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
      const res = await axios.post(
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
                      <Text variant="headingMd" as="h3">Login with your email and password</Text>
                      <br></br>
                      <TextField label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
                      <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={setPassword}
                        autoComplete="current-password"
                      />
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                      <br></br>
                      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                      <Button style={{backgroundColor:'green'}} onClick={handleSubmit}  >Login</Button>
                      </div>
                      <Text variant="headingMd" as="h3">
              Manage your tasks efficiently.
            </Text>
            <Text>Start by registering an account or logging in.</Text>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>



              <Button onClick={() => navigate('/register')} primary>
                Register
              </Button>
              
            </div>

                    </Card>


        </Layout.Section>
      </Layout>
    </Page>
  );
}
