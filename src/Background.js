import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Background extends Component {
  render() {
    return (
        <div id="background" style={this.props.backgroundStyle}></div>
    );
  }
}

Background.propTypes = {
  backgroundStyle: PropTypes.object.isRequired
}

export default Background;
