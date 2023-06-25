import { useState, useEffect, SyntheticEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import Loader from '../../../ui/loader/loader';
import styles from './ItemFarmstead.module.sass';
import useTranslation from '../../../hooks/useTranslation';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { farmsteadActions } from '../../../store/farmstead/farmsteadSlice';
import { CommentType } from '../../../types/farmsteadsTypes';
import axios from 'axios';

export default function ItemFarmstead() {
    const dispatch = useAppDispatch();
    const [comments, setComments] = useState<CommentType[]>([]);
    const farmstead = useAppSelector((state) => state.farmstead.farmstead);
    const loading = useAppSelector((state) => state.farmstead.loading);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showVideoPopover, setShowVideoPopover] = useState(false);
    const { id } = useParams();
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const farmsteadId = +(id ?? -1);
    const navigate = useNavigate();
    const newCommentId = generateUUID();
    const [newComment, setNewComment] = useState<CommentType>({
        id: generateUUID(),
        content: ''
    });
    const handleClick = () => {
        navigate(`/farmstead`);
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (farmsteadId) {
            dispatch(farmsteadActions.getFarmstead(farmsteadId));
        }
    }, [farmsteadId]);



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

    function generateUUID(): number {
        return Date.now();
    }

    const handleCommentSubmit = async (newComment: CommentType) => {
        try {
          const response = await axios.post<CommentType>(
            `http://localhost:3002/farmsteads/${farmsteadId}/comments`,
            newComment
          );
      
          const addedComment = response.data;
          setComments((prevComments) => [...prevComments, addedComment]);
          setNewComment({
            id: generateUUID(),
            content: ''
          });
      
          setIsModalOpen(false);
        } catch (error) {
          console.error('Error adding comment:', error);
        }
      };
      
      console.log(farmsteadId)

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
                                                        className={`${styles.thumbnail} ${selectedImage === index
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
                                                    src={farmstead.image[selectedImage].img} alt="bigImage" />
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
                                        <p>{farmstead.adres}</p>
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
                                <h2>Комментарии:</h2>
                                {farmstead.comments.map((comment: { id: number, content: string }) => (
                                    <div key={comment.id}>
                                        <p>Комментарий: {comment.content}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    <button className={styles.button} onClick={handleOpenModal}>
                        Написать комментарий
                    </button>
                    {isModalOpen && (
                        <div className={styles.modal}>
                            <h3>Написать комментарий:</h3>
                            <input
                                type="text"
                                value={newComment.content}
                                onChange={(e) =>
                                    setNewComment({ ...newComment, content: e.target.value })
                                }
                                placeholder="Введите комментарий..."
                            />
                            <button onClick={() => handleCommentSubmit(newComment)}>Добавить</button>
                            <button onClick={() => setIsModalOpen(false)}>Отмена</button>
                        </div>
                    )}
                    <div className={styles.mapContainer}>
                        <MapContainer
                            center={[
                                farmstead.latitude,
                                farmstead.longitude,
                            ]}
                            zoom={10}
                            zoomControl={false}
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
