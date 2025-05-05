import {
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons
} from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width * 0.42;
const SPACING = 16;

const PhonicsFunScreen = () => {
  // Refs for floating letter animations
  const letterARef = useRef(null);
  const letterBRef = useRef(null);
  const letterCRef = useRef(null);

  // Custom floating animation for decorative letters
  useEffect(() => {
    const floatUpDown = {
      0: { transform: [{ translateY: 0 }] },
      0.5: { transform: [{ translateY: -10 }] },
      1: { transform: [{ translateY: 0 }] }
    };
    
    // Register the custom animation
    if (letterARef.current) {
      Animatable.initializeRegistryWithDefinitions({
        floatUpDown: floatUpDown
      });
      
      // Start animations with different delays
      letterARef.current.animate('floatUpDown', 2000, { iterationCount: 'infinite' });
      setTimeout(() => {
        if (letterBRef.current) letterBRef.current.animate('floatUpDown', 2500, { iterationCount: 'infinite' });
      }, 300);
      setTimeout(() => {
        if (letterCRef.current) letterCRef.current.animate('floatUpDown', 3000, { iterationCount: 'infinite' });
      }, 600);
    }
  }, []);

  const phonicsCategories = [
    {
      id: '1',
      title: 'Letter Sounds',
      description: 'Learn how each letter sounds',
      icon: <MaterialCommunityIcons name="alphabetical" size={34} color="#333" />,
      backgroundColor: COLORS.phonicsPlayground.primary,
      onPress: () => console.log('Letter Sounds pressed'),
      height: 185,
    },
    {
      id: '2',
      title: 'Rhyming Words',
      description: 'Match words that sound alike',
      icon: <FontAwesome5 name="smile-beam" size={34} color="#333" />,
      backgroundColor: COLORS.phonicsPlayground.secondary,
      onPress: () => console.log('Rhyming Words pressed'),
      height: 200,
    },
    {
      id: '3',
      title: 'Sound Blending',
      description: 'Put sounds together to make words',
      icon: <MaterialCommunityIcons name="puzzle" size={34} color="#333" />,
      backgroundColor: COLORS.phonicsPlayground.accent,
      onPress: () => console.log('Sound Blending pressed'),
      height: 190,
    },
    {
      id: '4',
      title: 'Word Families',
      description: 'Learn groups of similar words',
      icon: <Ionicons name="people" size={34} color="#333" />,
      backgroundColor: COLORS.phonicsPlayground.highlight,
      onPress: () => console.log('Word Families pressed'),
      height: 210,
    },
    {
      id: '5',
      title: 'Beginning Sounds',
      description: 'Match pictures to starting sounds',
      icon: <MaterialIcons name="graphic-eq" size={34} color="#333" />,
      backgroundColor: COLORS.accent6,
      onPress: () => console.log('Beginning Sounds pressed'),
      height: 180,
    },
    {
      id: '6',
      title: 'Word Builder',
      description: 'Create words with letter sounds',
      icon: <MaterialIcons name="build" size={34} color="#333" />,
      backgroundColor: COLORS.accent1,
      onPress: () => console.log('Word Builder pressed'),
      height: 195,
    }
  ];

  // Background pattern for subtle texture
  const backgroundPattern = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmMGYwZjAiPjwvcmVjdD4KPC9zdmc+';

  // Organize categories into two columns for staggered grid
  const leftColumn = phonicsCategories.filter((_, index) => index % 2 === 0);
  const rightColumn = phonicsCategories.filter((_, index) => index % 2 !== 0);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={{ uri: backgroundPattern }}
        style={styles.backgroundPattern}
      >
        {/* Decorative floating letters */}
        <Animatable.Text 
          ref={letterARef}
          style={[styles.floatingLetter, { top: 120, left: 20, color: COLORS.phonicsPlayground.primary }]}
        >
          A
        </Animatable.Text>
        <Animatable.Text 
          ref={letterBRef}
          style={[styles.floatingLetter, { top: 180, right: 30, color: COLORS.phonicsPlayground.secondary }]}
        >
          B
        </Animatable.Text>
        <Animatable.Text 
          ref={letterCRef}
          style={[styles.floatingLetter, { top: 240, left: 40, color: COLORS.phonicsPlayground.accent }]}
        >
          C
        </Animatable.Text>

        <Animatable.View 
          animation="fadeIn" 
          duration={800} 
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.title}>Phonics Fun</Text>
            <Text style={styles.subtitle}>Play with letter sounds!</Text>
          </View>
          <Animatable.View 
            animation="bounceIn" 
            delay={500}
            style={styles.decoration}
          >
            <MaterialCommunityIcons name="music-note" size={24} color={COLORS.phonicsPlayground.accent} style={[styles.decorationIcon, {transform: [{rotate: '-15deg'}]}]} />
            <MaterialCommunityIcons name="music-note" size={18} color={COLORS.phonicsPlayground.primary} style={[styles.decorationIcon, {top: -10, right: 10, transform: [{rotate: '10deg'}]}]} />
          </Animatable.View>
        </Animatable.View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.staggeredGrid}>
            {/* Left Column */}
            <View style={styles.column}>
              {leftColumn.map((category, index) => (
                <Animatable.View
                  key={category.id}
                  animation="fadeInUp"
                  delay={300 + (index * 100)}
                  duration={500}
                  style={styles.cardWrapper}
                >
                  <PhonicsCard category={category} />
                </Animatable.View>
              ))}
            </View>

            {/* Right Column */}
            <View style={styles.column}>
              {rightColumn.map((category, index) => (
                <Animatable.View
                  key={category.id}
                  animation="fadeInUp"
                  delay={400 + (index * 100)}
                  duration={500}
                  style={styles.cardWrapper}
                >
                  <PhonicsCard category={category} />
                </Animatable.View>
              ))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

// Custom component for phonics cards
const PhonicsCard = ({ category }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={category.onPress}
    >
      <Animatable.View 
        animation="pulse" 
        iterationCount={1}
        duration={1000}
        style={[styles.phonicsCard, { height: category.height, backgroundColor: category.backgroundColor }]}
      >
        <Animatable.View 
          animation="pulse" 
          iterationCount="infinite" 
          duration={2000}
          style={styles.iconContainer}
        >
          <View style={styles.iconCircle}>
            {category.icon}
          </View>
        </Animatable.View>
        
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{category.title}</Text>
          <Text style={styles.cardDescription}>{category.description}</Text>
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundPattern: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: SIZES.spacing.xl,
    paddingBottom: SIZES.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  decoration: {
    position: 'relative',
    width: 50,
    height: 40,
    marginRight: 10,
  },
  decorationIcon: {
    position: 'absolute',
    right: 0,
  },
  title: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.phonicsPlayground.primary,
    marginBottom: SIZES.spacing.xs,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100, // Extra padding at bottom to account for tab bar
    paddingHorizontal: SIZES.screenPadding,
  },
  staggeredGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: COLUMN_WIDTH,
  },
  cardWrapper: {
    marginBottom: SPACING,
  },
  phonicsCard: {
    width: '100%',
    borderRadius: SIZES.cardRadius,
    padding: SIZES.spacing.m,
    ...SHADOWS.medium,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: SIZES.spacing.s,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  textContainer: {
    alignItems: 'center',
    padding: 4,
  },
  cardTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: SIZES.small,
    color: '#555',
    textAlign: 'center',
  },
  floatingLetter: {
    position: 'absolute',
    fontSize: 36,
    fontWeight: 'bold',
    opacity: 0.2,
    zIndex: 0,
  }
});

export default PhonicsFunScreen; 