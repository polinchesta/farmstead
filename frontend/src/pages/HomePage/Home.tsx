import { Link } from 'react-router-dom';
import styles from './home.module.sass';
import farmstead from '../../data/cardData.json';
import useTranslation from '../../hooks/useTranslation';
import { MyImageSlider } from '../../ui/carousel/carousel';
import CardFarmstead from '../Farmstead/cardFarmstead/cardFarmstead';
import { Farmsteads } from '../Farmstead/Farmsteads';

export function Home() {
    const { t } = useTranslation();
    const filterDate = farmstead.filter((element, index) => index < 4)

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
                <div className={styles.flexContainer}>
                    <h4>{t.main.leftInformation.latestPosts}</h4>
                    <Farmsteads />
                </div>
                <div className={styles.news}>
                    <h4>{t.main.rightInformation.news}</h4>
                    <p>
                        {t.main.rightInformation.aboutNews}
                    </p>
                    <img src={'/promo.svg'} alt="WebSite Logo" />
                    <h4>{t.main.rightInformation.connect}</h4>
                    <p>{t.main.rightInformation.email}: polinchesta@gmail.com</p>
                    <p>GitHub: https://github.com/polinchesta</p>
                    <p>Telegram: @polinchesta</p>
                    <h4>{t.main.rightInformation.aboutMessage}</h4>
                    <form className={styles.form}>
                        <label>
                            {t.main.rightInformation.email}
                        </label>
                        <input className={styles.mail} type="email" name="mail" />
                        <label>
                            {t.main.rightInformation.aboutMessage}
                        </label>
                        <input className={styles.topic} type="text" name="topic" />
                        <label>
                            {t.main.rightInformation.message}
                        </label>
                        <textarea className={styles.message} name="message" />
                        <input className={styles.button} type="submit" value={t.main.rightInformation.send} />
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
        </div>
    )
}
