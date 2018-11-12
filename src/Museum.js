import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import MuseumSearch from './MuseumSearch';

class Museum extends Component {
  state = {
    key: process.env.REACT_APP_BING_SUBSCRIPTION_KEY,
    query: '',
    error: ''
  }

  setMuseum() {
    const getOptions = {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': this.state.key,
      }
    };

    // console.log(`https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${this.state.query}&count=1&safeSearch=Strict`);
    fetch(
      `https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${this.state.query}&count=1&safeSearch=Strict`,
      getOptions
    ).then(res => {
      // console.log('statusCode:', res.status);
      // res.headers.forEach(header => console.log('header:', header));
      return Promise.all([res.status, res.json()]);
    }).catch(
      e => console.error(e)
    ).then(sj => {
      const [status, json] = sj;
      console.log(json);
      // console.log(result);
      if (status === 200 && json.value.length > 0) {
        const result = json.value[0].contentUrl;
        this.props.handleBackgroundUpdate(result);
      } else if (status === 429) {
        this.setState(prevState => ({
          error: 'spam'
        }));
      } else {
        this.setState(prevState => ({
          error: 'museum'
        }));
      }
      return status;
    });
  }

  displayMuseum() {
    const searchSubmit = document.getElementById('search-submit');
    searchSubmit.setAttribute('disabled', '');
    Promise.resolve(setTimeout(() => searchSubmit.removeAttribute('disabled'), 1500));
    this.setState(prevState => ({
      error: ''
    }));
    return this.setMuseum();
      // .then(prevStatus => {
      //   if (prevStatus !== 200 && prevStatus !== false && this.state.collection.artworks.length === 0)
      // });
  }

  updateQuery = e => {
    e.preventDefault();
    let query = document.getElementById('museum-search').value;
    query = query.toLowerCase();
    query = query.replace(/[^\w\s-+]+/g, '');
    query = query.replace(/[\s_-]+/g, '+');
    query = query + '+art+museum';
    console.log(query);
    this.setState(
      prevState => ({
        query
      }),
      () => this.displayMuseum()
    );
    // console.log(this.state, this.props);
    // this.displayMuseum();
  }

  render() {
    return (
      <div>
        <ErrorMessage
          error={this.state.error} />
        <MuseumSearch
          currentQuery={this.state.query}
          handleQueryUpdate={this.updateQuery} />
      </div>
    );
  }
}

Museum.propTypes = {
  handleBackgroundUpdate: PropTypes.func.isRequired
}

export default Museum;
