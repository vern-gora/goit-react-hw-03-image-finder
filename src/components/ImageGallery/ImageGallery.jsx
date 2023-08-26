import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

class ImageGallery extends React.Component {
  static propTypes = {
    gallery: PropTypes.array.isRequired,
    showModal: PropTypes.func.isRequired,
  };

  render() {
    const { searchName, totalImages, gallery, showModal } = this.props;

    return (
      <>
        {totalImages !== 0 ? (
          <ul className={css.ImageGallery}>
            {gallery.map(hit => (
              <ImageGalleryItem
                key={hit.id}
                image={hit}
                showModal={showModal}
              />
            ))}
          </ul>
        ) : (
          <p className={css.NoImages}>No images for "{searchName}" request</p>
        )}
      </>
    );
  }
}

export default ImageGallery;
