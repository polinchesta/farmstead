import React from 'react';
import { CardProducts } from '../cardProducts/cardProduct';
import date from "../../data/productData.json";
import styles from './products.module.sass'

export function Products() {
    return (
        <div className={styles.gridContainer}>
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
        </div>
    );
}


