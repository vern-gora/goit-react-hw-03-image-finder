import React from 'react';
// import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, showModal }) => {
  const { webformatURL, largeImageURL } = image;
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt=""
        onClick={() => showModal(largeImageURL)}
      />
    </li>
  );
};

export default ImageGalleryItem;
