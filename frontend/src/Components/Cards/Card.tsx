import styles from './Card.module.sass';

interface CardProps {
    img: string;
    date: string;
    minutsForRead: string;
    title: string;
    text: string;
    read: string;
}

export function Card({ img, date, minutsForRead, title, text, read }: CardProps) {
    const imagePath = '../src/assets/' + img;
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
                    <button className={styles.readMore}>{read}</button>
                </div>
            </section>
        </div>
    );
}
