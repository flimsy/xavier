import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import image from '../business.jpeg';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import News from './News.jsx';
import QuotePage from './QuotePage.jsx';

const FrontPage = (props) => (
      <Router>
      <div id="parent">
        <div id="logo">
        </div>
        <div id="toolbar">
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <Link exact={true} to="/">
              <FlatButton label="Home" />
            </Link>
          </ToolbarGroup>

          <ToolbarGroup>

            <Link to="/login">
              <FlatButton label="Login" />
            </Link>
              <ToolbarSeparator />
            <Link to="/quote">
              <RaisedButton label="Get a Quote" primary={true} />
            </Link>
          </ToolbarGroup>
        </Toolbar>
      </div>
        <Intro>

          <Paper style={style} zDepth={2} circle={true}>
            <SubText>

              <h1>Xavier | Sleek, Fast, Modern</h1>

            </SubText>
          </Paper>


        </Intro>

      <Route path="/quote" component={QuotePage} />
      <Route exact="true" path="/" component={News} />



      </div>
      </Router>
    );

const Intro = (props) => (
    <div style={{
        width: '100%',
        height: '600px',
        zIndex: '1',
        marginTop: '200px',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        filter: 'grayscale(60%)'

    }} {...props} />
)


const SubText = (props) => (
    <div style={{
      fontSize: '10px',
      textAlign: 'center',
      paddingTop: '140px'
    }} {...props} />
)

const style = {
  height: 300,
  width: 300,
  marginLeft: '45%',
  marginTop: '-200px',
  textAlign: 'center',
  display: 'inline-block',
  zIndex: '500'
};

const paperStyle = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

export default FrontPage;
