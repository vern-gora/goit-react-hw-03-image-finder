import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageAPI from '../services/api';
import Loader from './Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

class App extends Component {
  state = {
    searchName: '',
    gallery: [],
    loader: false,
    error: null,
    page: 1,
    totalImages: 0,
    modalImage: '',
    notFount: false,
  };

  handleSubmit = query => {
    this.setState({
      searchName: query,
      gallery: [],
      page: 1,
    });
  };

  handleLoadMoreBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  showModal = url => {
    this.setState({ modalImage: url });
  };

  closeModal = () => {
    this.setState({ modalImage: '' });
  };

  componentDidUpdate(_, prevState) {
    const nextName = this.state.searchName;
    if (
      prevState.searchName !== nextName ||
      this.state.page !== prevState.page
    ) {
      this.setState({ loader: true });

      ImageAPI.fetchImage(nextName, this.state.page)
        .then(result => {
          if (result.ok) {
            return result.json();
          }
          this.setState({ notFount: true });
        })
        .then(gallery => {
          if (gallery.totalHits > 0) {
            if (this.state.notFount) {
              this.setState({ notFount: false });
            }

            return this.setState(prevState => ({
              gallery: [...prevState.gallery, ...gallery.hits],
              totalImages: gallery.totalHits,
            }));
          } else {
            return this.setState({ notFount: true });
          }
        })

        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loader: false }));
    }
  }

  render() {
    const {
      searchName,
      gallery,
      loader,
      error,
      totalImages,
      modalImage,
      notFount,
    } = this.state;
    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
        {gallery.length > 0 && (
          <ImageGallery gallery={gallery} showModal={this.showModal} />
        )}
        {error && <p>Something went wrong</p>}
        {notFount && (
          <p className={css.NoImages}>No images for "{searchName}" request</p>
        )}
        {!searchName && (
          <p className={css.UserHelp}>What image do you want to find?</p>
        )}
        {loader && <Loader />}
        {totalImages > gallery.length && !loader && !notFount && (
          <Button onClick={this.handleLoadMoreBtn} />
        )}
        {modalImage && (
          <Modal image={modalImage} closeModal={this.closeModal} />
        )}
        <ToastContainer autoClose={1000} />
      </>
    );
  }
}

export default App;
