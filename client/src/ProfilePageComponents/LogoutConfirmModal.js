import React, {useState, useEffect} from 'react';
import useModalAnimation from '../hooks/useModalAnimation';
import './LogoutConfirmModal.css';

const LogoutConfirmModal = ({handleModalClose, onConfirm}) => {
    let {animationClassNames, handleAnimatedClose} = useModalAnimation(handleModalClose, 300, "logout-modal");
    const handleModalClick = (e) => {
        e.stopPropagation();
    };
    console.log(animationClassNames.overlayClass);
    return (
        <div className={animationClassNames.overlayClass} onClick={handleAnimatedClose}>
            <div className={`${animationClassNames.containerClass} logout-confirm-container`} onClick={handleModalClick}>
            <h2 className="logout-heading">Are you sure you want to logout?</h2>
            <div className="logout-buttons">
                <button className="cancel-button" onClick={handleAnimatedClose}>Cancel</button>
                <button className="confirm-button" onClick={onConfirm}>Logout</button>
            </div>
            </div>
        </div>    
    );
};


export default LogoutConfirmModal;