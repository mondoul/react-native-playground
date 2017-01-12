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
                {
                    (isOnline || card.isLocal) &&
                    <TouchableOpacity
                        onPress={() => {
                            navigator.push({
                                id: 'VideoPlayer',
                                video: {src: card.videoUri, title: card.title},
                                sceneConfig: Navigator.SceneConfigs.FloatFromBottom
                            });
                        }
                        } style={styles.cardThumbnailContainer}>
                        <View style={{flex: 1 }}>
                            <Image style={styles.cardThumbnail} source={{uri: card.imgUri}} >
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