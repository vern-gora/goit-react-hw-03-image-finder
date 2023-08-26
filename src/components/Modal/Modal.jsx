import css from 'components/Modal/Modal.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handlePressOnESC);
  }

  handlePressOnESC = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressOnESC);
  }

  render() {
    const { image, closeModal } = this.props;
    return (
      <div className={css.Overlay} onClick={closeModal}>
        <div className={css.Modal}>
          <img src={image} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
