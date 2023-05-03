import { ProductType } from '../../../types/productsTypes';
import styles from './cardProduct.module.sass';

interface CardProps {
    dataItem: ProductType;
}

const ProductsCard: React.FC<CardProps> = ({
    dataItem,
}) => {
    return (
        <div className={styles.container}>
            <section className={styles.product}>
                <p className={styles.title}>{dataItem.title}</p>
                <h2 className={styles.price}>{dataItem.price}</h2>
                <p>{dataItem.count}</p>
                <p>{dataItem.adress}</p>
                <div className={styles.number}>
                    <a href={"tel:" + dataItem.number}>{dataItem.number}</a>
                </div>
            </section>
        </div>
    );
};

export default ProductsCard;



/* export function CardProducts({ img, price, adress, title, number, count }: CardProps) {
    const imagePath = '/' + img;
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
} */
