import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import configureStore, { addListener } from './config/configureStore';
import Root from './navigation/rootNavigation';
import { unmount } from './ducks/app';

import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...)']);

const store = configureStore();

class AppWithNavigationState extends Component {

    componentWillUnmount() {
        this.props.unmount();
    }

    // the react-navigation / redux integration triggers a warning
    // todo: follow up on the issue: https://github.com/react-navigation/react-navigation/issues/3956
    render() {
        return (
            <Root navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav,
                addListener
            })} />
        );
    }
}

const ConnectedAppNavigator =
    connect(state => ({ nav: state.nav }),
            dispatch => ({
                dispatch,
                unmount: () => dispatch(unmount())
            })
    )(AppWithNavigationState);

export default function App() {
    return (
        <Provider store={store}>
            <ConnectedAppNavigator />
        </Provider>
    )
}
