import React, { useEffect, useState } from 'react';
import axios from 'axios';

import buildHierarchy from '../Hooks/buildHierarchy';
import renderNodeTemplate from '../Hooks/renderNodeTemplate';

import { OrganizationChart } from 'primereact/organizationchart';
import { Box, Spinner  } from '@chakra-ui/react';
import Draggable from 'react-draggable';

import '../Styles/EmployeesDiagram.scss';

import 'primereact/resources/themes/arya-orange/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const EmployeesDiagram = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                let allEmployees = [];

                let currentPage = 1;
                let response = await axios.get(`http://localhost:8000/api/employees?page=${currentPage}`);
                allEmployees.push(...response.data.data);

                const totalPages = response.data.last_page;

                while (currentPage < totalPages) {
                    currentPage++;
                    response = await axios.get(`http://localhost:8000/api/employees?page=${currentPage}`);
                    allEmployees.push(...response.data.data);
                }

                const hierarchy = buildHierarchy(allEmployees);
                setData([hierarchy]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Box minHeight='100vh'>
            {isLoading ? (
                <Box w='100%' h='100%' display='flex' justifyContent='center' alignItems='center'>
                    <Spinner color='red.500' size='xl' thickness='5px' m='15%'/>
                </Box>
            ) : (
                data ? (
                    <Box mt={20} overflowX='auto'>
                        <Draggable>
                            <OrganizationChart
                                value={data}
                                nodeTemplate={renderNodeTemplate}
                                className='p-organizationchart'
                            />
                        </Draggable>
                    </Box>
                    
                ) : (
                    <Box w='100%' h='100%' display='flex' justifyContent='center' alignItems='center'>
                        <p>No data available.</p>
                    </Box>
                )
            )}
        </Box>
    );
};

export default EmployeesDiagram;
