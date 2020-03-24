import React, {Component, Fragment, useEffect, useState} from 'react';
import styles from "./styles.scss";
import store from "../store";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page:"1",
            photos:[],
            loading:false,
        }
    }

    handleScroll = () => {
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
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
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    renderSkeleton() {
        let dummyPhotos = [];
        for (let i=1; i<13; i++)
            dummyPhotos.push(i);
        return dummyPhotos.map(d => {
            return (
                <div key={d} className={styles.colMd3}>
                    <Skeleton/>
                </div>
            );
        });
    }

    renderCard() {
        let {photos} = this.state;
        return photos.map((d,index) => {
            return (
                <div key={index} className={styles.colMd3}>
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
                <div className={styles.container}>
                    <div className={styles.row}>
                        {this.renderCard()}
                        {(this.state.loading || !this.state.photos.length) && this.renderSkeleton()}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MainContainer;
