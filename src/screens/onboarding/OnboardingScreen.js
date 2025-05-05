import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Dimensions, 
  TouchableOpacity,
  Image,
  Animated
} from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';

const { width, height } = Dimensions.get('window');

// Placeholder image as data URI
const PLACEHOLDER_IMAGE = { 
  uri: 'data:image/png;base64,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'
};

// Onboarding data
const onboardingData = [
  {
    id: '1',
    title: 'Welcome to Shekhinah Toddlers',
    description: 'A fun and engaging learning experience designed just for your little ones!',
    image: PLACEHOLDER_IMAGE, 
  },
  {
    id: '2',
    title: 'Interactive Learning',
    description: 'Engaging activities that make learning fun and help develop essential skills.',
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: '3',
    title: 'Track Progress',
    description: 'Monitor your child\'s progress and celebrate their achievements along the way.',
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: '4',
    title: 'Let\'s Get Started!',
    description: 'Create an account to personalize your child\'s learning experience.',
    image: PLACEHOLDER_IMAGE,
  },
];

const OnboardingScreen = () => {
  const { completeOnboarding } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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