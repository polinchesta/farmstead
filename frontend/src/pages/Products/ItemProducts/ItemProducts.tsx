import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import styles from './ItemProducts.module.sass';
import Loader from '../../../ui/loader/loader';
import { productActions } from '../../../store/product/productSlice';
import useTranslation from '../../../hooks/useTranslation';
import { fetchRelatedProducts } from '../../../store/RelatedProduct/relatedProduct';
import ProductsCard from '../cardProducts/cardProduct';

export default function ItemProduct() {
    const dispatch = useAppDispatch();
    const product = useAppSelector((state) => state.product.product);
    const products = useAppSelector((state) => state.products.products);
    const relatedProducts = useAppSelector((state) => state.relatedProducts.relatedProducts);
    const loading = useAppSelector((state) => state.product.loading);
    const { id } = useParams();
    const { t } = useTranslation();
    const productId = +(id ?? 0);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/product`);
    };
    useEffect(() => {
        if (productId) {
            dispatch(productActions.getProduct(productId));
        }
    }, [id]);

    return (
        <div className={styles.containerProd}>
            {loading && <Loader />}
            <button onClick={handleClick} className={styles.back}>
                {t.back.button}
            </button>
            {product && (
                <section className={styles.product}>
                    <div className={styles.image}>
                        <img src={product.img} alt={product.title} />
                    </div>
                    <div className={styles.text}>
                        <p className={styles.title}>{product.title}</p>
                        <h2 className={styles.price}>{product.price} BYN</h2>
                        <p>{product.count}</p>
                        <p>{product.address}</p>
                        <div className={styles.number}>
                            <a href={'tel:' + product.number}>
                                {product.number}
                            </a>
                        </div>
                    </div>
                </section>
            )}
            <h2>С этим покупают/похожие товары:</h2>
            <div className={styles.productContainer}>
                {relatedProducts.map((product: any, index: number) => (
                    <ProductsCard
                        key={index}
                        dataItem={product}
                        id={index}
                        img={product.img}
                        t={t}
                    />
                ))}
            </div>
        </div>
    );
}
