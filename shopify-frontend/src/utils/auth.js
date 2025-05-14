import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchCurrentUser = async () => {
  try {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    const response = await axios.get('http://localhost:8000/api/user', {
      withCredentials: true,
      headers: {
        'X-XSRF-TOKEN': csrfToken,
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
