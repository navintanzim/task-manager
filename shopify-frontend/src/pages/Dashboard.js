import { Page, Layout, Card, Button, DataTable, TextField, Badge, Pagination  } from '@shopify/polaris';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import TailwindLayout from '../components/Tailwindlayout';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;  // pagination limit
  const [completedPage, setCompletedPage] = useState(1);
  const [pendingPage, setPendingPage] = useState(1);


  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/tasks', {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
        },
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleDelete = async (id) => {
  const confirmed = window.confirm('Are you sure you want to delete this task?');
  if (!confirmed) return;

  try {
    await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
      withCredentials: true,
      headers: {
        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
      },
    });
    fetchTasks();
  } catch (err) {
    console.error('Failed to delete task:', err);
  }
};

  

  useEffect(() => {
    fetchTasks();
  }, []);

   const formatTaskRow = (task) => [
    task.name,
    task.description || '-',
    <Badge status={task.status === 'Pending' ? 'attention' : 'success'}>
      {task.status}
    </Badge>,
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Button primary onClick={() => navigate(`/edit/${task.id}`)} >
        Edit
      </Button>
      <Button destructive onClick={() => handleDelete(task.id)} >
        Delete
      </Button>
    </div>,
  ];

  
  const filteredTasks = tasks.filter(task =>
  task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  task.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handlePrevious = () => {
  if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    const maxPage = Math.ceil(filteredTasks.length / itemsPerPage);
    if (currentPage < maxPage) setCurrentPage(currentPage + 1);
  };

  // const paginatedTasks = filteredTasks.slice(
  // (currentPage - 1) * itemsPerPage,
  // currentPage * itemsPerPage
  // );

  const pendingTasks = filteredTasks
    .filter((t) => t.status === 'Pending')
    .map(formatTaskRow);

  const completedTasks = filteredTasks
    .filter((t) => t.status === 'Completed')
    .map(formatTaskRow);

  const paginatedCompletedTasks = completedTasks.slice(
  (completedPage - 1) * itemsPerPage,
  completedPage * itemsPerPage
  );

  const paginatedPendingTasks = pendingTasks.slice(
    (pendingPage - 1) * itemsPerPage,
    pendingPage * itemsPerPage
  );

  

  return (
    <TailwindLayout>
    <Page
      title="Your Tasks"
      primaryAction={{ content: 'Create New Task', onAction: () => navigate('/create') }}
    >

      <div style={{ maxWidth: '300px', marginBottom: '1rem' }}>
        <TextField
          label="Search Tasks"
          value={searchTerm}
          onChange={setSearchTerm}
          autoComplete="off"
          clearButton
          onClearButtonClick={() => setSearchTerm('')}
        />
      </div>

      <Layout>
        <Layout.Section>
          <Card  sectioned>
             <h2 className="text-lg font-bold mb-4">Pending Tasks</h2>
            <DataTable
              columnContentTypes={['text', 'text', 'text', 'text']}
              headings={['Name', 'Description', 'Status', 'Actions']}
              rows={paginatedPendingTasks}
            />
            <Pagination
              hasPrevious={pendingPage  > 1}
              onPrevious={() => setPendingPage(pendingPage - 1)}
              hasNext={pendingPage * itemsPerPage < completedTasks.length}
              onNext={() => setPendingPage(pendingPage + 1)}
            />
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card  sectioned>
             <h2 className="text-lg font-bold mb-4">Completed Tasks</h2>
            <DataTable
              columnContentTypes={['text', 'text', 'text', 'text']}
              headings={['Name', 'Description', 'Status', 'Actions']}
              rows={paginatedCompletedTasks}
            />
            <Pagination
              hasPrevious={completedPage  > 1}
              onPrevious={() => setCompletedPage(completedPage - 1)}
              hasNext={completedPage * itemsPerPage < completedTasks.length}
              onNext={() => setCompletedPage(completedPage + 1)}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
    </TailwindLayout>
  );
}
