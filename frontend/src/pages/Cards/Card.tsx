import styles from './Card.module.sass';
import { Link } from 'react-router-dom'


interface CardProps {
    img: string;
    date: string;
    minutsForRead: string;
    title: string;
    text: string;
    read: string;
    id: number;
}

export function Card({ img, date, minutsForRead, title, text, read, id }: CardProps) {
    const imagePath = '/' + img;
    return (
        <div>
            
            <section className={styles.farmstead}>
                <div className={styles.farmsteadImg}>
                    <img className={styles.falvarek} src={imagePath} alt="falvarek" />
                </div>
                <div className={styles.text}>
                    <p className={styles.date}>
                        {date} · {minutsForRead}
                    </p>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.information}>{text}</p>
                    <Link to={`/farmstead/${id}`} className={styles.readMore}>{read}</Link>
                </div>
            </section>
        </div>
    );
}
