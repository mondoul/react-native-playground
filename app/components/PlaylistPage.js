import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    Navigator
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles/PlaylistPageStyles';
import Toolbar from './Toolbar';
import PlaylistCard from '../components/PlaylistCard';
import { mapLocalDataToCards } from '../utils';
import { saveVideoLocally, removeLocalVideo } from '../actions';

class PlaylistPage extends Component {
    
    renderPlaylist() {
        let { description } = this.props.data;
        let { offlineSync, cards, isOnline } = this.props;

        return (
            <View style={{flex:1}}>
                <Toolbar title={this.props.title}/>
                <ScrollView style={styles.mainContainer}>
                    <View style={styles.playlistIntro}>
                        <Text style={[styles.defaultFont, styles.introBlock]}>{description}</Text>
                    </View>
                    { cards.map((card, i) => {
                        let hasBottom = i < cards.length - 1;
                        return (
                            <PlaylistCard key={i} card={card}
                                    hasBottom={hasBottom}
                                    offlineSync={offlineSync}
                                    isOnline={isOnline}
                                    navigator={this.props.navigator}
                            />
                            );
                    }) }
                </ScrollView>
            </View>
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

PlaylistPage.propTypes = {
    dispatch: React.PropTypes.func,
    data: React.PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    let { localData } = state;
    let { isOnline } = state.playlistData;

    let { items } = ownProps.data;
    let cards = mapLocalDataToCards(items, localData);

    return {
        cards,
        isOnline
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        offlineSync: (id, available, uri, imgUri) => {
            if (available)
                dispatch(saveVideoLocally(id, uri, imgUri));
            else
                dispatch(removeLocalVideo(id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);
