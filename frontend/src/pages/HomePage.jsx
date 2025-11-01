// Add 'useEffect' to the import from 'react'
import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios'; // Import axios for the geocoding call

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
        state_name: '', // Start with empty filters
        district_name: '',
        fin_year: '2024-2025',
    });

    // useEffect for location detection
    useEffect(() => {
        if ("geolocation" in navigator) {
            // Ask for user's location
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        // Call our backend to get location from coordinates
                        const res = await axios.get('http://localhost:5000/api/location-from-coords', {
                            params: { lat: latitude, lon: longitude }
                        });
                        
                        const { state, district } = res.data;

                        if (state && district) {
                            const newFilters = {
                                ...filters,
                                state_name: state.toUpperCase(), // Match API format
                                district_name: district.toUpperCase(), // Match API format
                            };
                            setFilters(newFilters);
                            // Automatically fetch data for the detected location
                            dispatch(fetchData(newFilters));
                        }
                    } catch (err) {
                        console.error("Could not fetch location name.", err);
                    }
                },
                (err) => {
                    // Handle cases where the user denies permission
                    console.error("User denied geolocation permission.", err.message);
                }
            );
        } else {
            console.log("Geolocation is not available in this browser.");
        }
    }, [dispatch]); // The dependency array is empty, so this runs only once on mount

    const handleFetchData = () => {
        if(filters.state_name && filters.district_name && filters.fin_year) {
            dispatch(fetchData(filters));
        } else {
            alert("Please select State, District, and Financial Year.");
        }
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
                    </div>
                )}

                {!loading && !error && records.length === 0 && !error && (
                    <div className="text-center p-10 text-gray-500">
                        <p>Please select your filters and click "Fetch Data" to see the MGNREGA report.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default HomePage;