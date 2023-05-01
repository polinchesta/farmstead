import { useState } from 'react';
import en from '../resources/locales/en.json';
import ru from '../resources/locales/ru.json';

type LanguageType = "en" | "ru";

const translations: {[name in LanguageType]: typeof ru & typeof en}={
    ru,
    en,
}

const useTranslation = () => {
    const [language, setLanguage]=useState<LanguageType>("ru")

    const toggleLanguage = () =>{
        const newLanguage: LanguageType = language === "en" ? "ru" : "en";
        setLanguage(newLanguage)
    };

    return{
        t: translations[language],
        setLanguage,
        toggleLanguage
    }
};

export default useTranslation