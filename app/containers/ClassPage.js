import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Navigator
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles/ClassPageStyles';
import ClassCard from '../components/ClassCard';
import Toolbar from '../components/Toolbar';
import { saveVideoLocally, removeLocalVideo } from '../actions';
import { mapLocalDataToCards } from '../utils';

class ClassPage extends Component {

    renderClassPage() {
        let { description } = this.props.data;
        let { cards, isOnline, title, offlineSync } = this.props;

        return (
            <View style={{flex:1}}>
                <Toolbar title={title} />
                <ScrollView style={styles.mainContainer}>
                    <View style={styles.intro}>
                        <Text style={[styles.defaultFont, styles.introBlock]}>{description}</Text>
                    </View>
                    { cards.map((card, i) => {
                        let drawBottomDivider = i < cards.length - 1;

                        return (
                            <ClassCard key={i} card={card} isOnline={isOnline}
                                       drawBottomDivider={drawBottomDivider}
                                       offlineSync={offlineSync}
                                       navigator={this.props.navigator}/>
                        );
                    }) }
                </ScrollView>
            </View>
        );
    }

    render() {
        return (
            <Navigator
                renderScene={ this.renderClassPage.bind(this) }
                navigator={this.props.navigator} />
        )
    }
}

ClassPage.propTypes = {
    dispatch: React.PropTypes.func,
    data: React.PropTypes.object,
    isOnline: React.PropTypes.bool,
    cards: React.PropTypes.array,
    onStartDownload: React.PropTypes.func
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

export default connect(mapStateToProps, mapDispatchToProps)(ClassPage);