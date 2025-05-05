import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width * 0.42;
const SPACING = 16;

const PlayLearnScreen = () => {
  const categories = [
    {
      id: '1',
      title: 'Alphabet Adventure',
      description: 'Trace, match, and say letters',
      icon: <FontAwesome5 name="font" size={34} color="#333" />,
      backgroundColor: COLORS.accent3,
      onPress: () => console.log('Alphabet Adventure pressed'),
      height: 180,
    },
    {
      id: '2',
      title: 'Animal Sounds Safari',
      description: 'Match animals to sounds',
      icon: <FontAwesome5 name="paw" size={34} color="#333" />,
      backgroundColor: COLORS.accent5,
      onPress: () => console.log('Animal Sounds Safari pressed'),
      height: 200,
    },
    {
      id: '3',
      title: 'Color Quest',
      description: 'Pick and name colors',
      icon: <Ionicons name="color-palette" size={34} color="#333" />,
      backgroundColor: COLORS.accent6,
      onPress: () => console.log('Color Quest pressed'),
      height: 220,
    },
    {
      id: '4',
      title: 'Sound It Out!',
      description: 'Hear and tap the correct sound',
      icon: <FontAwesome5 name="headphones" size={34} color="#333" />,
      backgroundColor: COLORS.accent2,
      onPress: () => console.log('Sound It Out! pressed'),
      height: 190,
    },
    {
      id: '5',
      title: 'Memory Mix',
      description: 'Flip cards, match shapes/sounds',
      icon: <MaterialCommunityIcons name="cards" size={34} color="#333" />,
      backgroundColor: COLORS.accent1,
      onPress: () => console.log('Memory Mix pressed'),
      height: 210,
    },
    {
      id: '6',
      title: 'Draw & Tell',
      description: 'Simple canvas to draw and speak',
      icon: <FontAwesome5 name="paint-brush" size={34} color="#333" />,
      backgroundColor: COLORS.tertiary,
      onPress: () => console.log('Draw & Tell pressed'),
      height: 170,
    }
  ];

  const backgroundPattern = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmMGYwZjAiPjwvcmVjdD4KPC9zdmc+';

  // Organize categories into two columns for staggered grid
  const leftColumn = categories.filter((_, index) => index % 2 === 0);
  const rightColumn = categories.filter((_, index) => index % 2 !== 0);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={{ uri: backgroundPattern }}
        style={styles.backgroundPattern}
      >
        <Animatable.View 
          animation="fadeIn" 
          duration={800} 
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.title}>Play & Learn</Text>
            <Text style={styles.subtitle}>Choose an activity to play and learn!</Text>
          </View>
          <Animatable.View 
            animation="bounceIn" 
            delay={500}
            style={styles.decoration}
          >
            <FontAwesome5 name="star" size={18} color={COLORS.accent1} style={styles.star} />
            <FontAwesome5 name="star" size={12} color={COLORS.accent6} style={[styles.star, {transform: [{rotate: '15deg'}]}]} />
            <FontAwesome5 name="star" size={10} color={COLORS.accent3} style={[styles.star, {transform: [{rotate: '-15deg'}]}]} />
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
                  <StaggeredCategoryCard category={category} />
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
                  <StaggeredCategoryCard category={category} />
                </Animatable.View>
              ))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

// Custom component for staggered cards
const StaggeredCategoryCard = ({ category }) => {
  return (
    <View style={[styles.staggeredCard, { height: category.height, backgroundColor: category.backgroundColor }]}>
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
    </View>
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
    flexDirection: 'row',
    position: 'relative',
    width: 50,
    height: 30,
    marginRight: 10,
  },
  star: {
    position: 'absolute',
  },
  title: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
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
  staggeredCard: {
    width: '100%',
    borderRadius: SIZES.cardRadius,
    padding: SIZES.spacing.m,
    ...SHADOWS.medium,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: SIZES.spacing.s,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
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
  }
});

export default PlayLearnScreen; 