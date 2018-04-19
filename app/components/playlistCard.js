import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import colors from '../styles/colors';
import OfflineCard from './offlineCard';
import CardHeader from './cardHeader';
import SyncButton from './syncButton';
import VideoCard from './videoCard';
import PropTypes from 'prop-types';

export default class PlaylistCard extends Component {
    render() {
        const { card, drawBottomDivider, showVideo, isOnline, offlineSync } = this.props;

        let containerStyle = [styles.container];
        if (drawBottomDivider)
            containerStyle.push(styles.cardBottomDivider);

        return (
            <View style={containerStyle} key={card.order}>
                <View style={styles.videoCardWrapper}>
                    {
                        (isOnline || card.isLocal) &&
                        <VideoCard onCardPress={showVideo} card={card} small/>
                    }
                    {
                        !isOnline && !card.isLocal &&
                        <OfflineCard small/>
                    }
                </View>
                <CardHeader title={card.title}
                            description={card.description}
                            small/>
                {
                    isOnline &&
                    <SyncButton isLocal={card.isLocal}
                                isDownloading={card.isDownloading}
                                sync={() => offlineSync(card.id, true)}
                                remove={() => offlineSync(card.id, false)} small/>
                }
                {
                    !isOnline && <View style={styles.syncFiller} />
                }
            </View>
        );
    }
}

PlaylistCard.propTypes = {
    card: PropTypes.object,
    drawBottomDivider: PropTypes.bool,
    isOnline: PropTypes.bool,
    offlineSync: PropTypes.func,
    showVideo: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 15,
        paddingBottom: 15
    },
    cardBottomDivider: {
        borderBottomWidth: 1,
        borderBottomColor: colors.lighterGray
    },
    videoCardWrapper: {
        flex: 1.13
    },
    syncFiller: {
        flex: 0.15
    }
});