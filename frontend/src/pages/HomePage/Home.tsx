import { Link, useParams } from 'react-router-dom';
import styles from './Home.module.sass';
import useTranslation from '../../hooks/useTranslation';
import { MyImageSlider } from '../../ui/carousel/carousel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useAppSelector } from '../../hooks/redux-hooks';
import { FarmsteadsType } from '../../types/farmsteadsTypes';
import getTopFarmstead from '../../api/farmstead/getTopFarmstead';

export function Home() {
    const { t } = useTranslation();
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [topFarmsteads, setTopFarmsteads] = useState<FarmsteadsType[]>([]);

    const [formData, setFormData] = useState({
        email: '',
        topic: '',
        message: '',
    });

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };


    useEffect(() => {
        const fetchTopFarmsteads = async () => {
            try {
                const response = await getTopFarmstead({ sortField: 'topDesc', query: '', limit: 5 });
                const sortedFarmsteads = response.data.sort((a, b) => b.top - a.top);
                const topFiveFarmsteads = sortedFarmsteads.slice(0, 5);
                setTopFarmsteads(topFiveFarmsteads);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTopFarmsteads();
    }, []);


    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/messages', formData);
            setFormData({
                email: '',
                topic: '',
                message: '',
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

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
        <div>
            <MyImageSlider />
            <div className={styles.location}>
                <nav>
                    <Link className={styles.block} to="/grodno">
                        {t.main.button.grodnoRegion}
                    </Link>
                </nav>
            </div>
            <div className={styles.flexDiv}>
                <div className={styles.news}>
                    <h4>{t.main.rightInformation.news}</h4>
                    <p>{t.main.rightInformation.aboutNews}</p>
                    <img src={'/promo.svg'} alt="WebSite Logo" />
                    <h4>{t.main.rightInformation.connect}</h4>
                    <p>
                        {t.main.rightInformation.email}:
                        <a href="mailto:polinchesta@gmail.com">polinchesta@gmail.com</a>
                    </p>
                    <p>GitHub: https://github.com/polinchesta</p>
                    <p>Telegram: @polinchesta</p>
                    <h4>{t.main.rightInformation.aboutMessage}</h4>
                    <form className={styles.form} onSubmit={handleFormSubmit}>
                        <label>{t.main.rightInformation.email}</label>
                        <input
                            className={styles.mail}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <label>{t.main.rightInformation.aboutMessage}</label>
                        <input
                            className={styles.topic}
                            type="text"
                            name="topic"
                            value={formData.topic}
                            onChange={handleInputChange}
                        />
                        <label>{t.main.rightInformation.message}</label>
                        <textarea
                            className={styles.message}
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                        />
                        <input
                            className={styles.button}
                            type="submit"
                            value={t.main.rightInformation.send}
                        />
                    </form>
                </div>
                <div className={styles.farmstead}>
                    <h4>{t.main.leftInformation.top}</h4>
                    <Slider {...settings}>
                        {topFarmsteads.map((farmstead) => (
                            <div key={farmstead.id} className={styles.caption}>
                                <p>{farmstead.title}</p>
                                <p>{t.main.leftInformation.rating}: {farmstead.top}</p>
                                <img src={farmstead.img} className={styles.image} alt={farmstead.title} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <h4 className={styles.videoText}>{t.main.information.why}</h4>
            <iframe
                className={styles.video}
                src="https://www.youtube-nocookie.com/embed/L7b5nAL5mFY"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            {showScrollToTop && (
                <div className={styles.scrollToTop} onClick={scrollToTop}>
                    &uarr;
                </div>
            )}
        </div>
    );
}
