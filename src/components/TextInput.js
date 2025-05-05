import React, { useState } from 'react';
import { 
  View, 
  TextInput as RNTextInput, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

const TextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  error,
  keyboardType = 'default',
  autoCapitalize = 'none',
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
  containerStyle,
  labelStyle,
  errorStyle,
  autoFocus = false,
  onBlur,
  onFocus,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputFocused,
        error && styles.inputError,
        style
      ]}>
        <RNTextInput
          style={[
            styles.input,
            multiline && { height: 100, textAlignVertical: 'top' },
            inputStyle
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          autoFocus={autoFocus}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={COLORS.textLight}
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableOpacity 
            onPress={togglePasswordVisibility}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleText}>
              {isPasswordVisible ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.medium,
    width: '100%',
  },
  label: {
    fontSize: SIZES.font,
    color: COLORS.text,
    marginBottom: SIZES.base,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.textLight,
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.background,
  },
  input: {
    flex: 1,
    height: SIZES.inputHeight,
    paddingHorizontal: SIZES.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: SIZES.small,
    marginTop: SIZES.base / 2,
  },
  toggleButton: {
    padding: SIZES.medium,
  },
  toggleText: {
    color: COLORS.primary,
    fontSize: SIZES.small,
    fontWeight: '600',
  },
});

export default TextInput; 