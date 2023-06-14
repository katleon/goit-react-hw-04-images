import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, handlePreview }) => {
  const renderGallery = () =>
    images.map(({ id, description, webformatURL }) => (
      <ImageGalleryItem
        className={css.ImageGalleryItem}
        key={id}
        description={description}
        smallImage={webformatURL}
        onClick={() => handlePreview(id)}
      />
    ));

  return (
    <div>
      <ul className={css.container}>{images ? renderGallery() : null}</ul>
    </div>
  );
};

ImageGallery.propTypes = {
  handlePreview: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
