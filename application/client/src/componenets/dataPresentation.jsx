import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const dataPresentation = (props) => (
  <div>
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

export default dataPresentation;
