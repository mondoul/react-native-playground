import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import getRootReducer from "../ducks";
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

// Configure listener
const navigationMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);
export const addListener = createReduxBoundAddListener("root");

const loggerMiddleware = createLogger();

export default function configureStore() {

    let enhancers = [];
    let middleWare = [ thunkMiddleware, navigationMiddleware ];

    if (process.env.NODE_ENV !== 'production'){
        middleWare = [...middleWare, loggerMiddleware];
    }

    enhancers.push(applyMiddleware(...middleWare));

    return createStore(getRootReducer(), compose(...enhancers));

}
