import { useEffect, useState } from 'react';

// For screens that need specific backgrounds
export const SCREEN_TYPES = {
  HOME: 'home',
  MY_CORNER: 'my_corner',
  SING: 'sing',
  BOOKS: 'books',
  GENERIC: 'generic'
};

/**
 * Helper function to get a transparent overlay style
 * @param {number} opacity - The opacity level (0-1)
 * @returns {object} The overlay style object
 */
export const getTransparentOverlay = (opacity = 0.3) => {
  return {
    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
  };
};

/**
 * Get a background image based on the screen type
 * @param {string} screenType - The type of screen to get a background for
 * @returns {object} The image source
 */
export const getScreenBackground = (screenType = SCREEN_TYPES.GENERIC) => {
  switch (screenType) {
    case SCREEN_TYPES.MY_CORNER:
      // Use the child-friendly cartoon park background for My Corner
      return require('../../assets/images/bg3.png');
    
    case SCREEN_TYPES.SING:
      return require('../../assets/images/bg4.png');
      
    case SCREEN_TYPES.BOOKS:
      return require('../../assets/images/bg5.png');
      
    case SCREEN_TYPES.HOME:
      return require('../../assets/images/bg1.png');
      
    default:
      return require('../../assets/images/bg2.png');
  }
};

/**
 * Get a random background image from the assets folder
 * @returns {object} The image source
 */
export const getRandomBackground = () => {
  const backgrounds = [
    require('../../assets/images/bg1.png'),
    require('../../assets/images/bg2.png'),
    require('../../assets/images/bg3.png'),
    require('../../assets/images/bg4.png'),
    require('../../assets/images/bg5.png')
  ];
  
  // Select a random background
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  return backgrounds[randomIndex];
};

/**
 * Custom hook to use a specific background image for a screen type
 * @param {string} screenType - The type of screen
 * @returns {object} The selected background image source
 */
export const useScreenBackground = (screenType) => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  
  useEffect(() => {
    setBackgroundImage(getScreenBackground(screenType));
  }, [screenType]);
  
  return backgroundImage;
};

/**
 * Custom hook to use a random background image that changes on each component mount
 * @returns {object} The selected background image source
 */
export const useRandomBackground = () => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  
  useEffect(() => {
    setBackgroundImage(getRandomBackground());
  }, []);
  
  return backgroundImage;
}; 