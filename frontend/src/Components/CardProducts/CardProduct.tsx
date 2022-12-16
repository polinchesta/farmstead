import { style } from '@mui/system';
import styles from './CardProduct.module.sass';

interface CardProps {
    img: string;
    price: string;
    adress: string;
    title: string;
    number: string;
    count: string;
}

export function CardProducts({ img, price, adress, title, number, count }: CardProps) {
    const imagePath = '../src/assets/' + img;
    return (
        <div className={styles.container}>
            <section className={styles.product}>
                <div>
                    <img src={imagePath} alt="falvarek" />
                </div>
                <div>
                    <p className={styles.title}>{title}</p>
                    <h2 className={styles.price}>{price}</h2>
                    <p>{count}</p>
                    <p>{adress}</p>
                    <div className={styles.number}>
                        <a href={"tel:"+number}>{number}</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
