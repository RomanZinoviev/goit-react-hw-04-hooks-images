import {  useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from "../Modal/Modal.module.css";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector("#modal-root")
export function Modal ({onClose, largeImg}) {
  useEffect(() => {
    const handleKeyDown= (e)=> {
    if (e.code === "Escape") {
      onClose();
    }
  };
    window.addEventListener("keydown", handleKeyDown);
    return () => { window.removeEventListener("keydown", handleKeyDown) };
  }, [onClose]);
  // componentDidMount() {
  //   window.addEventListener("keydown", this.handleKeyDown)
  // };
  // componentWillUnmount() {
  //   window.removeEventListener("keydown", this.handleKeyDown)
  // };

  const handleForCloseModal = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };  
    return createPortal(<div className={s.overlay} onClick={handleForCloseModal}>
        <div className={s.modal}>
          <img src={largeImg} alt="photoImg" />
        </div>
      </div>, modalRoot);
};
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImg: PropTypes.string.isRequired
  };
