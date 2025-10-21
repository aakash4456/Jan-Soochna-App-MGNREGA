import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Header from '../components/Header';
import FilterControls from '../components/FilterControls';
import DataCard from '../components/DataCard';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

import { fetchData } from '../store/dataSlice';

const HomePage = () => {
    const dispatch = useDispatch();
    const { records, loading, error } = useSelector((state) => state.data);
    const { t } = useTranslation();

    const [filters, setFilters] = useState({
        state_name: 'GOA',
        district_name: 'NORTH GOA',
        fin_year: '2024-2025',
    });

    const handleFetchData = () => {
        dispatch(fetchData(filters));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto p-4">
                <FilterControls 
                    onFetchData={handleFetchData} 
                    setFilters={setFilters}
                    filters={filters}
                />
                
                {loading && <Spinner />}
                {error && <ErrorMessage message={error} />}
                
                {!loading && !error && records.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DataCard title={t('totalHouseholdsWorked')} value={records[0].Total_Households_Worked} />
                        <DataCard title={t('totalIndividualsWorked')} value={records[0].Total_Individuals_Worked} />
                        <DataCard title={t('approvedLabourBudget')} value={records[0].Approved_Labour_Budget} />
                        {/* Add more DataCards for other relevant metrics */}
                    </div>
                )}
            </main>
        </div>
    );
};

export default HomePage;