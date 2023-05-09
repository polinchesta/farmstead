import ProductsCard from './cardProducts/cardProduct';
import styles from './products.module.sass'
import { useAppSelector } from '../../hooks/redux-hooks';
import ProductsFilter from "./filter/productsFilter"
import Loader from '../../ui/loader/loader';

export function Products() {
    const products = useAppSelector((state) => state.products.products);
    const loading = useAppSelector((state) => state.products.loading);

    return (
        <>
            {loading && (
                <Loader />
            )}
            <ProductsFilter />
            <div className={styles.gridContainer}>
                {products.map((product) => (
                    <ProductsCard
                        key={product.id}
                        dataItem={product}
                    />
                ))}
            </div>
        </>
    );
}


