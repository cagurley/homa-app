import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = props => {
  let innerContent;
  switch (props.error) {
    case 'spam':
      innerContent = <span className="alert alert-danger" role="alert">Sorry, the server can't handle that many requests. Please don't spam the search feature.</span>;
      break;
    case 'token':
      innerContent = <span className="alert alert-info" role="alert">Sorry, something went wrong on token retrieval.</span>;
      break;
    case 'artist':
      innerContent = <span className="alert alert-info" role="alert">Sorry, that artist couldn't be found.</span>;
      break;
    case 'collection':
      innerContent = <span className="alert alert-info" role="alert">Sorry, something went wrong on collection retrieval.</span>;
      break;
    case 'artworks':
      innerContent = <span className="alert alert-info" role="alert">Sorry, there are no available artworks from this artist or similar to the current work.</span>;
      break;
    case 'museum':
      innerContent = <span className="alert alert-info" role="alert">Sorry, that museum couldn't be found.</span>;
      break;
    case 'player':
      innerContent = <span className="alert alert-warning" role="alert">Sorry, there was a problem initializing the player. Try refreshing.</span>;
      break;
    case 'music':
      innerContent = <span className="alert alert-info" role="alert">Sorry, no music playlist could be found for that search term.</span>;
      break;
    default:
      innerContent = null;
      break;
  }
  return (
    <div className="alert-line">
      {innerContent}
    </div>
  );
};

ErrorMessage.proptypes = {
  error: PropTypes.string.isRequired
}

export default ErrorMessage;
