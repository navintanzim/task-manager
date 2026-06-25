import { Page, Layout, Card, Text } from '@shopify/polaris';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import TailwindLayout from '../components/Tailwindlayout';

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getMonthLabel = (date) =>
  date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

const isSameDay = (firstDate, secondDate) =>
  firstDate.getFullYear() === secondDate.getFullYear() &&
  firstDate.getMonth() === secondDate.getMonth() &&
  firstDate.getDate() === secondDate.getDate();

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const today = new Date();
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const calendarStart = new Date(currentMonthStart);
  calendarStart.setDate(calendarStart.getDate() - currentMonthStart.getDay());

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

  useEffect(() => {
    fetchTasks();
  }, []);

  const completedTasksThisMonth = tasks.filter((task) => {
    if (task.status !== 'Completed' || !task.updated_at) {
      return false;
    }

    const completedDate = new Date(task.updated_at);
    return (
      completedDate.getFullYear() === today.getFullYear() &&
      completedDate.getMonth() === today.getMonth()
    );
  });

  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(calendarStart);
    date.setDate(calendarStart.getDate() + index);

    const tasksCompletedOnDate = completedTasksThisMonth.filter((task) =>
      isSameDay(new Date(task.updated_at), date)
    );

    return {
      key: date.toISOString(),
      date,
      isCurrentMonth: date.getMonth() === today.getMonth(),
      isToday: isSameDay(date, today),
      completedTasks: tasksCompletedOnDate,
    };
  });

  return (
    <TailwindLayout>
      <Page title="Dashboard">
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Text variant="headingLg" as="h2">
                    {getMonthLabel(today)}
                  </Text>
                  <Text as="p" tone="subdued">
                    Completed tasks are highlighted on the day they were finished.
                  </Text>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-green-500" />
                  <Text as="span">{completedTasksThisMonth.length} completed this month</Text>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-3">
                {weekdayLabels.map((label) => (
                  <div
                    key={label}
                    className="rounded-lg bg-slate-100 px-2 py-3 text-center text-sm font-semibold text-slate-600"
                  >
                    {label}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day) => {
                  const isHighlighted = day.completedTasks.length > 0;
                  const dayClasses = [
                    'min-h-[110px] rounded-xl border p-3 transition-colors',
                    day.isCurrentMonth ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-100 text-slate-400',
                    day.isToday ? 'ring-2 ring-blue-400' : '',
                    isHighlighted ? 'border-green-300 bg-green-50' : '',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <div key={day.key} className={dayClasses}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-semibold">{day.date.getDate()}</span>
                        {isHighlighted && (
                          <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs font-semibold text-white">
                            {day.completedTasks.length}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        {day.completedTasks.slice(0, 2).map((task) => (
                          <div
                            key={task.id}
                            className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
                          >
                            {task.name}
                          </div>
                        ))}
                        {day.completedTasks.length > 2 && (
                          <div className="text-xs font-medium text-green-700">
                            +{day.completedTasks.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </TailwindLayout>
  );
}
