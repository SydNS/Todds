import { FontAwesome5 } from '@expo/vector-icons';
import React, { useContext, useRef, useState } from 'react';
import {
    Animated,
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import ChallengeContext from '../../context/ChallengeContext';

// Background animation component
const AnimatedBackground = () => {
  // Multiple animated values for different elements
  const translateY1 = useRef(new Animated.Value(0)).current;
  const translateY2 = useRef(new Animated.Value(0)).current;
  const translateX1 = useRef(new Animated.Value(0)).current;
  const translateX2 = useRef(new Animated.Value(0)).current;

  // Start animations
  React.useEffect(() => {
    // Animation sequence for vertical movement of first element
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY1, {
          toValue: 15,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY1, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY1, {
          toValue: -15,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY1, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animation sequence for horizontal movement of second element
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX1, {
          toValue: 10,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(translateX1, {
          toValue: -10,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Different timing pattern for third element
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY2, {
          toValue: -20,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY2, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Different timing pattern for fourth element
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX2, {
          toValue: -15,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(translateX2, {
          toValue: 15,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateY1, translateY2, translateX1, translateX2]);

  return (
    <View style={styles.backgroundContainer}>
      <Animated.View
        style={[
          styles.backgroundElement,
          {
            transform: [{ translateY: translateY1 }],
            backgroundColor: COLORS.accent1 + '40', // With opacity
            top: '15%',
            left: '10%',
            width: 150,
            height: 150,
            borderRadius: 75,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.backgroundElement,
          {
            transform: [{ translateX: translateX1 }],
            backgroundColor: COLORS.accent2 + '30', // With opacity
            top: '40%',
            right: '5%',
            width: 120,
            height: 120,
            borderRadius: 60,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.backgroundElement,
          {
            transform: [{ translateY: translateY2 }],
            backgroundColor: COLORS.accent3 + '35', // With opacity
            bottom: '25%',
            left: '15%',
            width: 100,
            height: 100,
            borderRadius: 50,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.backgroundElement,
          {
            transform: [{ translateX: translateX2 }],
            backgroundColor: COLORS.primary + '25', // With opacity
            bottom: '10%',
            right: '15%',
            width: 130,
            height: 130,
            borderRadius: 65,
          },
        ]}
      />
    </View>
  );
};

// Challenge difficulty badge
const DifficultBadge = ({ difficulty }) => {
  let color = COLORS.accent1; // Default (Easy)
  
  if (difficulty === 'Medium') {
    color = COLORS.accent2;
  } else if (difficulty === 'Hard') {
    color = COLORS.accent4;
  }
  
  return (
    <View style={[styles.difficultyBadge, { backgroundColor: color + '30' }]}>
      <Text style={[styles.difficultyText, { color }]}>{difficulty}</Text>
    </View>
  );
};

// Challenge card component
const ChallengeCard = ({ challenge, onPress, index }) => {
  // Calculate animation delay based on index
  const animationDelay = index * 100;
  
  // Get a color based on the category
  const getCategoryColor = (category) => {
    const categoryColors = {
      'Alphabet': COLORS.primary,
      'Numbers': COLORS.accent1,
      'Colors': COLORS.accent4,
      'Shapes': COLORS.accent2,
      'Animals': COLORS.accent3,
      'Phonics': COLORS.accent5,
      'Concepts': COLORS.accent6,
      'Body': COLORS.gameZone.primary,
      'Emotions': COLORS.storyWorld.primary,
      'Weather': COLORS.onboarding.primary,
    };
    
    return categoryColors[category] || COLORS.primary;
  };
  
  const categoryColor = getCategoryColor(challenge.category);
  
  return (
    <Animatable.View
      animation="fadeInUp"
      duration={600}
      delay={animationDelay}
      style={styles.cardContainer}
    >
      <TouchableOpacity
        style={[styles.challengeCard, { borderLeftColor: categoryColor }]}
        onPress={() => onPress(challenge)}
        activeOpacity={0.7}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{challenge.title}</Text>
            <DifficultBadge difficulty={challenge.difficulty} />
          </View>
          
          <Text style={styles.cardDescription}>{challenge.description}</Text>
          
          <View style={styles.cardFooter}>
            <View style={[styles.categoryBadge, { backgroundColor: categoryColor + '20' }]}>
              <Text style={[styles.categoryText, { color: categoryColor }]}>
                {challenge.category}
              </Text>
            </View>
            
            {challenge.completed ? (
              <View style={styles.completedBadge}>
                <FontAwesome5 name="check-circle" size={14} color={COLORS.success} />
                <Text style={styles.completedText}>Completed</Text>
              </View>
            ) : (
              <Animatable.View
                animation="pulse"
                iterationCount="infinite"
                duration={2000}
                style={styles.playButton}
              >
                <FontAwesome5 name="play" size={10} color="#FFF" />
              </Animatable.View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const ChallengesScreen = ({ navigation }) => {
  const { getChallengesWithStatus } = useContext(ChallengeContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Get challenges with status
  const challenges = getChallengesWithStatus();
  
  // Extract unique categories
  const categories = ['All', ...new Set(challenges.map(c => c.category))];
  
  // Filter challenges by selected category
  const filteredChallenges = selectedCategory === 'All'
    ? challenges
    : challenges.filter(c => c.category === selectedCategory);
  
  // Handle challenge selection
  const handleChallengePress = (challenge) => {
    navigation.navigate('ChallengeDetail', { challengeId: challenge.id });
  };
  
  // Handler for back button
  const handleBack = () => {
    navigation.goBack();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Animated background */}
      <AnimatedBackground />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FontAwesome5 name="arrow-left" size={18} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Challenges</Text>
        <Animatable.View 
          animation="pulse" 
          iterationCount="infinite" 
          duration={2000}
          style={styles.starContainer}
        >
          <FontAwesome5 name="trophy" size={18} color={COLORS.accent1} />
        </Animatable.View>
      </View>
      
      {/* Category Filters */}
      <Animatable.View 
        animation="fadeInDown"
        duration={800}
        style={styles.categoriesContainer}
      >
        <ScrollHorizonal>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollHorizonal>
      </Animatable.View>
      
      {/* Challenge List */}
      <FlatList
        data={filteredChallenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ChallengeCard
            challenge={item}
            onPress={handleChallengePress}
            index={index}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

// Helper component for horizontal scrolling
const ScrollHorizonal = ({ children }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: SIZES.screenPadding }}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  backgroundElement: {
    position: 'absolute',
    zIndex: -1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: SIZES.spacing.l,
    paddingBottom: SIZES.spacing.m,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  headerTitle: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  starContainer: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 213, 79, 0.2)',
  },
  categoriesContainer: {
    marginVertical: SIZES.spacing.m,
  },
  categoryButton: {
    paddingHorizontal: SIZES.spacing.l,
    paddingVertical: SIZES.spacing.s,
    marginRight: SIZES.spacing.m,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    ...SHADOWS.small,
  },
  selectedCategory: {
    backgroundColor: COLORS.primary,
  },
  categoryButtonText: {
    fontSize: SIZES.font,
    color: COLORS.text,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: COLORS.card,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: SIZES.screenPadding,
    paddingBottom: SIZES.spacing.xl,
  },
  cardContainer: {
    marginBottom: SIZES.spacing.m,
  },
  challengeCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    ...SHADOWS.medium,
    borderLeftWidth: 6,
    overflow: 'hidden',
  },
  cardContent: {
    padding: SIZES.spacing.m,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.spacing.xs,
  },
  cardTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: SIZES.spacing.s,
    paddingVertical: 3,
    borderRadius: 12,
    marginLeft: SIZES.spacing.xs,
  },
  difficultyText: {
    fontSize: SIZES.small,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
    marginBottom: SIZES.spacing.m,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: SIZES.spacing.s,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: SIZES.small,
    fontWeight: '500',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    marginLeft: 4,
    fontSize: SIZES.small,
    color: COLORS.success,
    fontWeight: '500',
  },
  playButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.accent1,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
});

export default ChallengesScreen; 