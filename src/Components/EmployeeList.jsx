import React, { useEffect, useState } from 'react';

import EmployeeModal from './EmployeeModal';
import getMoreEmployees from '../Hooks/getMoreEmployees';

import '../Styles/ShinyInput.scss';

import axios from 'axios';
import { motion } from 'framer-motion';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Image,
    IconButton,
    useDisclosure,
    Input,
  } from '@chakra-ui/react'

import { InfoOutlineIcon } from '@chakra-ui/icons'
import { useDebounce } from 'use-debounce';

const EmployeeList = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [page, setPage] = useState(1);
    const { employees, isLoading, fetchMoreEmployees, setPage: setHookPage, setEmployees } = getMoreEmployees(page);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [debounceSearch] = useDebounce(searchTerm, 500);
    console.log('deboiunce: ', debounceSearch);

    const localURL = 'http://localhost:8000';

    const getEmployeeDetails = (id) => {
        const clickedEmployee = employees.find(employee => employee.id === id);
        setSelectedEmployee(clickedEmployee);
    }

    const handleClick = (id) => {
        onOpen();
        getEmployeeDetails(id);
    };

    useEffect(() => {
        fetchEmployees();
    }, [debounceSearch]);

    useEffect(() => {
        const handleScroll = () => {
            if (
              window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight || isLoading
            ) {
              return;
            }
            setHookPage(prevPage => prevPage + 1);
          };

          window.addEventListener('scroll', handleScroll);

          return () => window.removeEventListener('scroll', handleScroll);
          
    }, [isLoading, fetchMoreEmployees]); 

    const fetchEmployees = async () => {
        setEmployees([]);
        setSearchTerm(debounceSearch);

        if (debounceSearch) {
            try {
                const response = await axios.get(`${localURL}/api/employees?search=${debounceSearch}`);
                setHookPage(1);
                setEmployees(response.data.data); 
            } catch (error) {
                console.error('Error fetching filtered employees:', error);
            }
        } else {
            setEmployees([]);
            setHookPage(1);
            fetchMoreEmployees(localURL);
        }
    };


  return (
      <TableContainer m='4%' mb='0' pb='10%'>
        <div className='shining-border'>
            <Input
                type='text'
                placeholder='Search employees'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                mb={10}
                h='60px'
            />
        </div>
        <Table>
            <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th textAlign='center'>Image</Th>
                    <Th>First Name</Th>
                    <Th>Last Name</Th>
                    <Th>Email</Th>
                    <Th>Position</Th>
                    <Th textAlign='center'>Details</Th>
                </Tr>
            </Thead>
            <Tbody>
                {employees.length === 0 ? (
                    <Tr>
                        <Td colSpan="7" textAlign="center">
                            <p>No employees found.</p>
                        </Td>
                    </Tr>
                ) : (
                    employees.map(employee => (
                        <motion.tr
                            key={employee.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 3 }}
                        >
                            <Td>{employee.id}</Td>
                            <Td>
                                <Image
                                    borderRadius='full'
                                    boxSize='100px'
                                    objectFit='cover'
                                    src={employee.imageUrl}
                                    alt='Employee image'
                                    m='auto'
                                />
                            </Td>
                            <Td>{employee.firstName}</Td>
                            <Td>{employee.lastName}</Td>
                            <Td>{employee.email}</Td>
                            <Td>{employee.position}</Td>
                            <Td textAlign='center'>
                                <IconButton 
                                    aria-label='Show employee details' 
                                    isRound={true} 
                                    onClick={() => handleClick(employee.id)} 
                                    icon={<InfoOutlineIcon />} />
                            </Td>
                        </motion.tr>
                    ))
                )}
            </Tbody>
        </Table>
        <EmployeeModal 
            isOpen={isOpen}
            onClose={onClose}
            employee={selectedEmployee}
        />
      </TableContainer>
  );
};
export default EmployeeList;