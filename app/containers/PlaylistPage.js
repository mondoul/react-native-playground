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
import Toolbar from '../components/Toolbar';
import PlaylistCard from '../components/PlaylistCard';
import { mapStateToProps, mapDispatchToProps } from '../utils';

class PlaylistPage extends Component {
    
    renderPlaylist() {
        let { description } = this.props.data;
        let { offlineSync, cards, isOnline, category, title } = this.props;

        return (
            <View style={{flex:1}}>
                <Toolbar title={title}/>
                <ScrollView style={styles.mainContainer}>
                    <View style={styles.playlistIntro}>
                        <Text style={[styles.defaultFont, styles.introBlock]}>{description}</Text>
                    </View>
                    { cards.map((card, i) => {
                        let hasBottom = i < cards.length - 1;
                        return (
                            <PlaylistCard key={i} card={card}
                                    hasBottom={hasBottom}
                                    offlineSync={(id, available) => offlineSync(id, category, available)}
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
    data: React.PropTypes.object,
    title: React.PropTypes.string,
    category: React.PropTypes.string,
    isOnline: React.PropTypes.bool,
    cards: React.PropTypes.array,
    offlineSync: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);
