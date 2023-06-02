import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { farmsteadActions } from '../../../store/farmstead/farmsteadSlice';
import Loader from '../../../ui/loader/loader';
import styles from './ItemFarmstead.module.sass';
import useTranslation from '../../../hooks/useTranslation';

export default function ItemFarmstead() {
    const dispatch = useAppDispatch();
    const farmsteads = useAppSelector((state) => state.farmsteads.farmsteads);
    const loading = useAppSelector((state) => state.farmsteads.loading);
    const { id } = useParams();
    const { t } = useTranslation();
    const farmsteadId = +(id ?? 0);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/farmstead`);
    };
    useEffect(() => {
        if (farmsteadId) {
            dispatch(farmsteadActions.getFarmstead(farmsteadId));
        }
    }, [id]);

    const [selectedImage, setSelectedImage] = useState(null);

    const handleThumbnailClick = (index: any) => {
        setSelectedImage(index);
    };

    return (
        <div className={styles.container}>
            {loading && <Loader />}
            {farmsteads && (
                <>
                    <div className={styles.typeContainer}>
                        <button onClick={handleClick} className={styles.back}>
                            {t.back.button}
                        </button>
                        <div className={styles.type}>
                            <h2>{t.farmsteads[farmsteadId].title}</h2>
                            <div key={t.farmsteads[farmsteadId].textAll}>
                                <div className={styles.gallery}>
                                    <div className={styles.thumbnailContainer}>
                                        {farmsteads[farmsteadId].image.map((step, index) => (
                                            <div
                                                key={index}
                                                className={`${styles.thumbnail} ${selectedImage === index ? styles.activeThumbnail : ''
                                                    }`}
                                                onClick={() => handleThumbnailClick(index)}
                                            >
                                                <img className={styles.img} src={step.img} alt="thumbnail" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.bigImageContainer}>
                                        {selectedImage !== null && (
                                            <img
                                                className={styles.bigImage}
                                                src={farmsteads[farmsteadId].image[selectedImage].img}
                                                alt="bigImage"
                                            />
                                        )}
                                    </div>
                                </div>
                                <p className={styles.text}>{t.farmsteads[farmsteadId].textAll}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
