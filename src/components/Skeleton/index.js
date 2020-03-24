import React, {Component} from 'react';
import styles from "./styles.scss";



class Card extends Component {
    render() {
        return (
            <div>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.title}></div>
                    </div>
                    <div className={styles.cardBody}>
                        <i className="fas fa-images fa-10x"/>
                    </div>
                    <div className={styles.cardFooter}>
                        <div className={styles.content}></div>
                        <i className="fas fa-download fa-lg"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;