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
    
    fetch(
      `https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${this.state.query}&count=1&safeSearch=Strict`,
      getOptions
    ).then(res => {
      return Promise.all([res.status, res.json()]);
    }).catch(
      e => console.error(e)
    ).then(sj => {
      const [status, json] = sj;
      console.log(json);
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
  }

  updateQuery = e => {
    e.preventDefault();
    let query = document.getElementById('museum-search').value;
    query = query.toLowerCase();
    query = query.replace(/[^\w\s-+]+/g, '');
    query = query.replace(/[\s_-]+/g, '+');
    query = query + '+art+museum';
    this.setState(
      prevState => ({
        query
      }),
      () => this.displayMuseum()
    );
  }

  render() {
    return (
      <div>
        <MuseumSearch
          currentQuery={this.state.query}
          handleQueryUpdate={this.updateQuery} />
        <ErrorMessage
          error={this.state.error} />
      </div>
    );
  }
}

Museum.propTypes = {
  handleBackgroundUpdate: PropTypes.func.isRequired
}

export default Museum;
