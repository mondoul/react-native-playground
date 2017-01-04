import React, { Component } from 'react';
import { Provider } from "react-redux";
import configureStore from "../store/configureStore";
import PilatesApp from "./PilatesApp";

const store = configureStore();

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <PilatesApp />
            </Provider>
        );
    }
}

export default Root;
