import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { metrics, str_pad_left } from '../config';
import colors from '../styles/colors';
import ScaledImage from './scaledImage';
import cardPropType from '../config/card';

const IMAGE_WIDTH = ((metrics.DEVICE_WIDTH / 3) * 1.13) - 5;

export default class VideoCard extends Component {

    getDuration = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;
        return str_pad_left(minutes,'0',2) + ':' + str_pad_left(seconds,'0',2);
    };

    render() {

        const { card, onCardPress, large } = this.props;
        const styles = conditionalStyles(this.props);

        return(
            <TouchableOpacity
                onPress={() => onCardPress(card)} style={styles.cardThumbnailContainer}>
                <ScaledImage style={styles.cardThumbnail} {...(large ? {height: 180} : {width: IMAGE_WIDTH} )} source={{uri: card.imgUri}} />
                <Text style={styles.durationText}>
                    { this.getDuration(card.duration) }
                </Text>
            </TouchableOpacity>
        );
    }
}

VideoCard.propTypes = {
    card: cardPropType.isRequired,
    onCardPress: PropTypes.func.isRequired,
    large: PropTypes.bool,
    small: PropTypes.bool
};

const conditionalStyles = (props) => StyleSheet.create({
    cardThumbnailContainer: StyleSheet.flatten([
        props.large &&
        {
            height: 180,
            width: 375,
            alignSelf: 'center'
        },
        props.small &&
        {
            height: 80,
            width: IMAGE_WIDTH,
        }
    ]),
    cardThumbnail: {
        alignSelf: 'center',
    },
    durationText: StyleSheet.flatten([
        {
            backgroundColor: colors.darkerGray,
            color: colors.white,
            position: 'absolute',
            textAlign: 'center',
            width: 46,
            bottom: 0,
        },
        props.large &&
        {
            right: 28
        },
        props.small &&
        {
            right: 0,
            bottom: 4
        }
    ])
});