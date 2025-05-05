import {
    FontAwesome5,
    MaterialCommunityIcons,
    MaterialIcons
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

const StoryWorldScreen = () => {
  const storyCategories = [
    {
      id: '1',
      title: 'African Folktales',
      description: 'Traditional stories from Africa',
      icon: <MaterialCommunityIcons name="elephant" size={34} color="#333" />,
      backgroundColor: COLORS.storyWorld.primary,
      onPress: () => console.log('African Folktales pressed'),
      height: 190,
    },
    {
      id: '2',
      title: 'Bedtime Stories',
      description: 'Soothing tales for sleepy time',
      icon: <FontAwesome5 name="moon" size={34} color="#333" />,
      backgroundColor: COLORS.storyWorld.secondary,
      onPress: () => console.log('Bedtime Stories pressed'),
      height: 210,
    },
    {
      id: '3',
      title: 'Animal Tales',
      description: 'Adventures with animal friends',
      icon: <MaterialCommunityIcons name="panda" size={34} color="#333" />,
      backgroundColor: COLORS.storyWorld.accent,
      onPress: () => console.log('Animal Tales pressed'),
      height: 180,
    },
    {
      id: '4',
      title: 'Interactive Stories',
      description: 'Stories where you choose what happens',
      icon: <MaterialIcons name="touch-app" size={34} color="#333" />,
      backgroundColor: COLORS.storyWorld.highlight,
      onPress: () => console.log('Interactive Stories pressed'),
      height: 200,
    },
    {
      id: '5',
      title: 'Picture Books',
      description: 'Colorful stories with pictures',
      icon: <MaterialIcons name="photo-library" size={34} color="#333" />,
      backgroundColor: COLORS.accent2,
      onPress: () => console.log('Picture Books pressed'),
      height: 170,
    },
    {
      id: '6',
      title: 'Create a Story',
      description: 'Make your own adventure!',
      icon: <MaterialIcons name="create" size={34} color="#333" />,
      backgroundColor: COLORS.accent3,
      onPress: () => console.log('Create a Story pressed'),
      height: 190,
    }
  ];

  // Background pattern for subtle texture
  const backgroundPattern = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmMGYwZjAiPjwvcmVjdD4KPC9zdmc+';

  // Organize categories into two columns for staggered grid
  const leftColumn = storyCategories.filter((_, index) => index % 2 === 0);
  const rightColumn = storyCategories.filter((_, index) => index % 2 !== 0);

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
            <Text style={styles.title}>Story World</Text>
            <Text style={styles.subtitle}>Magical tales for curious minds!</Text>
          </View>
          <Animatable.View 
            animation="bounceIn" 
            delay={500}
            style={styles.decoration}
          >
            <MaterialCommunityIcons name="book-open-page-variant" size={26} color={COLORS.storyWorld.primary} style={styles.decorationIcon} />
            <FontAwesome5 name="sparkles" size={18} color={COLORS.storyWorld.accent} style={[styles.star, {top: -5, right: 5}]} />
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
                  <StoryCard category={category} />
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
                  <StoryCard category={category} />
                </Animatable.View>
              ))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

// Custom component for story cards
const StoryCard = ({ category }) => {
  return (
    <Animatable.View 
      animation="pulse" 
      iterationCount={1}
      duration={1000}
      style={[styles.storyCard, { height: category.height, backgroundColor: category.backgroundColor }]}
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
    height: 30,
    marginRight: 10,
  },
  decorationIcon: {
    position: 'absolute',
    right: 0,
  },
  star: {
    position: 'absolute',
  },
  title: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.storyWorld.primary,
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
  storyCard: {
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
  }
});

export default StoryWorldScreen; 