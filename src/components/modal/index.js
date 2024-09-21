import React, { useEffect } from 'react';
import './style.css';

function Modal({ onClose, children }) {
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-body">
          {children} 
        </div>
      </div>
    </>
  );
}

export default Modal;
