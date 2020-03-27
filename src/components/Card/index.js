import React, {Component} from 'react';
import styles from "./styles.scss";
import Skeleton from "../Skeleton";



class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            skeleton:"S",
        }
    }

    onload = () => {
        this.setState({loading: false,skeleton:""});
    };

    render() {
        let {author, download_url, width, height} = this.props;
        const {loading, skeleton}=this.state;
        return (
            <div>
                <div className={styles[`card${skeleton}`]}>
                    <div className={styles[`cardHeader${skeleton}`]}>
                        <div className={styles[`title${skeleton}`]} >
                            {loading?null:author}
                        </div>
                    </div>
                    <div className={styles[`cardBody${skeleton}`]}>
                        <img hidden={loading} src={download_url} onLoad={this.onload}
                             style={{height: "200px", width: `${width / (height / 200)}px`, overflow: "hidden"}}/>
                        {loading && <i className="fas fa-images fa-10x"/>}
                    </div>
                    <div className={styles[`cardFooter${skeleton}`]}>
                        <div className={styles[`content${skeleton}`]}>
                            {loading?null:"Original Size: "+width+"*"+height+"px"}
                        </div>
                        <a href={loading?"#":download_url}><i className="fas fa-download fa-lg"/></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;