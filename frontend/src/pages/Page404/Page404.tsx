import React from 'react';
import styles from './Page404.module.sass';
import useTranslation from '../../hooks/useTranslation';

export function Page404() {
    const {t} = useTranslation()
    return (
        <div className={styles.error}>
            <h2>{t.page404.error}</h2>
            <img src={'/monster.svg'} alt="WebSite Logo" />
        </div>
    );
}
