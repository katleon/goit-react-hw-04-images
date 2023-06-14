import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ smallImage, description, onClick }) => {
  return (
    <li className={css.item}>
      <img src={smallImage} alt={description} onClick={onClick} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
