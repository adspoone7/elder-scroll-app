import React, { Component } from 'react';
import './Deck.css'

export default class Deck extends Component {

    constructor(props) {
        super(props);
        this.state = {
            match: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    filterCardData = (e) => {
        let currentList = [];
        let updatedList = [];

        if (e.target.value !== "") {
            const cardList = this.props;

            cardList.value.map(cardNames => { return currentList.push(cardNames.name) });

            updatedList = currentList.filter(item => {
                const cardName = item.toLowerCase()
                const filter = e.target.value.toLowerCase();
                return cardName.includes(filter);
            });

        } else {
            updatedList = currentList;
        }
        return updatedList;
    }

    findMatches = (filteredList) => {
        let propData = this.props;
        let matchList = [];
        filteredList.forEach(element => {
            matchList.push(propData.value.find(({ name }) => name === element))
        });
        return matchList;
    }

    handleChange(e) {
        let filteredData = this.filterCardData(e);
        let foundMatches = this.findMatches(filteredData);
        this.setState({ match: foundMatches });
    }

    componentDidMount() {
        this.setState({
            match: this.props.value
        });
    }

    renderCards = () => {
        let matchData = this.state.match;
        let propData = this.props.value;
        let cardData = (matchData.length !== 0) ? matchData : propData;
        if (cardData) {
            const card = cardData.map(data => {
                return (
                    <div className='container'>
                        <img alt='' src={data.imageUrl} />
                        <div className="card-rarity">{data.rarity}</div>
                        <div className="card-name">{data.name}</div>
                        <div className="card-description">{data.text}</div>
                        <div className="card-set-name">{data.set.name}</div>
                        <div className="card-type">{data.type}</div>
                    </div>
                )
            })
            return card;
        }
    }

    render() {
        return (
            <div>
                <div className="searchbar-container">
                    <input type="search" className="searchbar" id='search-bar-field' onChange={this.handleChange} placeholder="Search by name here..." />
                </div>
                <div className="cards">
                    {this.renderCards()}
                </div>
            </div>
        )
    }
}