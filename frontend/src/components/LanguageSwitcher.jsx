import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'हिन्दी' },
        { code: 'ta', name: 'தமிழ்' },
        { code: 'mr', name: 'मराठी' },
        { code: 'bn', name: 'বাংলা' },
    ];

    return (
        <div className="bg-gray-700 p-2 rounded-md">
            <select
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="bg-gray-700 text-white focus:outline-none"
                defaultValue={i18n.language}
            >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSwitcher;