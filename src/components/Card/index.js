import React, {Component} from 'react';
import styles from "./styles.scss";



class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    render() {
        let {author,download_url,width,height}=this.props;
        return (
            <div>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        {author}
                    </div>
                    <div className={styles.cardBody}>
                        <img hidden={this.state.loading} src={download_url} alt="" onLoad={() => this.setState({ loading: false })}
                             style={{width: "280px", height: `${height / (width / 280)}px`}}/>
                        {this.state.loading && <i style={{padding:"20px"}} className="fas fa-images fa-10x"/>}
                    </div>
                    <div className={styles.cardFooter}>
                        Original Size: {width}*{height}px
                        <a href={download_url}><i className="fas fa-download fa-lg"/></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;