import React from 'react';
import { useParams } from 'react-router-dom';

const Display = () => {
    let params = useParams();; // Get the topic from the URL

    return (
        <div>
            <h2>Displaying content for: {params.topic}</h2>
            {/* Add content related to the topic here */}
        </div>
    );
};

export default Display;
