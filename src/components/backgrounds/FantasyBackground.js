import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

// Background image URLs
const FANTASY_BG = 'https://i.ibb.co/4pFXVgZ/fantasy-bg.jpg';

// Element image URLs - using the image from the first screenshot
const UFO_IMAGE = 'https://i.ibb.co/0CLJcK7/ufo.png';
const MOON_IMAGE = 'https://i.ibb.co/1L3Ln0b/moon.png';
const MUSHROOM_IMAGE = 'https://i.ibb.co/MRbhccL/mushroom.png';
const SUNFLOWER_IMAGE = 'https://i.ibb.co/LrB4JBD/sunflower.png';
const STAR_IMAGE = 'https://i.ibb.co/8mMzMxF/star.png';

// Custom animations
Animatable.initializeRegistryWithDefinitions({
  floatUp: {
    from: { translateY: 0 },
    to: { translateY: -15 },
  },
  floatDown: {
    from: { translateY: 0 },
    to: { translateY: 15 },
  },
  rotateSlowly: {
    from: { rotate: '0deg' },
    to: { rotate: '360deg' },
  },
  pulse: {
    0: { scale: 1 },
    0.5: { scale: 1.1 },
    1: { scale: 1 },
  },
});

const FantasyBackground = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {/* Main background */}
      <Image 
        source={{ uri: FANTASY_BG }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Animated elements */}
      <View style={styles.animatedElements}>
        {/* UFO with beam */}
        <Animatable.View
          animation="floatUp"
          iterationCount="infinite"
          direction="alternate"
          duration={3000}
          style={styles.ufoContainer}
        >
          <Image 
            source={{ uri: UFO_IMAGE }}
            style={styles.ufoImage}
            resizeMode="contain"
          />
        </Animatable.View>
        
        {/* Moon */}
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={5000}
          style={styles.moonContainer}
        >
          <Image
            source={{ uri: MOON_IMAGE }}
            style={styles.moonImage}
            resizeMode="contain"
          />
        </Animatable.View>
        
        {/* Stars */}
        <View style={styles.starsContainer}>
          {[...Array(8)].map((_, i) => (
            <Animatable.Image
              key={`star-${i}`}
              source={{ uri: STAR_IMAGE }}
              style={[
                styles.starImage,
                {
                  left: `${10 + Math.random() * 80}%`,
                  top: `${5 + Math.random() * 40}%`,
                  width: 10 + Math.random() * 20,
                  height: 10 + Math.random() * 20,
                  opacity: 0.5 + Math.random() * 0.5,
                }
              ]}
              animation="pulse"
              iterationCount="infinite"
              duration={2000 + Math.random() * 2000}
              delay={Math.random() * 1000}
              resizeMode="contain"
            />
          ))}
        </View>
        
        {/* Flowers/Sunflowers at the bottom */}
        <View style={styles.flowersContainer}>
          {[...Array(4)].map((_, i) => (
            <Animatable.Image
              key={`flower-${i}`}
              source={{ uri: SUNFLOWER_IMAGE }}
              style={[
                styles.flowerImage,
                { 
                  left: `${15 + i * 23}%`,
                  width: 50 + Math.random() * 30,
                  height: 50 + Math.random() * 30,
                }
              ]}
              animation="pulse"
              iterationCount="infinite"
              duration={3000}
              delay={i * 500}
              resizeMode="contain"
            />
          ))}
        </View>
        
        {/* Mushrooms */}
        <View style={styles.mushroomsContainer}>
          <Animatable.Image
            source={{ uri: MUSHROOM_IMAGE }}
            style={styles.mushroomImage}
            animation="pulse"
            iterationCount="infinite"
            duration={4000}
            resizeMode="contain"
          />
        </View>
      </View>
      
      {/* Foreground Content */}
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
  },
  animatedElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  ufoContainer: {
    position: 'absolute',
    top: '10%',
    right: '15%',
  },
  ufoImage: {
    width: 80,
    height: 80,
  },
  moonContainer: {
    position: 'absolute',
    top: '15%',
    right: '20%',
  },
  moonImage: {
    width: 60,
    height: 60,
  },
  starsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  starImage: {
    position: 'absolute',
  },
  mushroomsContainer: {
    position: 'absolute',
    right: '15%',
    bottom: '25%',
  },
  mushroomImage: {
    width: 50,
    height: 50,
  },
  flowersContainer: {
    position: 'absolute',
    bottom: '10%',
    width: '100%',
  },
  flowerImage: {
    position: 'absolute',
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    zIndex: 1,
  },
});

export default FantasyBackground; 