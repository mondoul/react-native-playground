import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet
} from 'react-native';

import OfflineCard from './offlineCard';
import VideoCard from './videoCard';
import SyncButton from './syncButton';
import CardHeader from './cardHeader';
import colors from '../styles/colors';

class ClassCard extends Component {

    render() {

        let { card, drawBottomDivider, showVideo, isOnline, offlineSync } = this.props;

        let containerStyle = [styles.container];
        if (drawBottomDivider) {
            containerStyle.push(styles.cardBottomDivider);
        }

        return (
            <View style={ containerStyle } key={card.order}>
                <CardHeader title={card.title} description={card.description}/>
                {
                    isOnline &&
                    <SyncButton isLocal={card.isLocal}
                                isDownloading={card.isDownloading}
                                sync={() => offlineSync(card.id, true)}
                                remove={() => offlineSync(card.id, false)}/>
                }
                {
                    (isOnline || card.isLocal) &&
                    <VideoCard onCardPress={showVideo} card={card}/>
                }
                {
                    !isOnline && !card.isLocal &&
                    <OfflineCard />
                }
            </View>
        );
    }
}

ClassCard.propTypes = {
    card: PropTypes.object,
    drawBottomDivider: PropTypes.bool,
    isOnline: PropTypes.bool,
    offlineSync: PropTypes.func,
    showVideo: PropTypes.func
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

export default ClassCard;