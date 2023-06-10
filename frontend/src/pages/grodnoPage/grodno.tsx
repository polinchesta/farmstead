import React from 'react';
import styles from './grodno.module.sass';
import useTranslation from '../../hooks/useTranslation';

export function Grodno() {
    const { t } = useTranslation();
    return (
        <div className={styles.history}>
            <h2>{t.grodno.history}</h2>
            <div className={styles.information}>
                <p>
                    {t.grodno.textAll}
                </p>
                <div className={styles.columnImage}>
                    <div className={styles.image}>
                        <img className={styles.grodno} src={'/grodno.png'} alt="Grodno" />
                        <h3>{t.grodno.grodnoin19}</h3>
                    </div>
                    <div className={styles.columnArticle}>
                        <p>
                            {t.grodno.textAll3}
                        </p>
                    </div>
                </div>
                <p>
                    {t.grodno.textAll1}
                </p>
                <div className={styles.columnImage}>
                    <div className={styles.image}>
                        <img className={styles.volkovysk} src={'/volkovysk.jpg'} alt="Volkovysk" />
                        <h3>{t.grodno.volkovyskin19}</h3>
                    </div>
                    <div className={styles.columnArticle}>
                        <p>
                            {t.grodno.textAll2}
                        </p>
                    </div>
                </div>
                <p>
                    {t.grodno.textAll4}
                </p>
                <div className={styles.columnImage}>
                    <div className={styles.image}>
                        <img className={styles.novogrudok} src={'/novogrudok.jpg'} alt="Novogrudok" />
                        <h3>{t.grodno.novogrudokin19}</h3>
                    </div>
                    <div className={styles.columnArticle}>
                        <p>
                            {t.grodno.textAll5}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
