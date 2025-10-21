import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
    const { t } = useTranslation();
    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
            <h1 className="text-xl md:text-2xl font-bold">{t('appTitle')}</h1>
            <LanguageSwitcher />
        </header>
    );
};

export default Header;