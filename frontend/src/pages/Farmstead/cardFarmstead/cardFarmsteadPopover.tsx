import React, { useState } from 'react';
import styles from '../../../ui/modal/modal.module.sass';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useTranslation from '../../../hooks/useTranslation';
import { FarmsteadOrder } from '../../../types/farmsteadsTypes';
import Select from '../../../ui/select/select';
import axios from 'axios';


interface CustomModalProps {
  title: string;
  farmsteadId: number;
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ title, onClose, farmsteadId }) => {
  const { t } = useTranslation();
  const [order, setOrder] = useState<FarmsteadOrder[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('+375');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
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
    orderDate: selectedDate,
    time: '',
    email: '',
    oplata: '',
    day: ''
  });

  function generateUUID(): number {
    return Date.now();
  }

  const handleSubmit = async (newOrder: FarmsteadOrder) => {
    try {
      const currentDate = new Date().toISOString();
      const updatedOrder = { ...newOrder, time: currentDate, farmsteadId: farmsteadId };
      const response = await axios.post(
        `http://localhost:3002/order`,
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
        orderDate: selectedDate,
        email: '',
        time: '',
        oplata: '',
        day: ''
      });

      onClose();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const minDate = new Date();
  const maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 1, minDate.getDate() - 1);

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
            <label htmlFor="orderDate">{t.modal.date}</label>
            <DatePicker
              id="orderDate"
              selected={selectedDate}
              minDate={minDate}
              maxDate={maxDate}
              onChange={(date) => {
                handleDateChange(date);
                setNewOrder({ ...newOrder, orderDate: date });
              }}
              dateFormat="yyyy-MM-dd"
              required
            />
          </div>
          <label htmlFor="day">{t.modal.oplata}</label>
          <select
            id="oplata"
            value={newOrder.oplata}
            onChange={(e) => setNewOrder({ ...newOrder, oplata: e.target.value })}
            style={{
              fontFamily: 'PT Mono, monospace',
              border: '3px solid black',
              background: 'none',
              fontSize: '16px',
              height: '40px',
              width: '350px',
              display: 'block',
              margin: '10px 0px',
              textAlign: 'center'
            }}
          >
            <option value="cash">{t.modal.cash}</option>
            <option value="card">{t.modal.card}</option>
          </select>
          <div>
            <label htmlFor="day">{t.modal.day}</label>
            <input
              type="text"
              id="day"
              value={newOrder.day}
              onChange={(e) => setNewOrder({ ...newOrder, day: e.target.value })}
              required
            />
          </div>
          <h3>{t.modal.number} +375298412880</h3>
          <div className={styles.containerButton}>
            <button
              className={styles.buttonCall}
              onClick={() => {
                if (newOrder.name && newOrder.number && newOrder.orderDate && newOrder.oplata && newOrder.day) {
                  handleSubmit(newOrder);
                } else {
                  alert("Пожалуйста, заполните все поля, чтобы мы могли корректно оказать Вам услугу")
                }
              }}
              type="submit"
            >
              {t.modal.order}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomModal;
