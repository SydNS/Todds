import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

const ForgotPasswordScreen = ({ navigation }) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
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
        setIsSubmitted(true);
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.titleText}>Forgot Password</Text>
            <Text style={styles.subtitleText}>
              {isSubmitted 
                ? "We've sent a password reset link to your email!" 
                : "Enter your email and we'll send you a link to reset your password"}
            </Text>
          </View>

          {!isSubmitted ? (
            <View style={styles.formContainer}>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
                onPress={handleSubmit}
                loading={isLoading}
                style={styles.submitButton}
              />
            </View>
          ) : (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>
                Please check your email and follow the instructions to reset your password.
              </Text>
              <Button
                title="Back to Login"
                onPress={() => navigation.navigate('Login')}
                style={styles.loginButton}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: SIZES.xlarge,
    paddingTop: SIZES.xlarge,
    paddingBottom: SIZES.xlarge * 2,
  },
  backButton: {
    marginBottom: SIZES.large,
  },
  backButtonText: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontWeight: '600',
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
  submitButton: {
    marginTop: SIZES.large,
  },
  successContainer: {
    alignItems: 'center',
    marginTop: SIZES.xlarge,
  },
  successText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.xlarge,
  },
  loginButton: {
    width: '100%',
  },
});

export default ForgotPasswordScreen; 