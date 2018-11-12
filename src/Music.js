import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import MusicSearch from './MusicSearch';
import YTPlayer from './YTPlayer';

class Music extends Component {
  state = {
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
    query: '',
    error: ''
  }

  setMusic() {
    const getOptions = {
      method: 'GET'
    };

    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${this.state.key}&part=id&fields=items/id/playlistId&q=${this.state.query}&type=playlist&order=relevance&maxResults=1`,
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
      if (status === 200 && json.items.length > 0) {
        const result = json.items[0].id.playlistId;
        console.log('RESULT:', result);
        if (window.Player !== null && window.Player.a !== null) {
          console.log('a:', window.Player.a);
          window.Player.loadPlaylist({
            list: result,
            listType: 'playlist'
          });
        } else {
          this.setState(prevState => ({
            error: 'player'
          }));
        }
      } else if (status === 429) {
        this.setState(prevState => ({
          error: 'spam'
        }));
      } else {
        this.setState(prevState => ({
          error: 'music'
        }));
      }
      return status;
    });
  }

  searchMusic() {
    const searchSubmit = document.getElementById('search-submit');
    searchSubmit.setAttribute('disabled', '');
    Promise.resolve(setTimeout(() => searchSubmit.removeAttribute('disabled'), 1500));
    this.setState(prevState => ({
      error: ''
    }));
    return this.setMusic();
      // .then(prevStatus => {
      //   if (prevStatus !== 200 && prevStatus !== false && this.state.collection.artworks.length === 0)
      // });
  }

  updateQuery = e => {
    e.preventDefault();
    let query = document.getElementById('music-search').value;
    query = query.toLowerCase();
    query = query.replace(/[^\w\s-+]+/g, '');
    query = query.replace(/[\s_-]+/g, '+');
    query = query + '+music';
    console.log(query);
    this.setState(
      prevState => ({
        query
      }),
      () => this.searchMusic()
    );
    // console.log(this.state, this.props);
    // this.displayMuseum();
  }

  render(props) {
    return (
      <div hidden={this.props.hidden} className="container">
        <ErrorMessage
          error={this.state.error} />
        <MusicSearch
          currentQuery={this.state.query}
          handleQueryUpdate={this.updateQuery} />
        <YTPlayer />
      </div>
    );
  }
}

Music.propTypes = {
  hidden: PropTypes.bool.isRequired
}

export default Music;
