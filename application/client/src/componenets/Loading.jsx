import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import quotePage from './QuotePage.jsx';

const dataPresentation = (props) => (
  <div>
    <Title>
      <h2 className="card-heading">Loading your Quote!</h2>
      <CircularProgress size={80} thickness={5} />
    </Title>
  </div>
);

const Loading = (props) => (
  <div id="parent">
    <Title>
      <h2 className="card-heading">Loading your Quote!</h2>
    <CircularProgress size={80} thickness={5} />
    </Title>
  </div>
);

const Title = (props) => (
    <div style={{
      fontSize: '30px',
      textAlign: 'center',
      paddingTop: '140px'
    }} {...props} />
)

export default {Loading, dataPresentation};
