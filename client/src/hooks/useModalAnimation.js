import { useState, useEffect } from 'react';

const useModalAnimation = (onClose, duration=300, baseClass="modal") => {
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    
    const handleAnimatedClose = () => {
        setIsFadingOut(true);
        setTimeout(() => {
            onClose();
        }, duration);
    }

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);// triggers fade-in
        }, 10);

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
              handleAnimatedClose();
            }
          };
        
        window.addEventListener('keydown', handleKeyDown);
          return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
        
    }, []);

    const animationClassNames = {
        overlayClass: `${baseClass}-overlay ${isVisible ? 'show': ''} ${isFadingOut? 'hidden' : ''}`,
        containerClass: `${baseClass}-container ${isVisible ? 'show': ''} ${isFadingOut? 'hidden' : ''}`
    }
    return {animationClassNames, handleAnimatedClose};
};
  
export default useModalAnimation;