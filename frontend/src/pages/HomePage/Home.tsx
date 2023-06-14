import { Link, useParams } from 'react-router-dom';
import styles from './Home.module.sass';
import useTranslation from '../../hooks/useTranslation';
import { MyImageSlider } from '../../ui/carousel/carousel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { farmsteadsActions } from '../../store/topFarmstead/top';


export function Home() {
    const { t } = useTranslation();
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const dispatch = useAppDispatch();
/*     const topFarmsteads = useAppSelector((state) => state.farmsteads.topFarmsteads);
 */    const { id } = useParams();
    const farmsteadId = +(id ?? 0);

/*     useEffect(() => {
        if (farmsteadId) {
            dispatch(farmsteadsActions.getTopFarmsteads(farmsteadId));
        }
    }, [id]); */

    const [formData, setFormData] = useState({
        email: '',
        topic: '',
        message: '',
    });


    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/messages', formData);
            console.log(response.data);
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
                <h4>{t.main.leftInformation.latestPosts}</h4>
                <div>
                    <h4>Farmsteads by Rating:</h4>
{/*                     {topFarmsteads.map((farmstead) => (
                        <li key={farmstead.id}>
                            <Link to={`/farmsteads/${farmstead.id}`}>{farmstead.name}</Link>
                        </li>
                    ))} */}
                </div>
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
