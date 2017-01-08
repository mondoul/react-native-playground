import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Navigator
} from 'react-native';
import { getDuration } from '../utils';
import Icon from 'react-native-vector-icons/Foundation';
import styles from '../styles/ClassPageStyles';
import colors from '../styles/colors';

class ClassCard extends Component {

    render() {

        let { card, drawBottomDivider, navigator, isOnline, offlineSync } = this.props;

        let videoUri, imgSource;
        if (card.isLocal) {
            videoUri = card.path;
            imgSource = {uri: 'file://' + card.imgPath};
        } else {
            videoUri = card.video;
            imgSource = {uri: card.thumbnail};
        }

        let containerStyle = [styles.cardContainer];
        if (drawBottomDivider)
            containerStyle.push(styles.cardBottomDivider);

        return (
            <View style={ containerStyle } key={card.order}>
                <View style={styles.cardHeader}>
                    <Text style={[styles.heavyFont, styles.cardTitle]}>{card.title}</Text>
                    <Text style={[styles.defaultFont, styles.cardDescription]}>{card.description}</Text>
                </View>
                <View style={styles.syncContainer}>
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
                {
                    (isOnline || card.isLocal) &&
                    <TouchableOpacity
                        onPress={() => {
                            navigator.push({
                                id: 'VideoPlayer',
                                video: {src: videoUri, title: card.title},
                                sceneConfig: Navigator.SceneConfigs.FloatFromBottom
                            });
                        }
                        } style={styles.cardThumbnailContainer}>
                        <View style={{flex: 1 }}>
                            <Image style={styles.cardThumbnail} source={imgSource} >
                                <Text style={styles.durationText}>
                                    { getDuration(card.duration) }
                                </Text>
                            </Image>
                        </View>
                    </TouchableOpacity>
                }
                {
                    !isOnline && !card.isLocal &&
                    <View style={styles.offlineContainer}>
                        <Icon name='prohibited' size={40} color={colors.white} />
                        <Text style={[styles.heavyFont, styles.offlineText]}>
                                Not Available Offline
                        </Text>
                    </View>
                }

            </View>
        );
    }
}

ClassCard.propTypes = {
    card: React.PropTypes.object,
    drawBottomDivider: React.PropTypes.bool,
    navigator: React.PropTypes.any,
    isOnline: React.PropTypes.bool,
    offlineSync: React.PropTypes.func
};

export default ClassCard;