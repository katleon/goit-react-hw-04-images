import { HollowDotsSpinner } from 'react-epic-spinners';
import css from './Loader.module.css';
import PropTypes from 'prop-types';

const Loader = ({ color, size }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.loader}>
        <HollowDotsSpinner color={color} size={size} />
      </div>
    </div>
  );
};

Loader.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default Loader;
