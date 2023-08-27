import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
  };

  state = {
    searchName: '',
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { searchName } = this.state;
    if (!searchName.trim()) {
      toast.warn('Please, fill input search field');
      return;
    }
    this.props.handleSubmit(searchName);

    this.setState({ searchName: '' });
  };

  handleInputChange = event => {
    this.setState({ searchName: event.target.value });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleFormSubmit}>
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
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
