/*     import { useState } from 'react';
    import en from '../resources/locales/en.json';
    import ru from '../resources/locales/ru.json';
    import { LanguageType } from '../types/languageTypes';
    import { useAppDispatch, useAppSelector } from './redux-hooks';
    import { settingsActions } from '../store/settings/settingsSlice';

    const translations: { [name in LanguageType]: typeof ru & typeof en } = {
        ru,
        en,
    };

    const useTranslation = () => {
        const dispatch = useAppDispatch();
        const language = useAppSelector((state) => state.settings.language);


        const toggleLanguage = () => dispatch(settingsActions.toggleLanguage());

        return {
            t: translations[language],
            toggleLanguage,
        };
    };

    export default useTranslation;
 */

import { useState } from 'react';
import en from '../resources/locales/en.json';
import ru from '../resources/locales/ru.json';
import { LanguageType } from '../types/languageTypes';
import { useAppDispatch, useAppSelector } from './redux-hooks';
import { settingsActions } from '../store/settings/settingsSlice';

const translations: { [name in LanguageType]: typeof ru & typeof en } = {
    ru,
    en,
};

const useTranslation = () => {
    const dispatch = useAppDispatch();
    const language = useAppSelector((state) => state.settings.language);

    const toggleLanguage = () => dispatch(settingsActions.toggleLanguage());

    const setLanguage = (language: LanguageType) => {
        dispatch(settingsActions.setLanguage(language));
    };

    return {
        t: translations[language],
        toggleLanguage,
        setLanguage,
    };
};

export default useTranslation;
