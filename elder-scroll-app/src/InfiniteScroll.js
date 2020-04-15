import React, { Component } from 'react';
import Deck from './Deck.js';
import './InfiniteScroll.css'
import Loader from 'react-loader-spinner';

export default class InfiniteScroll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            sizePerPage: 20,
            page: 1,
            data: []
        };
        window.onscroll = (() => {
            this.loadMore();
        });
    }

    componentDidMount() {
        this.loadCard();
    }

    loadCard = () => {
        let jsonArr = [];
        const url = `https://api.elderscrollslegends.io/v1/cards?`;
        this.setState({ isLoading: true });
        fetch(url)
            .then(response => response.json())
            .then(json => {
                for (var i = 0; i < json.cards.length; i++) {
                    jsonArr.push(json.cards[i]);
                }
                this.setState({
                    isLoading: false,
                    data: jsonArr.slice(0, this.state.sizePerPage * this.state.page)
                })
            })
    };

    loadMore = () => {
        if (
            window.outerHeight + document.documentElement.scrollTop
            >= document.documentElement.offsetHeight
        ) {
            this.setState({
                page: this.state.page + .5
            })
            this.loadCard();
        }
    }

    render() {

        const {
            isLoading,
            data
        } = this.state;

        return (
            <div>
                <div className="es-title">The Elder Scrolls</div>
                {isLoading ?
                    <div className='loader'>
                        <Loader type="ThreeDots" color="cornflowerblue" height="350" width="350" />
                    </div> : <Deck value={data}></Deck>}
            </div>
        )
    }
}