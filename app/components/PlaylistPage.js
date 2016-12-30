import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Navigator
} from 'react-native';
import styles from '../styles/PlaylistPageStyles';
import { getDuration } from '../utils';

class PlaylistPage extends Component {
    
    renderCard(card, hasBottom) {
        let containerStyle = [styles.playlistItemContainer];
        if (hasBottom)
            containerStyle.push(styles.playlistItemBottomDivider);

        return (
            <View style={containerStyle} key={card.order}>
                <TouchableOpacity
                    onPress={() => this.props.navigator.push({
                        id: 'VideoPlayer',
                        video: { src: card.video, title: card.title },
                        sceneConfig: Navigator.SceneConfigs.FloatFromBottom
                    })} style={styles.playlistThumbnailContainer}>
                    <View style={{flex: 1}}>
                        <Image style={styles.playlistThumbnail} source={{uri: card.thumbnail }} >
                            <Text style={styles.durationText}>
                                {getDuration(card.duration)}
                            </Text>
                        </Image>
                    </View>
                </TouchableOpacity>
                <View style={styles.playlistItemWrapper}>
                    <Text style={[styles.heavyFont, styles.playlistItemOrder]}>{card.order}.  {card.title}</Text>
                    <Text style={[styles.defaultFont, styles.playlistItemDescription]}>{card.description}</Text>
                </View>
            </View>
        );
    }

    renderPlaylist() {
        let { title, description, items } = this.props.data;

        return (
            <View style={{flex:1}}>
                <View style={styles.toolbar}>
                    <Text style={[styles.heavyFont, styles.toolbarTitle]}>{this.props.title}</Text>
                </View>
                <ScrollView style={styles.mainContainer}>
                    <View style={styles.playlistIntro}>
                        <Text style={[styles.heavyFont, styles.introTitle]}>{title}</Text>
                        <Text style={[styles.defaultFont, styles.introBlock]}>{description}</Text>
                    </View>
                    { items.map((card, i) => this.renderCard(card, i < items.length - 1)) }
                </ScrollView>
            </View>
        );
    }

    render() {
        return (
            <Navigator
                renderScene={ this.renderPlaylist.bind(this) }
                navigator={this.props.navigator} />
        )
    }
}

export default PlaylistPage;
