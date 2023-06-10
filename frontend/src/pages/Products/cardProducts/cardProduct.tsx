import { useState, useEffect } from 'react';
import axios from 'axios';
import useTranslation from '../../../hooks/useTranslation';
import { ProductType } from '../../../types/productsTypes';
import styles from './cardProduct.module.sass';
import Modal from '../../../ui/modal/modal';
import { Link, useNavigate } from 'react-router-dom';

interface CardProps {
    dataItem: ProductType;
    id: number;
    img: string;
    t: any;
}

const ProductsCard: React.FC<CardProps> = ({
    id,
    dataItem,
    img,
    t,
}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/product/${dataItem.id}`);
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

    return (
        <div className={styles.container}>
            <section className={styles.product} onClick={handleClick}>
                <div>
                    <img src={img} alt="product title" />
                </div>
                <p className={styles.title}>{t.products[dataItem.id].title}</p>
                <h2 className={styles.price}>{t.products[dataItem.id].price} BYN</h2>
                <p>{t.products[dataItem.id].count}</p>
                <p>{t.products[dataItem.id].address}</p>
                <div className={styles.number}>
                    <a href={"tel:" + t.products[dataItem.id].number}>{t.products[dataItem.id].number}</a>
                </div>
                <button className={styles.button} onClick={handleButtonClicked}>{t.order.button}</button>
            </section>
            {modalOpen && (
                <Modal title={t.products[dataItem.id].title} onClose={closeModal} />
            )}
        </div>
    );
};

export default ProductsCard;
