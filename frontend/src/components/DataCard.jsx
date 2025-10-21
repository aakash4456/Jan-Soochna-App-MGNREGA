import React from 'react';

const DataCard = ({ title, value }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-md md:text-lg font-semibold text-gray-600">{title}</h3>
            <p className="text-2xl md:text-3xl font-bold text-blue-800">{value || "N/A"}</p>
        </div>
    );
};

export default DataCard;