import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Navigator
} from 'react-native';
import { getDuration, metrics } from '../utils';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Foundation';
import styles from '../styles/PlaylistPageStyles';
import ScaledImage from './ScaledImage';

const IMAGE_WIDTH = ((metrics.DEVICE_WIDTH / 3) * 1.13) - 5;

class PlaylistCard extends Component {
    render() {
        let { card, offlineSync, hasBottom, isOnline } = this.props;

        let containerStyle = [styles.playlistItemContainer];
        if (hasBottom)
            containerStyle.push(styles.playlistItemBottomDivider);

        return (
            <View style={containerStyle} key={card.order}>
                <View style={styles.playlistImageWrapper}>
                    {
                        (isOnline || card.isLocal) &&
                        <TouchableOpacity
                            onPress={() => this.props.navigator.push({
                                id: 'VideoPlayer',
                                video: { src: card.videoUri, title: card.title, id: card.id },
                                sceneConfig: Navigator.SceneConfigs.FloatFromBottom
                            })} style={styles.playlistThumbnailContainer}>
                                <ScaledImage style={styles.playlistThumbnail} width={IMAGE_WIDTH} source={{ uri: card.imgUri }} >
                                    <Text style={styles.durationText}>
                                        {getDuration(card.duration)}
                                    </Text>
                                </ScaledImage>
                        </TouchableOpacity>
                    }
                    {
                        !isOnline && !card.isLocal &&
                        <View style={styles.offlineContainer}>
                            <Icon name='prohibited' size={20} color={colors.white} />
                        </View>
                    }
                </View>
                <View style={styles.playlistItemWrapper}>
                    <Text style={[styles.heavyFont, styles.playlistItemOrder]}>{card.title}</Text>
                    <Text style={[styles.defaultFont, styles.playlistItemDescription]}>{card.description}</Text>
                </View>
                <View style={styles.syncContainer}>
                    {
                        !card.isLocal && !card.isDownloading &&
                        <TouchableOpacity disabled={!isOnline} onPress={ () => offlineSync(card.id, true) }>
                            <Icon name='download' size={20} color={colors.lightGray}/>
                        </TouchableOpacity>
                    }
                    {
                        card.isLocal && !card.isDownloading &&
                        <TouchableOpacity disabled={!isOnline} onPress={ () => offlineSync(card.id, false) }>
                            <Icon name='check' size={20} color={colors.turquoise} style={styles.synced} />
                        </TouchableOpacity>
                    }
                    {
                        card.isDownloading &&
                        <Image source={require('../img/progress.gif')} style={styles.progress} />
                    }
                </View>
            </View>
        );
    }
}

export default PlaylistCard;