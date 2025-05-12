/**
 * Shekhinah Toddler's Learning App Theme
 */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base colors
export const COLORS = {
  primary: '#1E5FBF',
  secondary: '#2D7DD2',
  tertiary: '#72A1E5',
  
  background: '#F5F8FA',
  card: '#FFFFFF',
  border: '#E1E1E1',
  
  text: '#333333',
  textLight: '#666666',
  textMuted: '#999999',
  
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17A2B8',
  
  // Government Theme Colors
  govBlue: {
    primary: '#1E5FBF',
    secondary: '#3A7BD5',
    accent: '#6394DA',
    highlight: '#B1CBF1',
  },
  
  civicGreen: {
    primary: '#2A9D8F',
    secondary: '#48B7AB',
    accent: '#76D1C8',
    highlight: '#B6E6E1',
  },
  
  justiceRed: {
    primary: '#E63946',
    secondary: '#EA5D68',
    accent: '#EF8993',
    highlight: '#F7C4C9',
  },
  
  legislativeYellow: {
    primary: '#F4A261',
    secondary: '#F6B483',
    accent: '#F8C7A6',
    highlight: '#FBE3D3',
  },
  
  publicServicesOrange: {
    primary: '#E76F51',
    secondary: '#EB8A72',
    accent: '#F0A893',
    highlight: '#F7D3CA',
  },
  
  // Accent colors
  accent1: '#9B5DE5',
  accent2: '#F15BB5',
  accent3: '#00BBF9',
  accent4: '#00F5D4',
  accent5: '#FD8A09',
  accent6: '#FB6107',
  
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
  // Font sizes
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  xlarge: 20,
  xxlarge: 24,
  
  // Spacing
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
  
  // UI elements
  borderRadius: 8,
  cardRadius: 12,
  buttonRadius: 8,
  screenPadding: 16,
  
  // Icon sizes
  iconSmall: 16,
  iconMedium: 24,
  iconLarge: 32,
  iconXLarge: 48,
};

// Shadow styles for different elevations
export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
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