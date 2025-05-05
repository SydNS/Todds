/**
 * Shekhinah Toddler's Learning App Theme
 */

export const COLORS = {
  primary: '#FF8A65',       // Soft coral
  secondary: '#4FC3F7',     // Bright sky blue
  tertiary: '#AED581',      // Soft green
  background: '#FFFFFF',    // White
  card: '#F5F5F5',          // Light gray for cards
  text: '#333333',          // Dark gray for text
  textLight: '#757575',     // Medium gray for secondary text
  accent1: '#FFD54F',       // Soft yellow
  accent2: '#CE93D8',       // Soft purple
  accent3: '#81D4FA',       // Light blue
  success: '#66BB6A',       // Green for success messages
  error: '#EF5350',         // Soft red for errors
  warning: '#FFCA28',       // Amber for warnings
  info: '#29B6F6',          // Light blue for info
  shadow: 'rgba(0, 0, 0, 0.1)', // Shadow color
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)', // Overlay color
};

export const FONT = {
  regular: 'System',        // We'll use system fonts for now
  medium: 'System',
  bold: 'System',
};

export const SIZES = {
  // Global sizes
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  xlarge: 24,
  xxlarge: 32,
  
  // Specific sizes
  buttonHeight: 50,
  inputHeight: 50,
  borderRadius: 12,
  cardRadius: 16,
  
  // Screen padding
  screenPadding: 16,
  
  // Icon sizes
  iconSmall: 16,
  iconMedium: 24,
  iconLarge: 32,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 8,
  },
};

export default { COLORS, FONT, SIZES, SHADOWS }; 