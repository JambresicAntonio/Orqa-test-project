import React from "react";

import { Box } from "@chakra-ui/react";

const renderNodeTemplate = (node) => {
    if (!node) {
        return null;
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            <img
                src={node.imageUrl || 'https://via.placeholder.com/50'}
                alt={node.firstName || 'No Name'}
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
            <div style={{ marginTop: '10px' }}>
                <b>{node.firstName} {node.lastName}</b>
                <br />
                {node.position}
            </div>
        </Box>
    );
};

export default renderNodeTemplate;