import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cardPropType from '../config/card';
import ClassCard from './classCard';
import PlaylistCard from './playlistCard';
import ListWrapper from './listWrapper';

export default class CardList extends Component {

    render() {

        const { cards, isOnline, description, showVideo, offlineSync, large } = this.props;
        const Card = large ? ClassCard : PlaylistCard;

        return (
            <ListWrapper description={description} >
                { cards.map((card, i) => {
                    const drawBottomDivider = i < cards.length - 1;

                    return (
                        <Card key={i} card={card} isOnline={isOnline}
                                   showVideo={showVideo}
                                   drawBottomDivider={drawBottomDivider}
                                   offlineSync={offlineSync}
                        />
                    );
                }) }
            </ListWrapper>
        );
    }
}

CardList.propTypes = {
    cards: PropTypes.arrayOf(cardPropType).isRequired,
    isOnline: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    showVideo: PropTypes.func.isRequired,
    offlineSync: PropTypes.func.isRequired,
    large: PropTypes.bool
};