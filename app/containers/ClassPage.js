import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import { connect } from 'react-redux';
import styles from '../styles/ClassPageStyles';
import ClassCard from '../components/classCard';
import Toolbar from '../components/Toolbar';
import { mapStateToProps, mapDispatchToProps } from '../utils';

class ClassPage extends Component {

    renderClassPage() {
        let { description } = this.props.data;
        let { cards, isOnline, title, offlineSync, category } = this.props;

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
                                       offlineSync={(id, available) => offlineSync(id, category, available)}
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
    data: PropTypes.object,
    title: PropTypes.string,
    category: PropTypes.string,
    isOnline: PropTypes.bool,
    cards: PropTypes.array,
    offlineSync: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassPage);