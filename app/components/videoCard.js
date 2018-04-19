import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import {getDuration, metrics} from '../utils';
import colors from '../styles/colors';
import ScaledImage from './scaledImage';

const IMAGE_WIDTH = ((metrics.DEVICE_WIDTH / 3) * 1.13) - 5;

export default class VideoCard extends Component {

    render() {

        const { card, onCardPress, large } = this.props;
        const styles = conditionalStyles(this.props);

        return(
            <TouchableOpacity
                onPress={onCardPress} style={styles.cardThumbnailContainer}>
                <ScaledImage style={styles.cardThumbnail} {...(large ? {height: 180} : {width: IMAGE_WIDTH} )} source={{uri: card.imgUri}} />
                <Text style={styles.durationText}>
                    { getDuration(card.duration) }
                </Text>
            </TouchableOpacity>
        );
    }
}

VideoCard.propTypes = {
    card: PropTypes.any,
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
            alignSelf: 'flex-end',
            position: 'absolute',
            paddingLeft: 3,
            paddingRight: 3,
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