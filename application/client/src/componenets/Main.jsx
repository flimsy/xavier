import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import FrontPage from './FrontPage.jsx';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import quotePage from './QuotePage.jsx';

const buttonStyle = {
   backgroundColor: 'transparent',
   color: 'white'
 };

const rightButtons = (
   <div>
     <FlatButton label="Login" style={buttonStyle} />
   </div>
 );

const Main = (props) => (
    <MuiThemeProvider>
      <FrontPage />
    </MuiThemeProvider>
);


export default Main;
