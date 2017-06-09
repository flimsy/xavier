import React, { Component } from 'react';
import Divider from 'material-ui/Divider';

class News extends Component {

  state = {articles: []}

    componentDidMount() {
      fetch('/articles')
        .then(res => res.json())
        .then(articles => this.setState({ articles }));
    }

    render() {
      return (
        <div className="App">
          <NewsSection>
            <h1>News</h1>
          </NewsSection>

          <Divider />

          {this.state.articles.map(articles =>
            <div><h1>{articles.title}</h1> <br /> <p>{articles.body}</p></div>
          )}
        </div>
      );
    }
}

const NewsSection = (props) => (
    <div style={{
      marginTop: '140px',
      textAlign: 'center',
      fontSize: '30px'
    }} {...props} />
)

export default News;
