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

        let videoUri, imgSource;
        if (card.isLocal) {
            videoUri = card.path;
            imgSource = {uri: 'file://' + card.imgPath};
        } else {
            videoUri = card.video;
            imgSource = {uri: card.thumbnail};
        }

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
                                video: { src: videoUri, title: card.title },
                                sceneConfig: Navigator.SceneConfigs.FloatFromBottom
                            })} style={styles.playlistThumbnailContainer}>
                            <View style={{flex: 1}}>
                                <Image style={styles.playlistThumbnail} source={ imgSource } >
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
                <View style={{flex: 0.15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
                    {!card.isLocal && !card.isDownloading &&
                    <TouchableOpacity onPress={ () => offlineSync(card.id, true, card.download, card.thumbnail) }>
                        <Icon name='download' size={20} color={colors.lightGray}/>
                    </TouchableOpacity>
                    }
                    {
                        card.isLocal && !card.isDownloading &&
                        <TouchableOpacity onPress={ () => offlineSync(card.id, false, card.download, card.thumbnail) }>
                            <Icon name='check' size={20} color={colors.turquoise} style={{alignSelf: 'center'}} />
                        </TouchableOpacity>
                    }
                    {
                        card.isDownloading &&
                        <Image source={require('../img/progress.gif')} style={{width: 22, height: 22}} />
                    }
                </View>
            </View>
        );
    }
}

export default PlaylistCard;