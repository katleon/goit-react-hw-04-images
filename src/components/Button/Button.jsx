import PropTypes from 'prop-types';
import { BiChevronRight } from 'react-icons/bi';
import css from './Button.module.css';

const Button = ({ onNextFetch }) => {
  return (
    <button className={css.button} type="button" onClick={onNextFetch}>
      Load more <BiChevronRight className={css.icon} />
    </button>
  );
};

Button.propTypes = {
  onNextFetch: PropTypes.func.isRequired,
};

export default Button;
