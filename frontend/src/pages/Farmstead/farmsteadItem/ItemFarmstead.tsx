import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { farmsteadActions } from '../../../store/farmstead/farmsteadSlice';
import Loader from '../../../ui/loader/loader';
import styles from './ItemFarmstead.module.sass';
import useTranslation from '../../../hooks/useTranslation';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
    }, [farmsteadId]);

    const [selectedImage, setSelectedImage] = useState(0);

    const handleThumbnailClick = (index: number) => {
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
                                        {t.farmsteads[farmsteadId].image.map((step: { img: string }, index: number) => (
                                            <div
                                                key={index}
                                                className={`${styles.thumbnail} ${selectedImage === index ? styles.activeThumbnail : ''}`}
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
                                                src={t.farmsteads[farmsteadId].image[selectedImage].img}
                                                alt="bigImage"
                                            />
                                        )}
                                    </div>
                                </div>
                                <p className={styles.text}>{t.farmsteads[farmsteadId].textAll}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mapContainer}>
                        <MapContainer
                            center={[parseFloat(t.farmsteads[farmsteadId].latitude), parseFloat(t.farmsteads[farmsteadId].longitude)]}
                            zoom={10}
                            style={{ height: '400px', width: '100%' }}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker
                                position={[parseFloat(t.farmsteads[farmsteadId].latitude), parseFloat(t.farmsteads[farmsteadId].longitude)]}
                            />
                        </MapContainer>
                    </div>
                </>
            )}
        </div>
    );
}
