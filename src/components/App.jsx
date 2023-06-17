import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './ImageGallery/Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { fetchImages } from 'components/services/fetchImages';

export const App = () => {
  const [searchRequest, setSearchRequest] = useState('');
  const [images, setImages] = useState([]);
  const [galleryPage, setGalleryPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updateImages = async (searchRequest, galleryPage) => {
      setIsLoading(true);

      try {
        const data = await fetchImages(searchRequest, galleryPage);
        if (!data.data.hits.length) {
          return toast.error(
            'There are no images found with that search request'
          );
        }

        const mappedImages = data.data.hits.map(
          ({ id, webformatURL, description, largeImageURL }) => ({
            id,
            webformatURL,
            description,
            largeImageURL,
          })
        );

        setTimeout(() => {
          setImages(prevImages => [...prevImages, ...mappedImages]);
          setIsLoading(false);
        }, 1100); // Opóźnienie 1500ms przed ustawieniem obrazków i zakończeniem ładowania
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    if (searchRequest !== '' || galleryPage !== 1) {
      updateImages(searchRequest, galleryPage);
    }
  }, [searchRequest, galleryPage]);

  const handleSearchSubmit = value => {
    if (value !== searchRequest) {
      setSearchRequest(value);
      setImages([]);
      setGalleryPage(1);
    }
  };

  const onNextFetch = () => {
    setGalleryPage(galleryPage + 1);
  };

  const openModalImage = id => {
    const image = images.find(image => image.id === id);
    setShowModal({
      largeImageURL: image.largeImageURL,
      description: image.description,
    });
  };

  const closeModalImage = () => {
    setShowModal(null);
  };

  return (
    <>
      <Searchbar onSearch={handleSearchSubmit} />
      {error
        ? toast.error(`Whoops, something went wrong: ${error.message}`)
        : null}
      {isLoading ? <Loader color={'#16123f'} size={32} /> : null}
      {images.length > 0 ? (
        <ImageGallery images={images} handlePreview={openModalImage} />
      ) : null}
      {images.length >= 12 ? <Button onNextFetch={onNextFetch} /> : null}
      {showModal ? (
        <Modal
          lgImage={showModal.largeImageURL}
          tags={showModal.tags}
          closeModal={closeModalImage}
        />
      ) : null}
      <ToastContainer autoClose={3000} />
    </>
  );
};
