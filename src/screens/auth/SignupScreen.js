import React, { useState } from 'react';
import {
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

const SignupScreen = ({ navigation }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Child specific details
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [childGender, setChildGender] = useState('');
  const [childGrade, setChildGrade] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSignup = async () => {
    // Clear previous errors
    setError('');

    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all parent fields');
      return;
    }

    if (!childName || !childAge || !childGender || !childGrade) {
      setError('Please fill in all child details');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const result = await register(name, email, password, {
        childName,
        childAge,
        childGender,
        childGrade
      });
      
      if (!result.success) {
        setError(result.error);
      }
    } catch (error) {
      setError('An error occurred during registration. Please try again.');
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
          <View style={styles.header}>
            <Text style={styles.titleText}>Create Account</Text>
            <Text style={styles.subtitleText}>Sign up to get started with our learning app</Text>
          </View>

          <View style={styles.formContainer}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Text style={styles.sectionTitle}>Parent Information</Text>

            <TextInput
              label="Full Name"
              placeholder="Enter parent's full name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            <TextInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TextInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            
            <Text style={styles.sectionTitle}>Child Information</Text>
            
            <TextInput
              label="Child's Name"
              placeholder="Enter child's name"
              value={childName}
              onChangeText={setChildName}
              autoCapitalize="words"
            />
            
            <TextInput
              label="Age"
              placeholder="Enter child's age (e.g., 4 years)"
              value={childAge}
              onChangeText={setChildAge}
              keyboardType="number-pad"
            />
            
            <TextInput
              label="Gender"
              placeholder="Enter child's gender"
              value={childGender}
              onChangeText={setChildGender}
              autoCapitalize="words"
            />
            
            <TextInput
              label="Grade/Class"
              placeholder="Enter child's grade or class (e.g., Pre-K)"
              value={childGrade}
              onChangeText={setChildGrade}
              autoCapitalize="words"
            />

            <Button
              title="Sign Up"
              onPress={handleSignup}
              loading={isLoading}
              style={styles.signupButton}
            />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.termsText}>
            By signing up, you agree to our Terms of Service and Privacy Policy
          </Text>
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
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: SIZES.medium,
    marginBottom: SIZES.medium,
  },
  errorText: {
    color: COLORS.error,
    marginBottom: SIZES.medium,
    textAlign: 'center',
  },
  signupButton: {
    marginTop: SIZES.large,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.xlarge,
  },
  loginText: {
    color: COLORS.textLight,
    fontSize: SIZES.font,
  },
  loginLink: {
    color: COLORS.primary,
    fontSize: SIZES.font,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: SIZES.xlarge,
  },
});

export default SignupScreen; 