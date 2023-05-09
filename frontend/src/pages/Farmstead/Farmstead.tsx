import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Data from '../../data/farmsteadData.json';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import styles from './farmstead.module.sass';
import useTranslation from '../../hooks/useTranslation';

interface Farmstead {
    id: string;
    text: string;
}

export function Farmstead() { 
    const { t } = useTranslation(); 
    const Token = localStorage.getItem('token');
    const [markdown, setMarkdown] = useState('');
    const params = useParams();
    const prodId = params.id;
    const [heartState, setHeartState] = useState(localStorage.getItem(`Heart_${prodId}`));
    const ElementData: Farmstead | undefined = Data.find((element) => element.id === prodId);

    if (typeof ElementData === "undefined") {
 
        return <Navigate to="*" />;
    }

    const handleHeart = () => {
        const newState = heartState ? "" : "true"
        localStorage.setItem(`Heart_${prodId}`, newState)
        setHeartState(newState)
    };

    useEffect(() => {
        if (ElementData) {
            fetch(`../../../public/farmSteadInfo/${ElementData.text}`)
                .then((res) => res.text())
                .then((text) => setMarkdown(text));
        }
    }, []);

    return (
        <section className={styles.farmstead}>
            <div className={styles.farmsteadText}>
                <svg width="25" height="50" viewBox="0 0 22 23" style={{display: `${Token? "block" : "none"}`, color: `${Token? "red" : "white" }`}} fill={`${heartState? "red" : "white"}`} xmlns="http://www.w3.org/2000/svg" onClick ={() => {handleHeart()}}>
                    <path d="M10.9979 22.1798C10.9288 22.0895 10.8516 21.988 10.767 21.8761C10.3718 21.3538 9.81408 20.6036 9.16484 19.6939C7.86538 17.8731 6.20378 15.4192 4.74632 12.8764C3.28337 10.324 2.04911 7.72115 1.57392 5.59412C1.33617 4.52991 1.29942 3.63104 1.48262 2.93369C1.65942 2.26072 2.04243 1.76188 2.70954 1.45399C4.21573 0.758829 6.15097 1.28456 7.82762 2.10114C8.64622 2.49982 9.36323 2.9483 9.87651 3.29815C10.1326 3.47271 10.3367 3.62183 10.4759 3.72662C10.5455 3.77899 10.5988 3.82022 10.6341 3.84794L10.6735 3.87908L10.6828 3.88647L10.6847 3.88803L10.6848 3.88813L10.685 3.88824L10.685 3.88826L10.9975 4.14211L11.312 3.89075L11.3121 3.89071L11.3122 3.89059L11.3123 3.89055L11.3141 3.88913L11.3228 3.88224L11.3604 3.85303C11.3942 3.82697 11.4453 3.78812 11.5122 3.7387C11.646 3.63981 11.8427 3.4988 12.0906 3.33322C12.5874 3.00144 13.2852 2.57413 14.0914 2.18933C15.7336 1.4055 17.6947 0.860995 19.3255 1.46855C20.0117 1.72422 20.3981 2.17762 20.5815 2.80366C20.7738 3.46004 20.7476 4.33112 20.5146 5.38417C20.0493 7.4869 18.809 10.1047 17.3323 12.6895C15.8614 15.264 14.1798 17.7651 12.8636 19.6253C12.2061 20.5547 11.6408 21.3225 11.2402 21.8576C11.151 21.9768 11.0699 22.0845 10.9979 22.1798Z" stroke="white"/>
                </svg>
                <p className={styles.heart} style={{display: `${Token? "block" : "none"}`}}>10k</p>
                <ReactMarkdown rehypePlugins={[rehypeRaw]} children={markdown}></ReactMarkdown>
            </div>
        </section>
    );
}
