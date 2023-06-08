import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks'
import styles from "./ItemProducts.module.sass"
import Loader from '../../../ui/loader/loader'
import { productActions } from '../../../store/product/productSlice'
import useTranslation from '../../../hooks/useTranslation'
import ProductsCard from '../cardProducts/cardProduct'

export default function ItemProduct() {
    const dispatch = useAppDispatch()
    const products = useAppSelector((state) => state.products.products)
    const loading = useAppSelector((state) => state.products.loading)
    const { id } = useParams()
    const { t } = useTranslation()
    const productId = +(id ?? 0)
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/product`)
    }
    useEffect(() => {
        if (productId) {
            dispatch(productActions.getProduct(productId))
        }
    }, [id])
    return (
        <div className={styles.containerProd}>
            {loading && <Loader />}
            <button onClick={handleClick} className={styles.back}>{t.back.button}</button>
            {products && (
                <section className={styles.product}>
                    <div>
                        <img src={t.products[productId].img} alt={t.products[productId].title} />
                    </div>
                    <div className={styles.text}>
                        <p className={styles.title}>{t.products[productId].title}</p>
                        <h2 className={styles.price}>{t.products[productId].price}</h2>
                        <p>{t.products[productId].count}</p>
                        <p>{t.products[productId].address}</p>
                        <div className={styles.number}>
                            <a href={"tel:" + t.products[productId].number}>{t.products[productId].number}</a>
                        </div>
                    </div>
                </section >
            )}
            <h2>С этим покупают:</h2>
            <div className={styles.productContainer}>
                {products &&
                    products.map((product, index) => (
                        <ProductsCard
                            key={index}
                            dataItem={product}
                            id={index}
                            img={product.img}
                            t={t}
                        />
                    ))}
            </div>
        </div >
    )
}