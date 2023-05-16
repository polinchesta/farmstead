import React, { useEffect, useState } from 'react';
import ProductsCard from './cardProducts/cardProduct';
import styles from './products.module.sass';
import { useAppSelector } from '../../hooks/redux-hooks';
import ProductsFilter from './filter/productsFilter';
import Loader from '../../ui/loader/loader';
import useTranslation from '../../hooks/useTranslation';
import { CurrencyConverter } from '../../ui/currency/currency';
import axios from 'axios';

export function Products() {
    const products = useAppSelector((state) => state.products.products);
    const loading = useAppSelector((state) => state.products.loading);
    const { t } = useTranslation();
    const [conversionRate, setConversionRate] = useState(0);

    useEffect(() => {
        const fetchConversionRate = async () => {
            try {
                const response = await axios.get('https://belarusbank.by/api/kursExchange');
                const usdToBynRate = response.data.USD_in;
                setConversionRate(usdToBynRate);
            } catch (error) {
                console.error('Failed to fetch conversion rate:', error);
            }
        };

        fetchConversionRate();
    }, []);

    const convertToUSD = (amount: number) => {
        return (amount / conversionRate).toFixed(2);
    };

    return (
        <>
            {loading && <Loader />}
            <ProductsFilter />
            <CurrencyConverter convertToUSD={convertToUSD} conversionRate={conversionRate} />
            <div className={styles.gridContainer}>
                {products.map((product) => (
                    <ProductsCard
                        key={product.id}
                        img={product.img}
                        dataItem={product}
                        t={t}
                    />
                ))}
            </div>
        </>
    );
}