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

class PlaylistPage extends Component {

    renderCard(card) {
        return (
            <View style={styles.playlistItemContainer} key={card.order}>
                <TouchableOpacity
                    onPress={() => this.props.navigator.push({
                        id: 'VideoPlayer',
                        video: { src: card.video, title: card.title },
                        sceneConfig: Navigator.SceneConfigs.FloatFromBottom
                    })} style={styles.playlistThumbnailContainer}>
                    <View style={{flex: 1}}>
                        <Image style={styles.playlistThumbnail} source={{uri: card.thumbnail }} >
                            <Image style={styles.playlistPlayOverlay} source={ require('../img/play.png') } />
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
        let { title, introduction, items } = this.props.data;

        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.toolbar}>
                    <Text style={[styles.heavyFont, styles.toolbarTitle]}>{this.props.title}</Text>
                </View>
                <View style={styles.playlistIntro}>
                    <Text style={[styles.heavyFont, styles.introTitle]}>{title}</Text>
                    <Text style={[styles.defaultFont, styles.introBlock]}>{introduction}</Text>
                </View>
                { items.map(i => this.renderCard(i)) }
            </ScrollView>
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
