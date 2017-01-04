import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Navigator
} from 'react-native';
import { getDuration } from '../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/ClassPageStyles';
import colors from '../styles/colors';

class ClassCard extends Component {

    render() {

        let { card, drawBottomDivider, navigator, isOnline, onStartDownload } = this.props;

        let videoUri;
        if (card.isLocal) {
            videoUri = card.path;
        } else {
            videoUri = card.video;
        }
        let containerStyle = [styles.cardContainer];
        if (drawBottomDivider)
            containerStyle.push(styles.cardBottomDivider);

        return (
            <View style={ containerStyle } key={card.order}>
                <View style={styles.cardHeader}>
                    <Text style={[styles.heavyFont, styles.cardOrder]}>{card.order}.</Text>
                    <Text style={[styles.defaultFont, styles.cardDescription]}>{card.description}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {!card.isLocal &&
                        <TouchableOpacity onPress={ () => onStartDownload(card.id, card.download) }>
                            <Icon name='ios-cloud-download-outline' size={30} color={colors.lightGray}/>
                        </TouchableOpacity>
                    }
                    {
                        card.isLocal && !card.isDownloading &&
                        <Icon name='ios-checkmark-circle-outline' size={30} color={colors.turquoise} />
                    }
                    {
                        card.isDownloading &&
                        <Image source={require('../img/progress.gif')} style={{width: 30, height: 30}} />
                    }
                </View>
                <TouchableOpacity
                    onPress={() => {
                        console.log('playing from ' + videoUri);
                        navigator.push({
                            id: 'VideoPlayer',
                            video: {src: videoUri, title: card.title},
                            sceneConfig: Navigator.SceneConfigs.FloatFromBottom
                        });
                        }
                    } style={styles.cardThumbnailContainer}>
                    <View style={{flex: 1 }}>
                        <Image style={styles.cardThumbnail} source={{uri: card.thumbnail }} >
                            <Text style={styles.durationText}>
                                { getDuration(card.duration) }
                            </Text>
                        </Image>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

ClassCard.propTypes = {
    card: React.PropTypes.object,
    drawBottomDivider: React.PropTypes.bool,
    navigator: React.PropTypes.any,
    isOnline: React.PropTypes.bool,
    onStartDownload: React.PropTypes.func
};

export default ClassCard;