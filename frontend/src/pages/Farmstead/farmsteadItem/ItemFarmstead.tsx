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
    const [load, setLoad] = useState(false);
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
    const [showVideoPopover, setShowVideoPopover] = useState(false);

    const handleThumbnailClick = (index: number) => {
        setSelectedImage(index);
    };

    const handlePopoverClick = () => {
        setShowVideoPopover(true);
        setLoad(true);
    };

    const handleVideoClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setShowVideoPopover(false);
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
                                <div className={styles.block}>
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
                                    <div className={styles.contacts}>
                                        <h3>{t.infoFarmstead.info}</h3>
                                        <p>{t.farmsteads[farmsteadId].price}</p>
                                        <p>{t.farmsteads[farmsteadId].house}</p>
                                        <p>{t.farmsteads[farmsteadId].place}</p>
                                        <p>{t.farmsteads[farmsteadId].contact}</p>
                                        <p>{t.farmsteads[farmsteadId].email}</p>
                                        {t.farmsteads[farmsteadId].url && (
                                            <div className={styles.videoPopover} onClick={handlePopoverClick}>
                                                <p className={styles.videoIcon}>▶ {t.video.watch}</p>
                                                {showVideoPopover && (
                                                    <>
                                                        {loading && (
                                                            <div className={styles.loader}>
                                                                <div className={styles.spinner}></div>
                                                            </div>
                                                        )}
                                                        <div className={styles.popoverOverlay}></div>
                                                        <div className={styles.videoContainer}>
                                                            <button className={styles.closeButton} onClick={handleVideoClose}>
                                                                &times;
                                                            </button>
                                                            <iframe
                                                                className={styles.video}
                                                                src={t.farmsteads[farmsteadId].url}
                                                                title={t.farmsteads[farmsteadId].titleVideo}
                                                                frameBorder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                            ></iframe>
                                                        </div>
                                                    </>
                                                )}

                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className={styles.text}>{t.farmsteads[farmsteadId].textAll}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mapContainer}>
                        <MapContainer
                            center={[t.farmsteads[farmsteadId].latitude, t.farmsteads[farmsteadId].longitude]}
                            zoom={10}
                            style={{ height: '400px', width: '100%' }}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker
                                position={[t.farmsteads[farmsteadId].latitude, t.farmsteads[farmsteadId].longitude]}
                            />
                        </MapContainer>
                    </div>
                    {showScrollToTop && (
                        <div className={styles.scrollToTop} onClick={scrollToTop}>
                            &uarr;
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
