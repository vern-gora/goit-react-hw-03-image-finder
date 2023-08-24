import css from 'components/Button/Button.module.css';
// import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <button className={css.Button} onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;
