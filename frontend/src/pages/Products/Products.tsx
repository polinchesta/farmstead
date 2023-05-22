import React, { useEffect, useState } from 'react';
import ProductsCard from './cardProducts/cardProduct';
import styles from './products.module.sass';
import { useAppSelector } from '../../hooks/redux-hooks';
import ProductsFilter from './filter/productsFilter';
import Loader from '../../ui/loader/loader';
import useTranslation from '../../hooks/useTranslation';
import { CurrencyConverter } from '../../ui/currency/currency';
import axios from 'axios';

export interface ConversionRates {
  usdToBynRate: number;
  eurToBynRate: number;
  plnToBynRate: number;
}

export function Products() {
  const products = useAppSelector((state) => state.products.products);
  const loading = useAppSelector((state) => state.products.loading);
  const { t } = useTranslation();
  const [conversionRate, setConversionRate] = useState<ConversionRates | null>(null);

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const cachedConversionRate = localStorage.getItem('conversionRate');
        if (cachedConversionRate) {
          setConversionRate(JSON.parse(cachedConversionRate));
        } else {
          const response = await axios.get('https://v6.exchangerate-api.com/v6/9e01f749e605de6a06421c20/latest/BYN');
          const usdToBynRate = response.data.conversion_rates.USD;
          const eurToBynRate = response.data.conversion_rates.EUR;
          const plnToBynRate = response.data.conversion_rates.PLN;
          const conversionRate = { usdToBynRate, eurToBynRate, plnToBynRate };
          setConversionRate(conversionRate);
          localStorage.setItem('conversionRate', JSON.stringify(conversionRate));
        }
      } catch (error) {
        console.error('Failed to fetch conversion rate:', error);
      }
    };

    fetchConversionRate();
  }, []);


  const convertToUSD = (amount: number) => {
    if (conversionRate) {
      return (amount * conversionRate.usdToBynRate).toFixed(2);
    }
    return '';
  };

  const convertToPLN = (amount: number) => {
    if (conversionRate) {
      return (amount * conversionRate.plnToBynRate).toFixed(2);
    }
    return '';
  };

  const convertToEUR = (amount: number) => {
    if (conversionRate) {
      return (amount * conversionRate.eurToBynRate).toFixed(2);
    }
    return '';
  };

  return (
    <>
      {loading && <Loader />}
      {conversionRate !== null && (
        <CurrencyConverter
          convertToUSD={convertToUSD}
          convertToPLN={convertToPLN}
          convertToEUR={convertToEUR}
          conversionRate={conversionRate}
        />
      )}
      <ProductsFilter />
      <div className={styles.gridContainer}>
        {products.map((product) => (
          <ProductsCard key={product.id} img={product.img} dataItem={product} t={t} />
        ))}
      </div>
    </>
  );
}
