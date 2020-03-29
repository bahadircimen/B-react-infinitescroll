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
            page: "1",
            photos: []
        }
    }

    async componentDidMount() {
        this.addTempData([]);
        this.fetchData([]);
    }

    // async componentDidUpdate(prevProps, prevState) {
    // burada tek değişkenin (page) değişimini izlediğin için ve bu değişken sadece scrollda değiştiği için
    // componentDidUpdate'te izlemek yerine değişkenin değiştiği yerde (handleScroll) bu işlemi yapabilirsin
    // if (this.state.page !== prevState.page) {
    // 	const photos = this.state.photos;
    // 	this.addTempData(photos);
    // 	this.fetchData(photos);
    // }
    // }

    addTempData = (photos) => {
        let tempData = new Array(13)
            .fill(0)
            .map(() => ({
                author: "",
                download_url: "",
                width: "",
                height: ""
            }))
        ;
        this.setState({photos: [...photos, ...tempData]});
    };

    fetchData = async (photos) => {
        let res = await store.getData({page: this.state.page});
        let data = res.data;
        this.setState({photos: [...photos, ...data]});
    };

    handleScroll = () => {
        const container = this.myRef.current;
        let scrollPercentage = 100 * container.scrollTop / (container.scrollHeight - container.clientHeight);
        if (scrollPercentage > 80 && scrollPercentage < 90) {
            this.setState({page: this.state.page * 1 + 1}, () => {
                console.log("new data fetching started");
                const photos = this.state.photos;
                this.addTempData(photos);
                this.fetchData(photos);
            });
        }
    };

    renderCard() {
        let {photos} = this.state;
        return photos.map((d, index) => {
            return (
                <div key={`image-card-${index}`} className={styles.colMd3}>
                    <Card
                        author={d.author}
                        download_url={d.download_url}
                        width={d.width}
                        height={d.height}
                    />
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
