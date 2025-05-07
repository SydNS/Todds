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
  pulse: {
    0: { scale: 1 },
    0.5: { scale: 1.1 },
    1: { scale: 1 },
  },
  fadeIn: {
    0: { opacity: 0 },
    1: { opacity: 1 },
  },
  fadeInUp: {
    0: { opacity: 0, translateY: 20 },
    1: { opacity: 1, translateY: 0 },
  },
  fadeInDown: {
    0: { opacity: 0, translateY: -20 },
    1: { opacity: 1, translateY: 0 },
  },
  fadeInRight: {
    0: { opacity: 0, translateX: -20 },
    1: { opacity: 1, translateX: 0 },
  },
  slideInLeft: {
    0: { translateX: -100 },
    1: { translateX: 0 },
  },
  tada: {
    0: { transform: [{ scale: 1 }] },
    0.1: { transform: [{ scale: 0.9 }, { rotate: '-3deg' }] },
    0.2: { transform: [{ scale: 0.9 }, { rotate: '-3deg' }] },
    0.3: { transform: [{ scale: 1.1 }, { rotate: '3deg' }] },
    0.4: { transform: [{ scale: 1.1 }, { rotate: '-3deg' }] },
    0.5: { transform: [{ scale: 1.1 }, { rotate: '3deg' }] },
    0.6: { transform: [{ scale: 1.1 }, { rotate: '-3deg' }] },
    0.7: { transform: [{ scale: 1.1 }, { rotate: '3deg' }] },
    0.8: { transform: [{ scale: 1.1 }, { rotate: '-3deg' }] },
    0.9: { transform: [{ scale: 1.1 }, { rotate: '3deg' }] },
    1: { transform: [{ scale: 1 }] },
  },
  shake: {
    0: { translateX: 0 },
    0.1: { translateX: -10 },
    0.2: { translateX: 10 },
    0.3: { translateX: -10 },
    0.4: { translateX: 10 },
    0.5: { translateX: -10 },
    0.6: { translateX: 10 },
    0.7: { translateX: -10 },
    0.8: { translateX: 10 },
    0.9: { translateX: -10 },
    1: { translateX: 0 },
  },
  zoomIn: {
    0: { opacity: 0, scale: 0.5 },
    1: { opacity: 1, scale: 1 },
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