import { Divider, Flex, Image, Square } from '@chakra-ui/react';
import React from 'react';
import Logo from '../Assets/logo.svg'

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
        <Flex alignItems='center' ml='20px'>
            <a href='/' className='logo'>
                <Image 
                    boxSize='100px'
                    objectFit='cover'
                    src={Logo}
                    alt='Orqa logo'
                />
            </a>
            <nav>
                <Flex ml='20px'>
                    <Square size='150px'>
                        <Link to='/'>Home</Link>
                    </Square>
                    <Square size='150px'>
                        <Link to='/diagram'>Diagram</Link>
                    </Square>
                </Flex>
            </nav>
        </Flex>
        <Divider />
    </>
  );
};
export default Header;