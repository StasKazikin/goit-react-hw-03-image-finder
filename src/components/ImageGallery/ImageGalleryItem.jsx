import { Component } from 'react';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  render() {
    const { src, alt, onClick, largeImageURL } = this.props;
    return (
      <li className="ImageGalleryItem">
        <img
          src={src}
          alt={alt}
          className="ImageGalleryItem-image"
          onClick={() => onClick(largeImageURL, alt)}
          data={largeImageURL}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
