import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import { getDuration } from '../utils';
import colors from '../styles/colors';
import ScaledImage from './ScaledImage';

export default class VideoCard extends Component {

    render() {

        const { card, onCardPress } = this.props;

        return(
            <TouchableOpacity
                onPress={onCardPress} style={styles.cardThumbnailContainer}>
                <ScaledImage style={styles.cardThumbnail} height={180} source={{uri: card.imgUri}} />
                <Text style={styles.durationText}>
                    { getDuration(card.duration) }
                </Text>
            </TouchableOpacity>
        );
    }
}

VideoCard.propTypes = {
    card: PropTypes.any,
    onCardPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    cardThumbnailContainer: {
        height: 180,
        width: 375,
        alignSelf: 'center'
    },
    cardThumbnail: {
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    durationText: {
        backgroundColor: colors.darkerGray,
        color: colors.white,
        alignSelf: 'flex-end',
        position: 'absolute',
        paddingLeft: 3,
        paddingRight: 3,
        bottom: 0,
        right: 28
    }
});