import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      // Navigation will be handled by the Authentication context
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Background image - a colorful cartoon landscape */}
      <ImageBackground
        source={require('../../assets/splash/rainbow-landscape.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Main content */}
          <View style={styles.content}>
            {/* Logo and animated elements */}
            <Animatable.View 
              animation="bounceIn"
              duration={1500}
              delay={300}
              style={styles.logoContainer}
            >
              <View style={styles.logoInner}>
                <FontAwesome5 name="book-open" size={50} color="#fff" />
              </View>
              {/* Animated stars */}
              <Animatable.View 
                animation="pulse" 
                iterationCount="infinite" 
                duration={1500}
                style={[styles.animatedElement, styles.star1]}
              >
                <FontAwesome5 name="star" size={24} color="#FFD700" />
              </Animatable.View>
              
              <Animatable.View 
                animation="pulse" 
                iterationCount="infinite" 
                duration={2000}
                style={[styles.animatedElement, styles.star2]}
              >
                <FontAwesome5 name="star" size={18} color="#FF6B6B" />
              </Animatable.View>
              
              <Animatable.View 
                animation="pulse" 
                iterationCount="infinite" 
                duration={1800}
                style={[styles.animatedElement, styles.star3]}
              >
                <FontAwesome5 name="star" size={20} color="#4ECDC4" />
              </Animatable.View>
            </Animatable.View>
            
            {/* App name with animation */}
            <Animatable.View
              animation="fadeIn"
              duration={1000}
              delay={1000}
              style={styles.textContainer}
            >
              <Text style={styles.title}>Todds</Text>
              <Text style={styles.subtitle}>Fun Learning Adventure</Text>
            </Animatable.View>

            {/* Loading animation */}
            <Animatable.View
              animation="fadeInUp"
              duration={1000}
              delay={1500}
              style={styles.loadingContainer}
            >
              <Text style={styles.loadingText}>Getting the fun ready...</Text>
              <View style={styles.progressBarContainer}>
                <Animatable.View
                  animation="slideInLeft"
                  iterationCount="infinite"
                  duration={1500}
                  style={styles.progressBar}
                />
              </View>
            </Animatable.View>

            {/* Animated characters */}
            <Animatable.View 
              animation="slideInUp" 
              duration={1000} 
              delay={500}
              style={[styles.animatedCharacter, styles.character1]}
            >
              <FontAwesome5 name="cat" size={32} color="#FF9A8B" />
            </Animatable.View>
            
            <Animatable.View 
              animation="slideInUp" 
              duration={1000} 
              delay={800}
              style={[styles.animatedCharacter, styles.character2]}
            >
              <FontAwesome5 name="dog" size={32} color="#6A0572" />
            </Animatable.View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 30,
  },
  logoInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.5)',
    elevation: 10,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  animatedElement: {
    position: 'absolute',
    zIndex: 10,
  },
  star1: {
    top: -20,
    right: -15,
  },
  star2: {
    bottom: 5,
    right: -20,
  },
  star3: {
    left: -15,
    top: 15,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
  },
  subtitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 1,
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
  },
  loadingContainer: {
    width: 250,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 12,
    fontWeight: '600',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    width: '40%',
    backgroundColor: '#FF9A8B',
    borderRadius: 10,
  },
  animatedCharacter: {
    position: 'absolute',
    zIndex: 5,
  },
  character1: {
    bottom: height * 0.15,
    left: width * 0.15,
  },
  character2: {
    bottom: height * 0.15,
    right: width * 0.15,
  }
});

export default SplashScreen; 