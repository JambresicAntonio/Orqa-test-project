import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from './Pages/Layout';
import App from './Pages/App';
import Diagram from './Pages/Diagram';
import NotFound from './Pages/NotFound';

import { ChakraProvider } from '@chakra-ui/react';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <ChakraProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/diagram" element={<Diagram />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </ChakraProvider>
);
