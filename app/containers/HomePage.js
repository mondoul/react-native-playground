import React from 'react';
import { connect } from 'react-redux';

import * as app from '../ducks/app';
import HomeScreen from '../components/homeScreen';

const mapStateToProps = (state) => (app.getStatus(state));
const mapDispatchToProps = (dispatch) => ({
   initializeApp: () => dispatch(app.initializeApp())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);