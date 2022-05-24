import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import s from '../components/App.module.css';
import { findImage } from './fetchApi/fetchApi';
export function App () {  
  const [imgName, setImgName] = useState("");
  const [page, setPage] = useState(1);
  const [imgArray, setImgArray] = useState(null);
  const [largeImg, setLargeImg] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {    
    if(!imgName){return}
    setStatus('pending');
    findImage(imgName, page, imgArray, setError, setStatus, setImgArray);        
  }, [imgArray, imgName, page]);    
  const submitHandler = value => {
    setImgName(value);
    setPage(1);      
  };
  const handleButton = () => {    
    setStatus('pending');    
    setPage(page + 1);         
  };
  const handleForModal = e => {
    setLargeImg(e.target.alt);
    setShowModal(!showModal);
  };
  const toggleModal = () => {
    setShowModal(!showModal)
  }
      if (status === 'idle') {
      return (
        <div className={s.app}>
          <Searchbar onSubmit={submitHandler} />
        </div>
      );
    }
    if (status === 'pending') {      
      return (
        <div className={s.app}>
          <Searchbar onSubmit={submitHandler} />
          {imgArray&&<ImageGallery array={imgArray} onClick={handleForModal} />}
          <Loader />
          <p style={{ textAlign: 'center', fontSize: 30 }}>Loading...</p>
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div className={s.app}>
          <Searchbar onSubmit={submitHandler} />
          <p style={{ textAlign: 'center', fontSize: 30 }}>{error}</p>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className={s.app}>
          <Searchbar onSubmit={submitHandler} />
          <ImageGallery array={imgArray} onClick={handleForModal} />
          {imgArray && <Button handleButton={handleButton} />}
          {showModal &&<Modal largeImg={largeImg} onClose={toggleModal} />}
        </div>
      );
    }
    if (status === 'resolveWithoutButton') {
      return (
        <div className={s.app}>
          <Searchbar onSubmit={submitHandler} />
          <ImageGallery array={imgArray} onClick={handleForModal} />
          <p style={{ textAlign: 'center', fontSize: 30 }}>На этом пока ВСЕ!</p>
          {showModal &&<Modal largeImg={largeImg} onClose={toggleModal} />}
        </div>
      );
    }
  }

