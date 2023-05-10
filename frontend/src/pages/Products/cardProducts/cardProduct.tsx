import useTranslation from '../../../hooks/useTranslation';
import { ProductType } from '../../../types/productsTypes';
import styles from './cardProduct.module.sass';

interface CardProps {
    dataItem: ProductType
    t: any;
}

const ProductsCard: React.FC<CardProps> = ({
    dataItem,
    t,
}) => {


    return (
        <div className={styles.container}>
            <section className={styles.product}>
                <p className={styles.title}>{t.products[dataItem.id].title}</p>
                <h2 className={styles.price}>{t.products[dataItem.id].price}</h2>
                <p>{t.products[dataItem.id].count}</p>
                <p>{t.products[dataItem.id].address}</p>
                <div className={styles.number}>
                    <a href={"tel:" + t.products[dataItem.id].number}>{t.products[dataItem.id].number}</a>
                </div>
            </section>
        </div>
    );
};

export default ProductsCard;
