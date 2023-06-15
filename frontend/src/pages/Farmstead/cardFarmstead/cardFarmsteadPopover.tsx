import React, { useState } from 'react';
import styles from '../../../ui/modal/modal.module.sass';
interface CustomModalProps {
  title: string;
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ title, onClose }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Handle form submission here
    console.log('Name:', name);
    console.log('Surname:', surname);
    console.log('Phone Number:', phoneNumber);
    console.log('Selected Date:', selectedDate);

    setName('');
    setSurname('');
    setPhoneNumber('');
    setSelectedDate(null);

    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
          <label htmlFor="date">Date</label>

          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CustomModal;
