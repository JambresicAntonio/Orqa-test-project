import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Components/Header';

import '../Styles/App.scss'

import { Box } from '@chakra-ui/react';

const Layout = () => {
  return (
    <Box color ='white' bg='black'>
      <Header />

      <Outlet />
    </Box>
  )
};

export default Layout;