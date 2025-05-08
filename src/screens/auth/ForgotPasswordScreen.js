import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { COLORS, SIZES } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { getTransparentOverlay, useRandomBackground } from '../../utils/backgroundUtils';

const ForgotPasswordScreen = ({ navigation }) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const backgroundImage = useRandomBackground();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    // Clear previous errors
    setError('');

    // Validate email
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const result = await resetPassword(email);
      if (result.success) {
        setMessage("We've sent a password reset link to your email!");
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={backgroundImage} 
        style={styles.backgroundImage}
      >
        <View style={[styles.overlay, getTransparentOverlay()]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <ScrollView 
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <FontAwesome5 name="arrow-left" size={20} color={COLORS.text} />
              </TouchableOpacity>

              <View style={styles.header}>
                <Text style={styles.titleText}>Reset Password</Text>
                <Text style={styles.subtitleText}>
                  Enter your email and we'll send you instructions to reset your password
                </Text>
              </View>

              <View style={styles.formContainer}>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                {message ? <Text style={styles.successText}>{message}</Text> : null}

                <TextInput
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Button
                  title="Send Reset Link"
                  onPress={handleResetPassword}
                  loading={isLoading}
                  style={styles.resetButton}
                />

                <TouchableOpacity 
                  style={styles.loginContainer}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.loginText}>Back to Login</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  backButton: {
    marginBottom: SIZES.large,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.xlarge,
  },
  titleText: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.small,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SIZES.large,
  },
  formContainer: {
    width: '100%',
  },
  errorText: {
    color: COLORS.error,
    marginBottom: SIZES.medium,
    textAlign: 'center',
  },
  resetButton: {
    marginTop: SIZES.large,
  },
  successText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.xlarge,
  },
  loginContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: SIZES.large,
  },
  loginText: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen; 