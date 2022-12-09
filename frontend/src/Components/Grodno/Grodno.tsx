import React from 'react';
import grodno from '../../assets/grodno.png'
import styles from './Grodno.module.sass';

export function Grodno() {
    return (
        <div className={styles.history}>
            <h2>История Гродненщины</h2>
            <div className={styles.information}>
                <p>
                    Территория Гродненщины была заселена людьми с позднего полеолита. Наиболее
                    древние стоянки находились на озере Свитязь, возле д.Черешля Новогрудского,
                    Несиловичи Дятловского, Збляны Лидского районов, около устья р.Котра.
                </p>
                <div className={styles.image}>
                    <img src={grodno} alt="Grodno" />
                    <h3>Гродно в 19 веке</h3>
                </div>
            </div>
        </div>
    );
}
