import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';

const Modal = ({ lgImage, currentImageDescription, closeModal }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={lgImage} alt={currentImageDescription} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  lgImage: PropTypes.string.isRequired,
  currentImageDescription: PropTypes.string.isRequired,
};

export default Modal;
