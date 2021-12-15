// import s from './App.module.css';
import { useState, useEffect } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from './components/ImageGallery/ImageGalleryItem/ImageGalleryItem';
import { Button } from './components/common/Button/Button';
import { Modal } from './components/common/Modal/Modal';
import { nanoid } from 'nanoid';
import fetchImages from './services/api';
import Loader from 'react-loader-spinner';

const loaderStyle = {
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    getImages();
  }, [inputValue, page]);

  const getImages = async () => {
    setIsLoading(true);
    try {
      const data = await fetchImages(inputValue, page);
      const imagesData = data.hits;
      const totalImages = data.totalHits;

      setImages([...images, ...imagesData]);
      setTotalImages(totalImages);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const submitHandler = value => {
    setInputValue(value);
    setImages([]);
    setTotalImages(0);
    setPage(1);
  };

  const onLoadMoreClick = () => {
    setPage(page + 1);
  };

  const onImageClick = e => {
    if (e.target === e.currentTarget) {
      setModalImg(e.target.dataset.image);
      setAlt(e.target.getAttribute('Alt'));
    }
  };

  const onModalClose = () => {
    setModalImg('');
    setAlt('');
  };

  return (
    <>
      <Searchbar onSubmit={submitHandler} />

      <ImageGallery>
        {images.map(({ webformatURL, tags, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={nanoid()}
              previewImg={webformatURL}
              alt={tags}
              largeImageURL={largeImageURL}
              onImageClick={onImageClick}
            />
          );
        })}
      </ImageGallery>

      {modalImg !== '' && (
        <Modal image={modalImg} alt={alt} onModalClose={onModalClose} />
      )}

      {totalImages > 11 && !isLoading && (
        <Button onLoadMoreClick={onLoadMoreClick} />
      )}
      {isLoading && (
        <Loader
          type="Oval"
          color="#3f51b5"
          height={80}
          width={80}
          style={{ ...loaderStyle }}
        />
      )}
    </>
  );
};

export default App;
