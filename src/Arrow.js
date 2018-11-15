import React, { Component } from 'react';
import PropTypes from 'prop-types';
import left from './left.svg';
import right from './right.svg';

class Arrow extends Component {
  state = {
    disabled: false
  }

  setSource(lr) {
    let source = null;
    if (lr === 'left') {
      source = left;
    } else if (lr === 'right') {
      source = right;
    }
    return source;
  }

  disable(lr, cursor, end) {
    if ((lr === 'left' && cursor <= 0) || (lr === 'right' && cursor >= end)) {
      this.setState(prevState => ({
        disabled: true
      }));
    } else {
      this.setState(prevState => ({
        disabled: false
      }));
    }
  }

  componentDidMount() {
    this.disable(
      this.props.id,
      this.props.cursor,
      this.props.end
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cursor !== this.props.cursor || prevProps.end !== this.props.end) {
      this.disable(
        this.props.id,
        this.props.cursor,
        this.props.end
      );
    }
  }

  // Actual styles are controlled by the class name; the 'disabled' attribute
  // is just to illustrate the state if the DOM is peeked in devtools.
  render(props) {
    return (
      <img
        id={this.props.id}
        src={this.setSource(this.props.id)}
        alt="Navigational arrow"
        disabled={this.state.disabled}
        className={'arrow' + (this.state.disabled ? ' disabled' : '')}
        onClick={() => {
          if (!this.state.disabled) {
            this.props.handleCurrentIndexUpdate(this.props.id);
          }
        }} />
    );
  }
}

Arrow.propTypes = {
  id: PropTypes.string.isRequired,
  cursor: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  handleCurrentIndexUpdate: PropTypes.func.isRequired
}

export default Arrow;
