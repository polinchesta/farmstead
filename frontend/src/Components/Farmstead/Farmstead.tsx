import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Data from '../../data/farmsteadData.json';
import ReactMarkdown from 'react-markdown';
import styles from './Farmstead.module.sass';
import { Page404 } from '../Page404/Page404';

interface FarmsteadType {
    id: string;
    img: string;
    title: string;
    text: string;
}

export function Farmstead() {
    const [markdown, setMarkdown] = useState('');
    const params = useParams();
    const prodId = params.id;
    const ElementData: FarmsteadType | undefined = Data.find((element) => element.id === prodId);

    if (typeof ElementData === "undefined") {
 
        return <Navigate to="*" />;
    }


    useEffect(() => {
        if (ElementData) {
            fetch(`../src/data/FarmSteadInfo/${ElementData.text}`)
                .then((res) => res.text())
                .then((text) => setMarkdown(text));
        }
    }, []);

    return (
        <section className={styles.farmstead}>
            <div className={styles.farmsteadText}>
                <ReactMarkdown children={markdown} />
            </div>
        </section>
    );
}
