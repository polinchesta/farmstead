import styles from './cardFarmstead.module.sass';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import Modal from '../../../ui/modal/modal';
import CustomModal from './cardFarmsteadPopover';
import { FarmsteadsType } from '../../../types/farmsteadsTypes';
import { useIsAuthenticated } from "react-auth-kit";

interface CardProps {
    id: number;
    img: string;
    t: any;
    dataItem: FarmsteadsType
}

const CardFarmstead: React.FC<CardProps> = ({
    id,
    img,
    dataItem,
    t,
}) => {
    const isAuthenticated = useIsAuthenticated();
    const [popoverOpen, setPopoverOpen] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/farmstead/${id}`);
    };

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

    const openPopover = () => {
        setPopoverOpen(true);
    };
    const closePopover = () => {
        setPopoverOpen(false);
    };
    const handleButtonClickedPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        openPopover();
    };

    return (
        <div className={styles.container}>
            <section className={styles.farmstead} onClick={handleClick}>
                <div className={styles.farmsteadImg}>
                    <img className={styles.falvarek} src={img} alt="farmstead title" />
                </div>
                <div className={styles.text}>
                    <h2 className={styles.title}>{dataItem.title}</h2>
                    <p className={styles.information}>{dataItem.text}</p>
                    <p className={styles.information}>
                        {dataItem.price} BYN/ночь/с человека, {dataItem.house}, {dataItem.place} спальных мест
                    </p>
                    <p className={styles.information}>
                        {dataItem.contact}, {dataItem.email}
                    </p>
                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={handleButtonClicked}>
                            {t.order.button}
                        </button>
                        {isAuthenticated() && (
                            <button className={styles.button} onClick={handleButtonClickedPopover}>
                                {t.order.buttonzakaz}
                            </button>
                        )}
                    </div>
                </div>
            </section>
            {modalOpen && <Modal title={dataItem.title} onClose={closeModal} farmsteadId={dataItem.id} />}
            {popoverOpen && (
                <CustomModal
                    title={dataItem.title}
                    onClose={closePopover}
                    farmsteadId={dataItem.id}
                />
            )}
        </div>
    );
};

export default CardFarmstead;
