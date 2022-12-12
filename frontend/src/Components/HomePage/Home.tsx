import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import falvarek from '../../assets/falvarek.jpeg';
import styles from './Home.module.sass';
import date from '../../data/cardData.json';
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
            {date.map((card, index) => (
                <Card key={index} date={card.date} img={card.img} minutsForRead={card.minutsForRead} text={card.text} title={card.title} read={card.read}/>
            ))}
            <iframe
                className={styles.video}
                src="https://www.youtube-nocookie.com/embed/L7b5nAL5mFY"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            <Footer />
        </div>
    );
}
