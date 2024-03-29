import React, { useState } from 'react';
import styles from './modal.module.sass';
import useTranslation from '../../hooks/useTranslation';
import { FarmsteadOrder } from '../../types/farmsteadsTypes';
import axios from 'axios';

interface ModalProps {
    title: string;
    farmsteadId: number;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, farmsteadId }) => {
    const [phoneNumber, setPhoneNumber] = useState('+375');
    const [order, setOrder] = useState<FarmsteadOrder[]>([]);
    const { t } = useTranslation();
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        value = value.replace(/\D/g, '');
        if (value.startsWith('+')) {
            value = '+' + value.slice(1, 13);
        } else {
            value = '+' + value.slice(0, 12);
        }

        setPhoneNumber(value);
    };

    const [newOrder, setNewOrder] = useState<FarmsteadOrder>({
        id: generateUUID(),
        name: '',
        number: phoneNumber,
        farmsteadId: farmsteadId,
        title: title,
        orderDate: null,
        email: '',
        time: '',
        oplata: '',
        day: ''
    });

    function generateUUID(): number {
        return Date.now();
    }
    const handleSubmit = async (newOrder: FarmsteadOrder) => {
        const currentDate = new Date().toISOString();
        try {
            const updatedOrder = { ...newOrder, time: currentDate, farmsteadId: farmsteadId };
            const response = await axios.post(
                `http://localhost:3002/orderIn1Click`,
                updatedOrder
            );

            const addedOrder = response.data;
            setOrder((prevOrder) => [...prevOrder, addedOrder]);
            setNewOrder({
                id: generateUUID(),
                name: '',
                number: phoneNumber,
                title: title,
                farmsteadId: farmsteadId,
                orderDate: null,
                time: '',
                email: '',
                oplata: '',
                day: ''
            });

            onClose();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                <h2>{title}</h2>
                <form>
                    <div>
                        <label htmlFor="name">{t.modal.name}</label>
                        <input
                            type="text"
                            id="name"
                            value={newOrder.name}
                            onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="number">{t.modal.phone}</label>
                        <input
                            type="tel"
                            id="number"
                            value={newOrder.number}
                            onChange={(number) => {
                                handlePhoneChange(number);
                                setNewOrder({ ...newOrder, number: phoneNumber });
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">{t.modal.email}</label>
                        <input
                            type="email"
                            id="email"
                            value={newOrder.email}
                            onChange={(e) => setNewOrder({ ...newOrder, email: e.target.value })}
                            required />
                    </div>
                    <div className={styles.containerButton}>
                        <button
                            className={styles.buttonCall}
                            onClick={() => {
                                if (newOrder.name && newOrder.number && newOrder.email) {
                                    handleSubmit(newOrder);
                                } else {
                                    alert("Пожалуйста, заполните все поля, чтобы мы могли корректно оказать Вам услугу")
                                }
                            }}
                            type="submit"
                        >
                            {t.modal.call}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
