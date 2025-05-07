/**
 * Shekhinah Toddler's Learning App Theme
 */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base colors
export const COLORS = {
  // Primary app colors
  primary: '#4FC3F7',       // Bright blue
  secondary: '#FF8A65',      // Coral orange
  tertiary: '#AED581',       // Light green
  background: '#F5F9FF',     // Light background
  card: '#FFFFFF',          // White for cards
  text: '#3A3A3A',          // Dark gray for main text
  textLight: '#757575',      // Medium gray for secondary text
  
  // Accent colors
  accent1: '#FFD54F',        // Yellow
  accent2: '#CE93D8',        // Purple
  accent3: '#4DB6AC',        // Teal
  accent4: '#FF8A65',        // Coral
  accent5: '#4FC3F7',        // Light blue
  accent6: '#F06292',        // Pink
  
  // Status colors
  success: '#AED581',        // Green
  error: '#FF8A65',          // Red
  warning: '#FFD54F',        // Yellow
  info: '#29B6F6',           // Light blue for info
  
  // Utility colors
  shadow: 'rgba(0, 0, 0, 0.1)', // Shadow color
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)', // Overlay color
  
  // Scene-specific colors
  splash: {
    primary: '#FF8A65',
    secondary: '#4FC3F7',
    accent: '#AED581',
    highlight: '#FFD54F',
  },
  
  onboarding: {
    primary: '#CE93D8',
    secondary: '#81D4FA',
    accent: '#FFD54F',
    highlight: '#A5D6A7',
  },
  
  phonicsPlayground: {
    primary: '#4DB6AC',
    secondary: '#B2DFDB',
    accent: '#FFB74D',
    highlight: '#81C784',
  },
  
  storyWorld: {
    primary: '#FF8A65',
    secondary: '#FFCCBC',
    accent: '#7986CB',
    highlight: '#A1887F',
  },
  
  gameZone: {
    primary: '#4FC3F7',
    secondary: '#B3E5FC',
    accent: '#FF8A65',
    highlight: '#AED581',
  },
  
  rhymeRhythm: {
    primary: '#CE93D8',
    secondary: '#E1BEE7',
    accent: '#FFD54F',
    highlight: '#FF8A65',
  },
  
  dashboard: {
    primary: '#FFD54F',
    secondary: '#81C784',
    accent: '#64B5F6',
    highlight: '#FFCC80',
  },
  
  dyslexiaFriendly: {
    primary: '#B3E5FC',
    secondary: '#C5E1A5',
    accent: '#FFECB3',
    highlight: '#E1BEE7',
  },
  
  multilingual: {
    primary: '#4DB6AC',
    secondary: '#FFB74D',
    accent: '#7986CB',
    highlight: '#F06292',
  },
};

// Font configurations
export const FONT = {
  regular: 'System',        // We'll use system fonts for now
  medium: 'System',
  bold: 'System',
  
  // For dyslexia-friendly mode (to be implemented)
  dyslexic: 'System',       // Will be replaced with OpenDyslexic when implemented
  
  // Font weights
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
  }
};

// Size configurations for consistent UI
export const SIZES = {
  // Global sizes
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32,
  xxxlarge: 40,
  
  // Specific sizes
  buttonHeight: 50,
  inputHeight: 50,
  borderRadius: 12,
  cardRadius: 20,
  
  // Screen padding
  screenPadding: 16,
  
  // Icon sizes
  iconSmall: 16,
  iconMedium: 24,
  iconLarge: 32,
  iconXLarge: 48,
  
  // Spacing system
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Screen dimensions
  width,
  height,
};

// Shadow styles for different elevations
export const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

// Design system themes for different app sections
export const THEMES = {
  default: {
    colors: {
      primary: COLORS.primary,
      secondary: COLORS.secondary,
      background: COLORS.background,
      text: COLORS.text,
    },
    fonts: FONT,
    sizes: SIZES,
    shadows: SHADOWS,
  },
  
  splash: {
    colors: {
      primary: COLORS.splash.primary,
      secondary: COLORS.splash.secondary,
      accent: COLORS.splash.accent,
      highlight: COLORS.splash.highlight,
      background: COLORS.background,
      text: COLORS.text,
    },
    fonts: FONT,
    sizes: SIZES,
    shadows: SHADOWS,
  },
  
  onboarding: {
    colors: {
      primary: COLORS.onboarding.primary,
      secondary: COLORS.onboarding.secondary,
      accent: COLORS.onboarding.accent,
      highlight: COLORS.onboarding.highlight,
      background: COLORS.background,
      text: COLORS.text,
    },
    fonts: FONT,
    sizes: SIZES,
    shadows: SHADOWS,
  },
  
  // Additional themes for each section can be defined similarly
  
  // Special theme for dyslexia-friendly mode
  dyslexiaFriendly: {
    colors: {
      primary: COLORS.dyslexiaFriendly.primary,
      secondary: COLORS.dyslexiaFriendly.secondary,
      accent: COLORS.dyslexiaFriendly.accent,
      highlight: COLORS.dyslexiaFriendly.highlight,
      background: '#F8F9FA', // Light cream background
      text: '#333333',       // Dark text for contrast
    },
    fonts: {
      ...FONT,
      regular: 'OpenDyslexic',  // Will be implemented later
      medium: 'OpenDyslexic',
      bold: 'OpenDyslexic',
    },
    sizes: {
      ...SIZES,
      font: 16,      // Slightly larger text
      medium: 18,
      large: 20,
    },
    shadows: SHADOWS,
  },
};

// Playful animations for children's UI
export const ANIMATIONS = {
  bounce: {
    0: { scale: 1 },
    0.5: { scale: 1.1 },
    1: { scale: 1 }
  },
  pulse: {
    0: { scale: 1 },
    0.5: { scale: 1.05 },
    1: { scale: 1 }
  },
  wiggle: {
    0: { rotate: '0deg' },
    0.25: { rotate: '-3deg' },
    0.5: { rotate: '0deg' },
    0.75: { rotate: '3deg' },
    1: { rotate: '0deg' },
  }
};

// For consistent styling of kid-friendly fonts
export const FONTS = {
  heading: {
    fontWeight: 'bold',
    fontSize: SIZES.large,
    color: COLORS.text,
  },
  subheading: {
    fontWeight: '600',
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  body: {
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  caption: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
};

export default { COLORS, FONT, SIZES, SHADOWS, THEMES, ANIMATIONS, FONTS }; 