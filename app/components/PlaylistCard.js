import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Navigator
} from 'react-native';
import { getDuration } from '../utils';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Foundation';
import styles from '../styles/PlaylistPageStyles';

class PlaylistCard extends Component {
    render() {
        let { card, offlineSync, hasBottom, isOnline } = this.props;

        let containerStyle = [styles.playlistItemContainer];
        if (hasBottom)
            containerStyle.push(styles.playlistItemBottomDivider);

        return (
            <View style={containerStyle} key={card.order}>
                <View style={{flex: 1 }}>
                    {
                        (isOnline || card.isLocal) &&
                        <TouchableOpacity
                            onPress={() => this.props.navigator.push({
                                id: 'VideoPlayer',
                                video: { src: card.videoUri, title: card.title },
                                sceneConfig: Navigator.SceneConfigs.FloatFromBottom
                            })} style={styles.playlistThumbnailContainer}>
                            <View style={{flex: 1}}>
                                <Image style={styles.playlistThumbnail} source={{ uri: card.imgUri }} >
                                    <Text style={styles.durationText}>
                                        {getDuration(card.duration)}
                                    </Text>
                                </Image>
                            </View>
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