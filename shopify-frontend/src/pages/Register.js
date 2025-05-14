// src/pages/Register.js
import { useState } from 'react';
import { Page, TextField, Button, Card, Layout, Text } from '@shopify/polaris';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
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
        if (!name) {
          setError('Name is required.');
          return;
        }
        if (!passwordConfirmation) {
          setError('Confirmation of your password is required.');
          return;
        }
    try {
      // Get CSRF cookie
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });

      const csrfToken = Cookies.get('XSRF-TOKEN');

      // Submit registration
      await axios.post(
        'http://localhost:8000/api/register',
        {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
        {
          withCredentials: true,
          headers: {
          'X-XSRF-TOKEN': csrfToken,
        },
        }
      );
       navigate('/login', { state: { success: 'Registration successful! Please log in.' } });
    } catch (err) {
      console.error(err);
      setError('Registration failed. Check your inputs.');
    }
  };

  return (
    <Page>
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
            <Text variant="headingMd" as="h3">Create a New Account</Text>
            <TextField label="Name" value={name} onChange={setName} />
            <TextField label="Email" type="email" value={email} onChange={setEmail} />
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={setPassword}
            />
            <TextField
              type="password"
              label="Confirm Password"
              value={passwordConfirmation}
              onChange={setPasswordConfirmation}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="flex justify-center mt-4">
              <Button onClick={handleSubmit} primary >Register</Button>
            </div>
            
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
