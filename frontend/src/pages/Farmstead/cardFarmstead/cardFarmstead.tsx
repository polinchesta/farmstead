import styles from './cardFarmstead.module.sass';
import { Link } from 'react-router-dom'
import React from "react";
import { useEffect, useState } from "react";
import { YMaps, Map } from "react-yandex-maps";
import { FarmsteadsType } from '../../../types/farmsteadsTypes';

interface CardProps {
    dataItem: FarmsteadsType;
    img: string
    t: any;
}

const CardFarmstead: React.FC<CardProps> = ({
    dataItem,
    img,
    t,
}) => {

    return (
        <div className={styles.container}>
            <section className={styles.farmstead}>
                <div className={styles.farmsteadImg}>
                    <img className={styles.falvarek} src={img} alt="farmstead title" />
                </div>
                <div className={styles.text}>
                    <h2 className={styles.title}>{t.farmstead[dataItem.id].title}</h2>
                    <p className={styles.information}>{t.farmstead[dataItem.id].text}</p>
                    <Link to={`/farmstead/${dataItem.id}`} className={styles.readMore}>{t.farmstead[dataItem.id].read}</Link>
                </div>
            </section>
        </div>
    );
};

export default CardFarmstead;
