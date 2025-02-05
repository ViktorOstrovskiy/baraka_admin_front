import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import './Modal.scss';
import CloseSvg from "../Icons/CloseSvg.jsx";

const modalStyle = {
    overlay: {
        background: 'rgba(17, 17, 17, 0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1000,
    },
};

const Modal = ({ children, onClose, title, isOpen }) => {
    const ref = useRef(null);

    return (
        <ReactModal
            ref={ref}
            isOpen={isOpen}
            onRequestClose={() => onClose && onClose()}
            style={modalStyle}
            className="modal"
            overlayClassName="modal-overlay"
        >
            {title && <div className="modal-title">{title}</div>}
            <div className="modal-close" onClick={() => onClose && onClose()}>
                <CloseSvg />
            </div>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </ReactModal>
    );
};

export default React.memo(Modal);
