import { useState, useCallback } from 'react';

import axios from 'axios';

const getMoreEmployees = (initialPage) => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(initialPage);

  const fetchMoreEmployees = useCallback(async (localURL) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${localURL}/api/employees?page=${page}`);
      const newData = response.data.data;
      setEmployees(prevEmployees => [...prevEmployees, ...newData]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  return { employees, isLoading, fetchMoreEmployees, setPage, setEmployees };
};

export default getMoreEmployees;