import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageAPI from '../services/api';
import Loader from './Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
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
    isShowModal: false,
    modalImage: '',
    notFount: false,
  };

  hendleSubmit = event => {
    event.preventDefault();
    const query = event.target.elements.searchWord.value.trim().toLowerCase();
    if (!query.length) {
      toast.warn('Please, fill input search field');
      return;
    }
    this.setState({
      searchName: query,
      gallery: [],
      page: 1,
    });

    event.target.reset();
  };

  handleLoadMoreBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  showModal = url => {
    this.setState({ isShowModal: true });
    this.setState({ modalImage: url });
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  componentDidUpdate(prevProps, prevState) {
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
      isShowModal,
      modalImage,
      notFount,
    } = this.state;
    return (
      <>
        <Searchbar hendleSubmit={this.hendleSubmit} />
        {gallery.length > 0 && (
          <ImageGallery gallery={gallery} showModal={this.showModal} />
        )}
        {error && <p>Something went wrong</p>}
        {notFount && (
          <p className={css.NoImages}>
            No images for "{this.state.searchName}" request
          </p>
        )}
        {!searchName && (
          <p className={css.UserHelp}>What image do you want to find?</p>
        )}
        {loader && <Loader />}
        {totalImages > gallery.length && !loader && !notFount && (
          <Button onClick={this.handleLoadMoreBtn} />
        )}
        {isShowModal && (
          <Modal image={modalImage} closeModal={this.closeModal} />
        )}
        <ToastContainer autoClose={1000} />
      </>
    );
  }
}

export default App;
