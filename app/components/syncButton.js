import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import colors from '../styles/colors';

export default class SyncButton extends Component {

    render() {

        const { isLocal, isDownloading, sync, remove } = this.props;

        return (
            <View style={styles.syncContainer}>
                {
                    !isLocal && !isDownloading &&
                    <TouchableOpacity onPress={sync}>
                        <Icon name='download' size={20} color={colors.lightGray}/>
                    </TouchableOpacity>
                }
                {
                    isLocal && !isDownloading &&
                    <TouchableOpacity onPress={remove}>
                        <Icon name='check' size={20} color={colors.turquoise} style={styles.synced} />
                    </TouchableOpacity>
                }
                {
                    isDownloading &&
                    <Image source={require('../img/progress.gif')} style={styles.progress} />
                }
            </View>
        );
    }
}

SyncButton.propTypes = {
    isLocal: PropTypes.bool.isRequired,
    isDownloading: PropTypes.bool.isRequired,
    sync: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    syncContainer: {
        height: 25,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: 8
    },
    progress: {
        width: 22,
        height: 22
    },
    synced: {
        alignSelf: 'center'
    }
});