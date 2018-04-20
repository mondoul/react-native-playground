import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardList from '../components/cardList';
import * as app from '../ducks/app';

import { mapStateToProps, mapDispatchToProps } from '../utils';


export default connect(mapStateToProps, mapDispatchToProps)(CardList);