import React from 'react';
import { BiSearch } from 'react-icons/bi';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends React.Component {
  static propTypes = {
    hendleSubmit: PropTypes.func.isRequired,
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.props.hendleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <BiSearch className={css.Icon} size={24} />
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            name="searchWord"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
