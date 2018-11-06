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
    if ((lr === 'left' && cursor === 0) || (lr === 'right' && cursor === end)) {
      this.setState(prevState => ({
        disabled: !prevState.disabled
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

  render(props) {
    return (
      <img
        id={this.props.id}
        src={this.setSource(this.props.id)}
        style={{maxHeight: '100px'}}
        disabled={this.state.disabled}
        onClick={() => {
          if ((this.props.id === 'left' && this.props.cursor > 0) || (this.props.id === 'right' && this.props.cursor < this.props.end)) {
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
