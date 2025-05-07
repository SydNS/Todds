import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

// Background image URL - island scene from the second screenshot
const ISLAND_BG = 'https://i.ibb.co/gTZxvrZ/island-bg.jpg';

// Element image URLs
const BOAT_IMAGE = 'https://i.ibb.co/ByBjFNN/boat.png';
const CLOUD_IMAGE = 'https://i.ibb.co/jVhNBRJ/cloud.png';
const PALM_TREE_IMAGE = 'https://i.ibb.co/fGNxLvF/palm-tree.png';
const TREE_IMAGE = 'https://i.ibb.co/DWZQ4W3/tree.png';

// Custom animations
Animatable.initializeRegistryWithDefinitions({
  floatSideways: {
    from: { translateX: 0 },
    to: { translateX: 20 },
  },
  sway: {
    0: { rotate: '0deg' },
    50: { rotate: '2deg' },
    100: { rotate: '0deg' },
  },
  pulse: {
    0: { scale: 1 },
    0.5: { scale: 1.1 },
    1: { scale: 1 },
  },
});

const IslandBackground = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {/* Main background */}
      <Image 
        source={{ uri: ISLAND_BG }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Animated elements */}
      <View style={styles.animatedElements}>
        {/* Clouds */}
        <View style={styles.cloudsContainer}>
          {[...Array(3)].map((_, i) => (
            <Animatable.Image
              key={`cloud-${i}`}
              source={{ uri: CLOUD_IMAGE }}
              style={[
                styles.cloudImage,
                { 
                  left: `${10 + i * 30}%`,
                  top: `${5 + i * 6}%`,
                  width: 60 + Math.random() * 40,
                  height: 40 + Math.random() * 20,
                  opacity: 0.7 + Math.random() * 0.3,
                }
              ]}
              animation="floatSideways"
              iterationCount="infinite"
              direction="alternate"
              duration={8000 + i * 2000}
              delay={i * 1000}
              resizeMode="contain"
            />
          ))}
        </View>
        
        {/* Boat */}
        <Animatable.View
          animation={{
            0: { translateY: 0 },
            50: { translateY: -5 },
            100: { translateY: 0 },
          }}
          iterationCount="infinite"
          duration={3000}
          style={styles.boatContainer}
        >
          <Image 
            source={{ uri: BOAT_IMAGE }}
            style={styles.boatImage}
            resizeMode="contain"
          />
        </Animatable.View>
        
        {/* Trees */}
        <View style={styles.treesContainer}>
          {/* Pine Trees in the middle ground */}
          {[...Array(4)].map((_, i) => (
            <Animatable.Image
              key={`tree-${i}`}
              source={{ uri: TREE_IMAGE }}
              style={[
                styles.treeImage,
                { 
                  left: `${15 + i * 20}%`,
                  bottom: `${28 + Math.random() * 10}%`,
                  width: 40 + Math.random() * 30,
                  height: 60 + Math.random() * 40,
                  zIndex: 10 - i,
                }
              ]}
              animation="sway"
              iterationCount="infinite"
              duration={4000 + i * 500}
              resizeMode="contain"
            />
          ))}
          
          {/* Palm Trees on the islands */}
          <Animatable.Image
            source={{ uri: PALM_TREE_IMAGE }}
            style={styles.palmTreeImage}
            animation="sway"
            iterationCount="infinite"
            duration={5000}
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
  cloudsContainer: {
    position: 'absolute',
    width: '100%',
    height: '30%',
    top: 0,
  },
  cloudImage: {
    position: 'absolute',
  },
  boatContainer: {
    position: 'absolute',
    top: '28%',
    left: '15%',
  },
  boatImage: {
    width: 80,
    height: 60,
  },
  treesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  treeImage: {
    position: 'absolute',
  },
  palmTreeImage: {
    position: 'absolute',
    width: 50,
    height: 70,
    right: '30%',
    bottom: '40%',
  },
  contentContainer: {
    flex: 1,
    zIndex: 1,
  },
});

export default IslandBackground; 