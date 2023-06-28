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
import { commentActions } from '../../../store/comments/comment';
import axios from 'axios';
import { useIsAuthenticated } from "react-auth-kit";

export default function ItemFarmstead() {
    const dispatch = useAppDispatch();
    const [comments, setComments] = useState<CommentType[]>([]);
    const farmstead = useAppSelector((state) => state.farmstead.farmstead);
    const commentsInfo = useAppSelector((state) => state.comment.comment) ?? [];
    const loading = useAppSelector((state) => state.farmstead.loading);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showVideoPopover, setShowVideoPopover] = useState(false);
    const { id } = useParams();
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const farmsteadId = +(id ?? -1);
    const navigate = useNavigate();
    const currentFarmsteadId = farmsteadId;
    const isAuthenticated = useIsAuthenticated();
    const [newComment, setNewComment] = useState<CommentType>({
        id: generateUUID(),
        farmsteadId: farmsteadId,
        content: '',
        date: ''
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
            dispatch(commentActions.getComment(farmsteadId));
        }
    }, [dispatch, farmsteadId]);



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
            const currentDate = new Date().toISOString();
            const updatedComment = { ...newComment, date: currentDate };
            const response = await axios.post(
                `http://localhost:3002/comments`,
                updatedComment
            );

            const addedComment = response.data;
            setComments((prevComments) => [...prevComments, addedComment]);
            setNewComment({
                id: generateUUID(),
                farmsteadId: farmsteadId,
                content: '',
                date: ''
            });

            setIsModalOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
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
                                        <p>{farmstead.place} спальных мест</p>
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
                    <div className={styles.comments}>
                        <div className={styles.blockComment}>
                            <h2>{t.comment.comment}</h2>
                            {isAuthenticated() && (
                                <button className={styles.button} onClick={handleOpenModal}>
                                    {t.comment.write}                                </button>)}
                        </div>
                        {commentsInfo.length === 0 ? (
                            <p>{t.comment.nocomment}
                            </p>
                        ) : (
                            commentsInfo
                                .filter((comment) => comment.farmsteadId === currentFarmsteadId)
                                .map((comment) => (
                                    <div key={comment.id}>
                                        <p className={styles.comment}>{comment.content}</p>
                                        <p className={styles.commentDate}>{new Date(comment.date).toLocaleDateString()}</p>
                                    </div>
                                ))
                        )}
                    </div>

                    {isModalOpen && (
                        <div className={styles.modal}>
                            <h3>{t.comment.write}</h3>
                            <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>&times;</button>
                            <textarea
                                value={newComment.content}
                                onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                                placeholder={t.comment.input}
                                className={styles.textarea}
                            />
                            <button className={styles.button} onClick={() => handleCommentSubmit(newComment)}>Добавить</button>
                        </div>
                    )}
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
