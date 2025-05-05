import { Animated, Easing } from 'react-native';
import * as Animatable from 'react-native-animatable';

/**
 * Animation presets for use throughout the app
 */

// Make bounce animation a bit more playful for children
Animatable.initializeRegistryWithDefinitions({
  kidBounce: {
    0: {
      transform: [{ scale: 1 }],
    },
    0.3: {
      transform: [{ scale: 1.2 }],
    },
    0.5: {
      transform: [{ scale: 0.9 }],
    },
    0.7: {
      transform: [{ scale: 1.1 }],
    },
    1: {
      transform: [{ scale: 1 }],
    },
  },
  sparkle: {
    0: {
      opacity: 0,
      transform: [{ scale: 0 }, { rotate: '0deg' }],
    },
    0.3: {
      opacity: 1,
      transform: [{ scale: 1.2 }, { rotate: '45deg' }],
    },
    0.7: {
      opacity: 1,
      transform: [{ scale: 0.8 }, { rotate: '-45deg' }],
    },
    1: {
      opacity: 0,
      transform: [{ scale: 1.5 }, { rotate: '90deg' }],
    },
  },
});

/**
 * Create a scale animation
 * @param {Animated.Value} value - Animated value to animate
 * @param {number} toValue - Target value
 * @param {number} duration - Duration in ms
 * @param {function} callback - Callback function
 */
export const createScaleAnimation = (value, toValue, duration = 300, callback) => {
  return Animated.timing(value, {
    toValue,
    duration,
    useNativeDriver: true,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  }).start(callback);
};

/**
 * Create a bounce animation sequence
 * @param {Animated.Value} value - Animated value to animate
 * @param {function} callback - Callback function
 */
export const createBounceAnimation = (value, callback) => {
  return Animated.sequence([
    Animated.timing(value, {
      toValue: 1.2,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }),
    Animated.timing(value, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }),
    Animated.timing(value, {
      toValue: 1.05,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }),
    Animated.timing(value, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }),
  ]).start(callback);
};

/**
 * Animation durations
 */
export const DURATIONS = {
  FAST: 300,
  MEDIUM: 500,
  SLOW: 800,
};

/**
 * Animation delay gaps
 */
export const DELAYS = {
  STAGGER: 100,
  SHORT: 200,
  MEDIUM: 400,
  LONG: 800,
};

export default {
  createScaleAnimation,
  createBounceAnimation,
  DURATIONS,
  DELAYS,
}; 