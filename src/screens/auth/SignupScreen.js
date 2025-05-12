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
import { getLevelByAge } from '../../constants/learningLevels';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { getTransparentOverlay, useRandomBackground } from '../../utils/backgroundUtils';

const SignupScreen = ({ navigation }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Child specific details
  const [childName, setChildName] = useState('');
  const [age, setAge] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(null);
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const backgroundImage = useRandomBackground();

  const handleAgeChange = (value) => {
    setAge(value);
    const ageNum = parseInt(value);
    if (!isNaN(ageNum) && ageNum >= 2 && ageNum <= 8) {
      const level = getLevelByAge(ageNum);
      if (level.id !== selectedLevel?.id) {
        setSelectedLevel(level);
      }
    } else {
      setSelectedLevel(null);
    }
  };

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

    if (!childName || !age) {
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
        age,
        level: selectedLevel
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
              <View style={styles.header}>
                <Text style={styles.welcomeText}>Create Account</Text>
                <Text style={styles.subtitleText}>Sign up to start your child's learning journey</Text>
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
                  value={age}
                  onChangeText={handleAgeChange}
                  keyboardType="number-pad"
                />

                {selectedLevel && (
                  <View style={styles.levelContainer}>
                    <Text style={styles.levelTitle}>Recommended Level:</Text>
                    <View style={styles.levelCard}>
                      <Text style={styles.levelName}>{selectedLevel.name}</Text>
                      <Text style={styles.levelAge}>Age: {selectedLevel.ageRange}</Text>
                      <Text style={styles.levelDescription}>{selectedLevel.description}</Text>
                      <View style={styles.skillsContainer}>
                        {selectedLevel.skills.map((skill, index) => (
                          <View key={index} style={styles.skillTag}>
                            <Text style={styles.skillText}>{skill}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                )}

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
  header: {
    alignItems: 'center',
    marginBottom: SIZES.xlarge,
  },
  welcomeText: {
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
  levelContainer: {
    marginVertical: SIZES.spacing.m,
  },
  levelTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.spacing.s,
  },
  levelCard: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.spacing.m,
    ...SHADOWS.small,
  },
  levelName: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.spacing.xs,
  },
  levelAge: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: SIZES.spacing.xs,
  },
  levelDescription: {
    fontSize: SIZES.font,
    color: COLORS.text,
    marginBottom: SIZES.spacing.s,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SIZES.spacing.s,
  },
  skillTag: {
    backgroundColor: COLORS.primary + '20',
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SIZES.spacing.s,
    paddingVertical: SIZES.spacing.xs,
    marginRight: SIZES.spacing.xs,
    marginBottom: SIZES.spacing.xs,
  },
  skillText: {
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
});

export default SignupScreen; 