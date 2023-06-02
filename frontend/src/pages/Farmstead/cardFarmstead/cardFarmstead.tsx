import styles from './cardFarmstead.module.sass';
import { Link, useNavigate } from 'react-router-dom'
import React from "react";
import { useEffect, useState } from "react";
import { YMaps, Map } from "react-yandex-maps";
import { FarmsteadsType } from '../../../types/farmsteadsTypes';
interface CardProps {
    dataItem: FarmsteadsType;
    id:number;
    img: string;
    t: any;
}

const CardFarmstead: React.FC<CardProps> = ({
    id,
    dataItem,
    img,
    t,
}) => {
    const navigate = useNavigate()
    const handleClick = () => {
      navigate(`/farmstead/${dataItem.id}`)
    }

    console.log(dataItem.id)
    return (
        <div className={styles.container} onClick={handleClick}>
            <section className={styles.farmstead}>
                <div className={styles.farmsteadImg}>
                    <img className={styles.falvarek} src={img} alt="farmstead title" />
                </div>
                <div className={styles.text}>
                    <h2 className={styles.title}>{t.farmsteads[dataItem.id].title}</h2>
                    <p className={styles.information}>{t.farmsteads[dataItem.id].text}</p>
                    <Link to={`/farmstead/${dataItem.id}`} className={styles.readMore}>{t.farmsteads[dataItem.id].read}</Link>
                </div>
            </section>
        </div>
    );
};

export default CardFarmstead;
