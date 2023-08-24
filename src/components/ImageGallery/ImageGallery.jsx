import React from 'react';
import ImageAPI from '../../services/api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import css from './ImageGallery.module.css';

class ImageGallery extends React.Component {
  state = {
    gallery: [],
    loader: false,
    error: null,
    page: 1,
    totalImages: 0,
    isShowModal: false,
    modalImage: '',
  };

  handleLoadMoreBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;
    const page = this.props.page;
    if (prevName !== nextName) {
      this.setState({ loader: true, gallery: [] });

      ImageAPI.fetchImage(nextName, page)
        .then(gallery => {
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...gallery.hits],
            totalImages: gallery.totalHits,
          }));
        })
        // .then(gallery => this.setState({ gallery }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loader: false }));
    }
  }

  showModal = url => {
    this.setState({ isShowModal: true });
    this.setState({ modalImage: url });
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    const { gallery, loader, error, totalImages, isShowModal, modalImage } =
      this.state;
    const { searchName } = this.props;
    const { hits, total } = this.state.gallery;

    return (
      <>
        {error && <p>Something went wrong</p>}
        {total === 0 && (
          <p className={css.NoImages}>
            No images for "{this.props.searchName}" request
          </p>
        )}
        {!searchName && (
          <p className={css.UserHelp}>What image do you want to find?</p>
        )}
        {this.state.gallery.total !== 0 && (
          <ul className={css.ImageGallery}>
            {gallery &&
              gallery.map(hit => (
                <ImageGalleryItem
                  key={hit.id}
                  image={hit}
                  showModal={this.showModal}
                />
              ))}
          </ul>
        )}
        {loader && <Loader />}
        {totalImages > gallery.length && !loader && (
          <Button onClick={this.handleLoadMoreBtn} />
        )}
        {isShowModal && (
          <Modal image={modalImage} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}

export default ImageGallery;
