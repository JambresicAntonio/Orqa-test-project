import React from 'react';

import notFoundImg from '../Assets/404page.png'
import { Center } from '@chakra-ui/react';

const NotFound = () => {
    
    return (
        <Center minHeight='90vh'>
            <img src={notFoundImg} alt='Not found page'/>
        </Center>
    );
};
export default NotFound;