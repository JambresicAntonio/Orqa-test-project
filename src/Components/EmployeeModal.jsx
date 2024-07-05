import React from 'react';

import moment from 'moment';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Image,
    Flex,
    Text,
    Button,
  } from '@chakra-ui/react'

const EmployeeModal = ({isOpen, onClose, employee}) => {
    const employeeCreationDate = moment(employee?.created_at).format('DD.MM.YYYY.');

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={'xl'} isCentered motionPreset='slideInRight'>
            <ModalOverlay 
                backdropFilter='blur(5px)'
            />
            <ModalContent>
                <ModalHeader ml={5}> {employee?.firstName + ' ' + employee?.lastName} </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex>
                        <Image
                            borderRadius='full'
                            boxSize='100px'
                            objectFit='cover'
                            src={employee?.imageUrl}
                            alt='Employee image'
                            ml={5}
                        />
                        <Flex flexDirection='column' ml={10}>
                            <Text> <b>Position:</b> {employee?.position}</Text>
                            <Text> <b>Contact:</b> {employee?.contactNumber}</Text>
                            <Text> <b>Email:</b> {employee?.email}</Text>
                            <Text> <b>Address:</b> {employee?.adress}</Text>
                            <Text> <b>Created:</b> {employeeCreationDate}</Text>
                            <Text> <b>About:</b> {employee?.about}</Text>
                        </Flex>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
export default EmployeeModal;