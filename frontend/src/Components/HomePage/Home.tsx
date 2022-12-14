import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.sass';
import date from '../../data/cardData.json';
import promo from '../../assets/promo.svg';
import { Card } from '../Cards/Card';

export function Home() {
    return (
        <div>
            <div className={styles.location}>
                <nav>
                    <Link className={styles.block} to="/grodno">
                        📍 Гродненская область
                    </Link>
                </nav>
            </div>
            <div className={styles.flexDiv}>
                <div className={styles.flexContainer}>
                    <h4>Посты</h4>
                    {date.map((card, index) => (
                        <Card
                            key={index}
                            date={card.date}
                            img={card.img}
                            minutsForRead={card.minutsForRead}
                            text={card.text}
                            title={card.title}
                            read={card.read}
                        />
                    ))}
                </div>
                <div className={styles.news}>
                    <h4>Новости</h4>
                    <p>
                        Для пользователей нашего сайте предоставляется СКИДКА в размере 15% на
                        бронирование усадеб при использовании специального ПРОМОКОДА:
                    </p>
                    <img src={promo} alt="WebSite Logo" />
                    <h4>Связаться с нами</h4>
                    <p>Почта: polinchesta@gmail.com</p>
                    <p>GitHub: https://github.com/polinchesta</p>
                    <p>Telegram: @polinchesta</p>
                    <h4>Обратная связь</h4>
                    <form className={styles.form}>
                        <label>
                            Почта:
                        </label>
                        <input className={styles.mail} type="text" name="mail" />
                        <label>
                            Тема сообщения:
                        </label>
                        <input className={styles.topic} type="text" name="mail" />
                        <label>
                            Сообщение:
                        </label>
                        <textarea className={styles.message} name="mail" />
                        <input className={styles.button} type="submit" value="Отправить" />
                    </form>
                </div>
            </div>
            <h4 className={styles.videoText}>Почему именно Гродненская область?</h4>
            <iframe
                className={styles.video}
                src="https://www.youtube-nocookie.com/embed/L7b5nAL5mFY"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
        </div>
    );
}
