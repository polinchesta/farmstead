import styles from './cardFarmstead.module.sass';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useEffect, useState } from 'react';
import Modal from '../../../ui/modal/modal';
import CardFarmsteadPopover from './cardFarmsteadPopover';
interface CardProps {
    id: number;
    img: string;
    t: any;
    title: string;
    text: string;
    place: string;
    price: string;
    contact: string;
    email: string;
    house: string;
}

const CardFarmstead: React.FC<CardProps> = ({
    id,
    img,
    title,
    text,
    place,
    price,
    contact,
    email,
    house,
    t,
}) => {
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
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.information}>{text}</p>
                    <p className={styles.information}>
                        {price}, {house}, {place}
                    </p>
                    <p className={styles.information}>
                        {contact}, {email}
                    </p>
                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={handleButtonClicked}>
                            {t.order.button}
                        </button>
                        <button className={styles.button} onClick={handleButtonClickedPopover}>
                            {t.order.button}
                        </button>
                    </div>
                </div>
            </section>
            {modalOpen && <Modal title={title} onClose={closeModal} />}
            {popoverOpen && (
                <CardFarmsteadPopover
                    title={title}
                    onClose={closePopover}
                />
            )}
        </div>
    );
};

export default CardFarmstead;
