import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.sass';

export function Home() {
    return (
        <div>
            <div className={styles.location}>
                <nav>
                    <Link className={styles.block} to="/grodno">
                        📍 Гродненская область
                    </Link>
                </nav>
            </div>
        </div>
    );
}
