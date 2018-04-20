import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Foundation';
import {
    Text,
    ScrollView,
    View,
    StyleSheet
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import PropTypes from 'prop-types';

export default class HomeScreen extends Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        const { isFetching, isError } = this.props;

        if (isFetching || isError) {
            return (
                <View style={styles.container}>
                    <Spinner visible={!isError} textContent='Preparing the studio...' textStyle={{color: colors.white}} overlayColor={colors.turquoise} />
                    {
                        isError &&
                        <Text style={styles.errorText}>There was a error initializing the application data. Please try again.</Text>
                    }
                </View>
            )
        } else {
            return (
                <ScrollView style={styles.container}>
                    <View style={styles.intro}>
                        <Text style={styles.defaultFont}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nullam at imperdiet nisl.
                            Etiam in neque et nulla congue sagittis id et enim.
                            Nam vitae hendrerit tortor. Suspendisse potenti.</Text>
                    </View>
                    <View style={styles.sectionInfo}>
                        <Icon name='compass' size={40} color={colors.lightGray} style={styles.sectionIcon}/>
                        <Text style={styles.sectionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nullam at imperdiet nisl.
                            Etiam in neque et nulla congue sagittis id et enim.</Text>
                    </View>
                    <View style={styles.sectionInfo}>
                        <Icon name='list-thumbnails' size={40} color={colors.lightGray} style={styles.sectionIcon}/>
                        <Text style={styles.sectionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nullam at imperdiet nisl.
                            Etiam in neque et nulla congue sagittis id et enim.</Text>
                    </View>
                    <View style={styles.sectionInfo}>
                        <Icon name='play-circle' size={40} color={colors.lightGray} style={[styles.sectionIcon]}/>
                        <Text style={styles.sectionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nullam at imperdiet nisl.
                            Etiam in neque et nulla congue sagittis id et enim.</Text>
                    </View>
                </ScrollView>
            );
        }
    }
}

HomeScreen.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    initializeApp: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    errorText: {
        ...fonts.heavyFont,
        color: colors.white
    },
    ...fonts,
    intro: {
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 50,
    },
    sectionInfo: {
        paddingLeft: 20,
        paddingBottom: 40,
        paddingRight: 20,
        flexDirection: 'row'
    },
    sectionText: {
        ...fonts.defaultFont,
        paddingLeft: 10,
        flex: 1
    },
    sectionIcon: {
        alignItems: 'center',
        paddingLeft: 5,
        minWidth: 40
    }
});

