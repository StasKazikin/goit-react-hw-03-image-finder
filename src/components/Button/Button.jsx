import { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { images, isLoading, onClick } = this.props;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

    return (
      <>
        {shouldRenderLoadMoreButton && (
          <button type="button" onClick={onClick} className="Button">
            Load more
          </button>
        )}
      </>
    );
  }
}

Button.propTypes = {
  images: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
