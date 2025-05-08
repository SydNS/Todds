import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Button from '../../components/Button';
import { COLORS, SIZES } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { getTransparentOverlay, useRandomBackground } from '../../utils/backgroundUtils';

const { width, height } = Dimensions.get('window');

// Onboarding data with Freepik cartoon kids images
const onboardingData = [
  {
    id: '1',
    title: 'Welcome to Shekhinah Toddlers',
    description: 'A fun and engaging learning experience designed just for your little ones!',
    image: { uri: 'https://img.freepik.com/free-vector/happy-cute-kids-boy-girl-reading-book_97632-2117.jpg' },
  },
  {
    id: '2',
    title: 'Interactive Learning',
    description: 'Engaging activities that make learning fun and help develop essential skills.',
    image: { uri: 'https://img.freepik.com/free-vector/happy-diverse-children-playing-with-educational-toys_74855-6463.jpg' },
  },
  {
    id: '3',
    title: 'Track Progress',
    description: 'Monitor your child\'s progress and celebrate their achievements along the way.',
    image: { uri: 'https://img.freepik.com/free-vector/kids-online-lessons-illustration_52683-36137.jpg' },
  },
  {
    id: '4',
    title: 'Let\'s Get Started!',
    description: 'Create an account to personalize your child\'s learning experience.',
    image: { uri: 'https://img.freepik.com/free-vector/happy-diverse-students-celebrating-graduation-from-school_74855-5853.jpg' },
  },
];

const OnboardingScreen = () => {
  const { completeOnboarding } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const backgroundImage = useRandomBackground();

  // Handle skip
  const handleSkip = () => {
    completeOnboarding();
  };

  // Handle next
  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      completeOnboarding();
    }
  };

  // Render onboarding item
  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  // Render pagination dots
  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {onboardingData.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });

          const dotOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index.toString()}
              style={[
                styles.dot,
                { width: dotWidth, opacity: dotOpacity },
                index === currentIndex && styles.activeDot,
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={backgroundImage} 
        style={styles.backgroundImage}
      >
        <View style={[styles.overlay, getTransparentOverlay()]}>
          <TouchableOpacity 
            style={styles.skipButton} 
            onPress={handleSkip}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <FlatList
            ref={flatListRef}
            data={onboardingData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentIndex(index);
            }}
          />

          {renderPagination()}

          <View style={styles.footer}>
            <Button 
              title={currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"} 
              onPress={handleNext}
              style={styles.button}
            />
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
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 999,
  },
  skipText: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontWeight: '600',
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.xlarge,
  },
  imageContainer: {
    width: width * 0.8,
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.xlarge,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.medium,
  },
  description: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    textAlign: 'center',
    paddingHorizontal: SIZES.large,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SIZES.xlarge,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
  footer: {
    paddingHorizontal: SIZES.xlarge,
    paddingBottom: SIZES.xlarge,
    alignItems: 'center',
  },
  button: {
    width: '100%',
  },
});

export default OnboardingScreen; 