import { combineReducers } from 'redux';
import app from './app';
import nav from './nav';
import playlistData from './playlistData';
import localData from './localData';

export default function getRootReducer() {
    return combineReducers({
        nav,
        playlistData,
        localData,
        app
    })
}