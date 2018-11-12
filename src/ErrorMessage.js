import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = props => {
  switch (props.error) {
    case 'spam':
      return <h2>Sorry, the server can't handle that many requests. Please don't spam the search feature.</h2>;
    case 'token':
      return <h2>Sorry, something went wrong on token retrieval.</h2>;
    case 'artist':
      return <h2>Sorry, that artist couldn't be found.</h2>;
    case 'collection':
      return <h2>Sorry, something went wrong on collection retrieval.</h2>;
    case 'artworks':
      return <h2>Sorry, there are no available artworks from this artist.</h2>;
    case 'museum':
      return <h2>Sorry, that museum couldn't be found.</h2>;
    case 'player':
      return <h2>Sorry, there was a problem initializing the player.</h2>;
    case 'music':
      return <h2>Sorry, no music playlist could be found for that search term.</h2>;
    default:
      return null;
  }
};

ErrorMessage.proptypes = {
  error: PropTypes.string.isRequired
}

export default ErrorMessage;
