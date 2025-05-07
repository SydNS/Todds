import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FantasyBackground from '../components/backgrounds/FantasyBackground';
import { COLORS, SIZES } from '../constants/theme';

const SplashScreen = () => {
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      // Navigation will be handled by the Authentication context
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <FantasyBackground>
      <View style={styles.content}>
        <Animatable.View 
          animation="bounceIn"
          duration={1500}
          delay={300}
          style={styles.logoContainer}
        >
          <View style={styles.logoInner}>
            <FontAwesome5 name="book-open" size={50} color="#fff" />
          </View>
          <View style={styles.starContainer1}>
            <Animatable.View animation="pulse" iterationCount="infinite" duration={1500}>
              <FontAwesome5 name="star" size={18} color={COLORS.accent1} />
            </Animatable.View>
          </View>
          <View style={styles.starContainer2}>
            <Animatable.View animation="pulse" iterationCount="infinite" duration={2000} delay={200}>
              <FontAwesome5 name="star" size={14} color={COLORS.accent3} />
            </Animatable.View>
          </View>
          <View style={styles.starContainer3}>
            <Animatable.View animation="pulse" iterationCount="infinite" duration={1800} delay={400}>
              <FontAwesome5 name="star" size={16} color={COLORS.accent6} />
            </Animatable.View>
          </View>
        </Animatable.View>
        
        <Animatable.View
          animation="fadeIn"
          duration={1000}
          delay={1000}
          style={styles.textContainer}
        >
          <Text style={styles.title}>Shekhinah</Text>
          <Text style={styles.subtitle}>Toddler's Learning App</Text>
        </Animatable.View>

        <Animatable.View
          animation="fadeInUp"
          duration={1000}
          delay={1500}
          style={styles.loadingContainer}
        >
          <Text style={styles.loadingText}>Loading...</Text>
          <Animatable.View
            animation="slideInLeft"
            iterationCount="infinite"
            duration={1000}
            style={styles.loadingBar}
          />
        </Animatable.View>
      </View>
    </FantasyBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 40,
  },
  logoInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.splash.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  starContainer1: {
    position: 'absolute',
    top: -15,
    right: -15,
  },
  starContainer2: {
    position: 'absolute',
    bottom: 10,
    right: -20,
  },
  starContainer3: {
    position: 'absolute',
    left: -15,
    top: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: SIZES.xxxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    letterSpacing: 1,
  },
  loadingContainer: {
    width: 200,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: 10,
  },
  loadingBar: {
    height: 4,
    width: '30%',
    backgroundColor: COLORS.accent1,
    borderRadius: 2,
    alignSelf: 'flex-start',
  }
});

export default SplashScreen; 