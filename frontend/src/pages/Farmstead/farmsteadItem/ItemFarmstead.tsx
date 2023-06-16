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
    const farmstead = useAppSelector((state) => state.farmstead.farmstead);
    const loading = useAppSelector((state) => state.farmstead.loading);
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

    const [selectedImage, setSelectedImage] = useState(0);
    const [showVideoPopover, setShowVideoPopover] = useState(false);

    const handleThumbnailClick = (index: number) => {
        setSelectedImage(index);
    };

    const handlePopoverClick = () => {
        setShowVideoPopover(true);
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
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={styles.container}>
            {loading && <Loader />}
            {farmstead && (
                <>
                    <div className={styles.typeContainer}>
                        <button onClick={handleClick} className={styles.back}>
                            {t.back.button}
                        </button>
                        <div className={styles.type}>
                            <h2>{farmstead.title}</h2>
                            <div key={farmstead.textAll}>
                                <div className={styles.block}>
                                    <div className={styles.gallery}>
                                        <div className={styles.thumbnailContainer}>
                                            {farmstead.image.map(
                                                (step: { img: string }, index: number) => (
                                                    <div
                                                        key={index}
                                                        className={`${styles.thumbnail} ${
                                                            selectedImage === index
                                                                ? styles.activeThumbnail
                                                                : ''
                                                        }`}
                                                        onClick={() => handleThumbnailClick(index)}>
                                                        <img
                                                            className={styles.img}
                                                            src={step.img}
                                                            alt="thumbnail"
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <div className={styles.bigImageContainer}>
                                            {selectedImage !== null && (
                                                <img
                                                    className={styles.bigImage}
                                                    src={
                                                        farmstead.image[selectedImage]
                                                            .img
                                                    }
                                                    alt="bigImage"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles.contacts}>
                                        <h3>{t.infoFarmstead.info}</h3>
                                        <p>{farmstead.price} BYN/ночь/с человека</p>
                                        <p>{farmstead.house}</p>
                                        <p>{farmstead.place}</p>
                                        <p>{farmstead.contact}</p>
                                        <p>{farmstead.email}</p>
                                        {farmstead.url && (
                                            <div
                                                className={styles.videoPopover}
                                                onClick={handlePopoverClick}>
                                                <p className={styles.videoIcon}>
                                                    ▶ {t.video.watch}
                                                </p>
                                                {showVideoPopover && (
                                                    <>
                                                        {loading && <Loader />}
                                                        <div
                                                            className={styles.popoverOverlay}></div>
                                                        <div className={styles.videoContainer}>
                                                            <button
                                                                className={styles.closeButton}
                                                                onClick={handleVideoClose}>
                                                                &times;
                                                            </button>
                                                            <iframe
                                                                className={styles.video}
                                                                src={farmstead.url}
                                                                title={
                                                                    farmstead
                                                                        .titleVideo
                                                                }
                                                                frameBorder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen></iframe>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className={styles.text}>{farmstead.textAll}</p>
                            </div>
                        </div>
                    </div>
                    {farmstead && (
                        <>
                            <div className={styles.comments}>
                                {/* <h2>Комментарии:</h2>
                                {t.farmsteads[farmsteadId]?.comments.map((comment: { id: number, author: string, content: string }) => (
                                    <div key={comment.id}>
                                        <p>Автор: {comment.author}</p>
                                        <p>Комментарий: {comment.content}</p>
                                    </div>
                                ))} */}
                            </div>
                        </>
                    )}

                    <div className={styles.mapContainer}>
                        <MapContainer
                            center={[
                                farmstead.latitude,
                                farmstead.longitude,
                            ]}
                            zoom={10}
                            style={{ height: '400px', width: '100%' }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker
                                position={[
                                    farmstead.latitude,
                                    farmstead.longitude,
                                ]}
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
