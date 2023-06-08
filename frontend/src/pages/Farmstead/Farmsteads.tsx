import React, { useEffect, useState } from 'react';
import styles from './Farmsteads.module.sass';
import useTranslation from '../../hooks/useTranslation';
import Loader from '../../ui/loader/loader';
import axios from 'axios';
import { useAppSelector } from '../../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { FarmsteadsType } from '../../types/farmsteadsTypes';
import CardFarmstead from './cardFarmstead/cardFarmstead';
import FarmsteadsFilter from './filter/farmsteadsFilter';
import CurrencyConverter from '../../ui/currency/currency';


export interface ConversionRates {
    usdToBynRate: number;
    eurToBynRate: number;
    plnToBynRate: number;
}

export function Farmsteads() {
    const farmsteads = useAppSelector((state) => state.farmsteads.farmsteads);
    const loading = useAppSelector((state) => state.farmsteads.loading);
    const { t } = useTranslation();
    const [conversionRate, setConversionRate] = useState<ConversionRates | null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState('BYN');


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

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(event.target.value);
    };

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

    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 100) {
            setShowScrollToTop(true);
        } else {
            setShowScrollToTop(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    return (
        <>
            {loading && <Loader />}
            <FarmsteadsFilter />
            <div className={styles.gridContainer}>
                {farmsteads.map((farmstead) => (
                    <CardFarmstead
                        key={farmstead.id}
                        img={farmstead.img}
                        dataItem={farmstead}
                        id={farmstead.id}
                        t={t}
                    />
                ))}
            </div>
            {showScrollToTop && (
                <div className={styles.scrollToTop} onClick={scrollToTop}>
                    &uarr;
                </div>
            )}
        </>
    );
}
