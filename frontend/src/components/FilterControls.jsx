import React from 'react';
import { useTranslation } from 'react-i18next';

const FilterControls = ({ onFetchData, setFilters, filters }) => {
    const { t } = useTranslation();

    // In a real app, this data would come from an API or a static file
    const states = ["GOA", "MAHARAShtra", "KARNATAKA", "UTTRAKHAND"]; // Example states for the dropdown
    const years = ["2024-2025", "2023-2024", "2022-2023"]; // Example years

    const handleFilterChange = (e) => {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="p-4 bg-gray-100 flex flex-wrap gap-4 items-center">
            {/* State Dropdown */}
            <select name="state_name" onChange={handleFilterChange} value={filters.state_name} className="p-2 border rounded">
                <option value="">{t('selectState')}</option>
                {states.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
            
            {/* District Dropdown (For now, a text input for simplicity) */}
            <input 
                type="text"
                name="district_name"
                placeholder={t('selectDistrict')}
                onChange={handleFilterChange}
                value={filters.district_name}
                className="p-2 border rounded"
            />
            
            {/* Financial Year Dropdown */}
            <select name="fin_year" onChange={handleFilterChange} value={filters.fin_year} className="p-2 border rounded">
                <option value="">{t('selectFinancialYear')}</option>
                {years.map(year => <option key={year} value={year}>{year}</option>)}
            </select>

            <button onClick={onFetchData} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
                {t('fetchData')}
            </button>
        </div>
    );
};

export default FilterControls;