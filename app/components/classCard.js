import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet
} from 'react-native';

import cardPropType from '../config/card';
import OfflineCard from './offlineCard';
import VideoCard from './videoCard';
import SyncButton from './syncButton';
import CardHeader from './cardHeader';
import colors from '../styles/colors';

export default class ClassCard extends Component {

    render() {

        let { card, drawBottomDivider, showVideo, isOnline, offlineSync } = this.props;

        let containerStyle = [styles.container];
        if (drawBottomDivider) {
            containerStyle.push(styles.cardBottomDivider);
        }

        return (
            <View style={ containerStyle } key={card.order}>
                <CardHeader title={card.title} description={card.description} large/>
                {
                    isOnline &&
                    <SyncButton isLocal={card.isLocal}
                                isDownloading={card.isDownloading}
                                sync={() => offlineSync(card, true)}
                                remove={() => offlineSync(card, false)} large/>
                }
                {
                    (isOnline || card.isLocal) &&
                    <VideoCard onCardPress={showVideo} card={card} large/>
                }
                {
                    !isOnline && !card.isLocal &&
                    <OfflineCard large/>
                }
            </View>
        );
    }
}

ClassCard.propTypes = {
    card: cardPropType.isRequired,
    drawBottomDivider: PropTypes.bool,
    isOnline: PropTypes.bool.isRequired,
    offlineSync: PropTypes.func.isRequired,
    showVideo: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
        marginLeft: 28,
        marginRight: 28,
        marginBottom: 15,
    },
    cardBottomDivider: {
        borderBottomWidth: 1,
        borderBottomColor: colors.lighterGray
    }
});
