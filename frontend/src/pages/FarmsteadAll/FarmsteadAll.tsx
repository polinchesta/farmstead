import ReactMarkdown from 'react-markdown';
import styles from './farmsteadAll.module.sass';
import { Card} from '../cardFarmstead/cardFarmstead';
import date from '../../data/cardData.json';

export function FarmsteadAll() {


    return (
        <div className={styles.flexContainer}>
            <h4>Агроусадьбы</h4>
            {date.map((card, index) => (
                <Card
                    key={index}
                    date={card.date}
                    img={card.img}
                    minutsForRead={card.minutsForRead}
                    text={card.text}
                    title={card.title}
                    read={card.read}
                    id={index}
                />
            ))}
            
        </div>
    );
}
