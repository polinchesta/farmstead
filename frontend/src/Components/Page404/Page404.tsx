import React from 'react';
import monster from '../../assets/monster.svg';
import styles from './Page404.module.sass'

export function Page404() {
  return (
    <div className={styles.error}>
      <img src={monster} alt="WebSite Logo" />
    </div>
  )
}
