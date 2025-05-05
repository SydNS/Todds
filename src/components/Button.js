import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  rounded = false,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  // Determine button styles based on props
  const getButtonStyles = () => {
    let buttonStyles = [styles.button];
    
    // Variant
    if (variant === 'primary') {
      buttonStyles.push(styles.primaryButton);
    } else if (variant === 'secondary') {
      buttonStyles.push(styles.secondaryButton);
    } else if (variant === 'outline') {
      buttonStyles.push(styles.outlineButton);
    } else if (variant === 'text') {
      buttonStyles.push(styles.textButton);
    }
    
    // Size
    if (size === 'small') {
      buttonStyles.push(styles.smallButton);
    } else if (size === 'large') {
      buttonStyles.push(styles.largeButton);
    }
    
    // Rounded
    if (rounded) {
      buttonStyles.push(styles.roundedButton);
    }
    
    // Disabled
    if (disabled) {
      buttonStyles.push(styles.disabledButton);
    }
    
    return buttonStyles;
  };
  
  // Determine text styles based on props
  const getTextStyles = () => {
    let textStyles = [styles.buttonText];
    
    if (variant === 'outline') {
      textStyles.push(styles.outlineButtonText);
    } else if (variant === 'text') {
      textStyles.push(styles.textButtonText);
    }
    
    if (size === 'small') {
      textStyles.push(styles.smallButtonText);
    } else if (size === 'large') {
      textStyles.push(styles.largeButtonText);
    }
    
    if (disabled) {
      textStyles.push(styles.disabledButtonText);
    }
    
    return textStyles;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'text' ? COLORS.primary : COLORS.background} 
        />
      ) : (
        <Text style={[...getTextStyles(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: SIZES.buttonHeight,
    borderRadius: SIZES.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.large,
    ...SHADOWS.small,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    height: 'auto',
    paddingHorizontal: 0,
  },
  smallButton: {
    height: SIZES.buttonHeight - 16,
    paddingHorizontal: SIZES.medium,
  },
  largeButton: {
    height: SIZES.buttonHeight + 10,
  },
  roundedButton: {
    borderRadius: SIZES.buttonHeight / 2,
  },
  disabledButton: {
    backgroundColor: COLORS.textLight,
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  outlineButtonText: {
    color: COLORS.primary,
  },
  textButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  smallButtonText: {
    fontSize: SIZES.font,
  },
  largeButtonText: {
    fontSize: SIZES.large,
  },
  disabledButtonText: {
    color: COLORS.card,
  },
});

export default Button; 