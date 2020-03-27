import React, {Component, Fragment} from 'react';
import styles from "./styles.scss";
import store from "../store";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            page:"1",
            photos:[],
            loading:true,
        }
    }

    handleScroll = () => {
        this.myRef.current.scrollTop+this.myRef.current.clientHeight === this.myRef.current.scrollHeight
            ?this.setState({page:this.state.page*1+1})
            :null;
    };

    async componentDidMount() {
        this.setState({ loading: true });
        let res = await store.getData({page:this.state.page});
        let data = res.data;
        this.setState({photos:[...this.state.photos,...data],loading:false});
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.page !== prevState.page)
        {this.setState({ loading: true });
        let res = await store.getData({page:this.state.page});
        let data = res.data;
        this.setState({photos:[...this.state.photos,...data],loading:false});}

    }

    renderCard() {
        let {photos} = this.state;
        return photos.map((d,index) => {
            return (
                <div key={index} className={styles.colMd3}>
                    { this.state.loading ?<Card/>:
                        <Card
                            author={d.author}
                            download_url={d.download_url}
                            width={d.width}
                            height={d.height}
                        />
                    }
                </div>
            );
        });
    }

    render() {
        return (
            <Fragment>
                <div onScroll={this.handleScroll} ref={this.myRef} className={styles.container}>
                    <div className={styles.row}>
                        {this.renderCard()}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MainContainer;
