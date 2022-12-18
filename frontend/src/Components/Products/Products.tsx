import React from 'react';
import { CardProducts } from '../CardProducts/CardProduct';
import date from "../../data/productData.json";
import styles from './Products.module.sass'

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
                    count = {card.count}
                    title={card.title}
                />
            ))}
        </div>
    );
}


