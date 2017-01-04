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
import { saveVideoLocally } from '../actions';

class ClassPage extends Component {

    renderClassPage() {
        let { cards, isOnline, title, description, onStartDownload } = this.props;

        return (
            <View style={{flex:1}}>
                <View style={styles.toolbar}>
                    <Text style={[styles.heavyFont, styles.toolbarTitle]}>{title}</Text>
                </View>
                <ScrollView style={styles.mainContainer}>

                    <View style={styles.intro}>
                        <Text style={[styles.defaultFont, styles.introBlock]}>{description}</Text>
                    </View>
                    { cards.map((card, i) => {
                        let drawBottomDivider = i < cards.length - 1;

                        return (
                            <ClassCard key={i} card={card} isOnline={isOnline}
                                       drawBottomDivider={drawBottomDivider}
                                       onStartDownload={onStartDownload}
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
    let cards = [];

    items.forEach(i => {
        let localItem = localData[i.id];
        if (localItem) {
            console.log(localItem);
            cards.push(
                Object.assign({}, i, {
                    isLocal: true,
                    isDownloading: localItem.isSaving,
                    isError: localItem.isError,
                    path: localItem.path
                })
            );
        } else {
            cards.push(
                Object.assign({}, i, {
                    isLocal: false,
                    isDownloading: false
                })
            );
        }
    });

    return {
        cards,
        isOnline
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStartDownload: (id, uri) => dispatch(saveVideoLocally(id, uri))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassPage);