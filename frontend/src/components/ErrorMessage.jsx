import React from 'react';

const ErrorMessage = ({ message }) => {
    return (
        <div className="p-4 text-center bg-red-100 text-red-700 rounded-md">
            <p>Error: {message}</p>
        </div>
    );
};

export default ErrorMessage;