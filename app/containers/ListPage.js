import React from 'react';
import { connect } from 'react-redux';

import CardList from '../components/cardList';

import { mapStateToProps, mapDispatchToProps } from '../utils';

export default connect(mapStateToProps, mapDispatchToProps)(CardList);