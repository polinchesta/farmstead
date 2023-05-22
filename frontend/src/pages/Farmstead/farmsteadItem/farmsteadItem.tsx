import styles from './farmsteadItem.module.sass';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect } from "react";
import { YMaps, Map } from "react-yandex-maps";
import { farmsteadActions } from '../../../store/farmstead/farmsteadSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import Loader from '../../../ui/loader/loader';
import { FarmsteadType } from '../../../types/farmsteadsTypes';
import useTranslation from '../../../hooks/useTranslation';

export default function ItemFarmstead() {
    const dispatch = useAppDispatch();
    const farmstead = useAppSelector((state) => state.farmstead.farmstead);
    const loading = useAppSelector((state) => state.farmstead.loading);
    const { id } = useParams();
    const { t } = useTranslation();
    const farmsteadId = +(id ?? 0);

    useEffect(() => {
        if (farmsteadId) {
            dispatch(farmsteadActions.getFarmstead(farmsteadId));
        }
    }, [id]);

    const currentFarmstead = farmstead && farmstead.find((item) => item.id === farmsteadId);

    return (
        <div className={styles.container}>
            {loading && <Loader />}
            {currentFarmstead && (
                <section className={styles.farmstead}>
                    <h2>{t.farmstead[currentFarmstead.id].title}</h2>
                    {t.farmstead[currentFarmstead.id]?.farmstead && (
                        <div>
                            {currentFarmstead.farmstead.map((item: FarmsteadType, index: number) => (
                                <div key={item.textAll}>
                                    <p className={styles.text}>
                                        {item.textAll}
                                    </p>
                                    <div className={styles.image}>
                                        <img src={item.img} alt="img" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}


                    {/*                     {t.farmstead[currentFarmstead.id].farmstead.map((item, index) => (
                        <div key={index}>
                            <p className={styles.text}>
                                {item.textAll}
                            </p>
                            <div className={styles.image}>
                                <img src={item.img} alt={`${index + 1}`} />
                            </div>
                        </div>
                    ))} */}
                </section>
            )}
        </div>
    );
}
