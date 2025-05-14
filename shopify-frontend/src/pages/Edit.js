
import { useState,useEffect } from 'react';
import {
  Page,
  Layout,
  Card,
  TextField,
  Select,
  Button,
  Text,
} from '@shopify/polaris';
import { useNavigate,useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import TailwindLayout from '../components/Tailwindlayout';

export default function EditTask() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { taskId } = useParams(); 


  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/tasks/${taskId}`, {
          withCredentials: true,
        });

        const task = response.data;
        setName(task.name);
        setDescription(task.description);
        setStatus(task.status);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch task data.');
      }
    };

    fetchTaskData();
  }, [taskId]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Task name is required.');
      return;
    }

    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });

      const token = Cookies.get('XSRF-TOKEN');

      await axios.put(
        `http://localhost:8000/api/tasks/${taskId}`,  
        {
          name,
          description,
          status,
        },
        {
          withCredentials: true,
          headers: {
            'X-XSRF-TOKEN': token,
          },
        }
      );

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to edit task.');
    }
  };

  const handleBack = () => {
    navigate('/dashboard');  
  };

  return (
    <TailwindLayout>
    <Page title="Edit Task">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text variant="headingMd" as="h3">Edit Task</Text>

            <TextField
              label="Task Name"
              value={name}
              onChange={setName}
              autoComplete="off"
            />

            <TextField
              label="Description"
              value={description}
              onChange={setDescription}
              autoComplete="off"
              multiline
            />

            <Select
              label="Status"
              options={[
                { label: 'Pending', value: 'Pending' },
                { label: 'Completed', value: 'Completed' },
              ]}
              onChange={setStatus}
              value={status}
            />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' }}>

                <Button onClick={handleBack} plain>
                  Back to Dashboard
                </Button>
              <div style={{ width: '30%',margin: '0 auto' }}>
                <Button onClick={handleSubmit} primary>
                  Save Changes
                </Button>
              </div>
                
            </div>
           
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
    </TailwindLayout>
  );
}
