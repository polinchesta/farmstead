import styles from './cardFarmstead.module.sass';
import { Link, useNavigate } from 'react-router-dom'
import React from "react";
import { useEffect, useState } from "react";
import { YMaps, Map } from "react-yandex-maps";
import { FarmsteadsType } from '../../../types/farmsteadsTypes';
import Modal from '../../../ui/modal/modal';
interface CardProps {
    dataItem: FarmsteadsType;
    id: number;
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

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    const handleButtonClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        openModal();
    };
    return (
        <div className={styles.container}>
            <section className={styles.farmstead} onClick={handleClick}>
                <div className={styles.farmsteadImg}>
                    <img className={styles.falvarek} src={img} alt="farmstead title" />
                </div>
                <div className={styles.text}>
                    <h2 className={styles.title}>{t.farmsteads[dataItem.id].title}</h2>
                    <p className={styles.information}>{t.farmsteads[dataItem.id].text}</p>
                    <p className={styles.information}>{t.farmsteads[dataItem.id].price}, {t.farmsteads[dataItem.id].house}, {t.farmsteads[dataItem.id].place}</p>
                    <p className={styles.information}>{t.farmsteads[dataItem.id].contact}, {t.farmsteads[dataItem.id].email}</p>
                    <button className={styles.button} onClick={handleButtonClicked}>{t.order.button}</button>
                </div>
            </section>
            {modalOpen && (
                <Modal title={t.farmsteads[dataItem.id].title} onClose={closeModal} />
            )}
        </div>
    );
};

export default CardFarmstead;
