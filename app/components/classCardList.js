import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import fonts from '../styles/fonts';
import ClassCard from './classCard';
import colors from '../styles/colors';

export default class ClassCardList extends Component {

    render() {

        const { cards, isOnline, description, showVideo, offlineSync } = this.props;

        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.intro}>
                    <Text style={styles.introBlock}>{description}</Text>
                </View>
                { cards.map((card, i) => {
                    let drawBottomDivider = i < cards.length - 1;

                    return (
                        <ClassCard key={i} card={card} isOnline={isOnline}
                                   showVideo={showVideo}
                                   drawBottomDivider={drawBottomDivider}
                                   offlineSync={offlineSync}
                                   />
                    );
                }) }
            </ScrollView>
        );
    }
}

ClassCardList.propTypes = {
    cards: PropTypes.array,
    isOnline: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    showVideo: PropTypes.func,
    offlineSync: PropTypes.func
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 15
    },
    intro: {
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 30,
    },
    introBlock: {
        ...fonts.defaultFont,
        textAlign: 'justify',
    }
});