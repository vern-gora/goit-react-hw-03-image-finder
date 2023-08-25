import React from 'react';
import { toast } from 'react-toastify';
import { BiSearch } from 'react-icons/bi';
// import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends React.Component {
  state = {
    searchName: '',
  };

  handleNameChange = event => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };

  hendleSubmit = event => {
    event.preventDefault();
    if (this.state.searchName.trim() === '') {
      toast.warning('Fill input search field', {
        autoClose: 1500,
      });
      return;
    }
    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.hendleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <BiSearch className={css.Icon} size={24} />
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            name="searchName"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
