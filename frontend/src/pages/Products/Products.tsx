import React, { useEffect } from 'react';
import { CardProducts } from './cardProducts/cardProduct';
/* import date from "../../data/productData.json"; */
import styles from './products.module.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { productsActions } from '../../store/products/productsSlice';

export function Products() {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.products);

    useEffect(()=>{
        dispatch(productsActions.getProductsList());
    }, [])

    console.log(products)

    return (
        <h2>Products</h2>
        /* <div className={styles.gridContainer}>
            {date.map((card, index) => (
                <CardProducts
                    key={index}
                    price={card.price}
                    img={card.img}
                    adress={card.adress}
                    number={card.number}
                    count={card.count}
                    title={card.title}
                />
            ))}
        </div> */
    );
}


