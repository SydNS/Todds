import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import { getTransparentOverlay, useRandomBackground } from '../../utils/backgroundUtils';

const DiscoverScreen = ({ navigation }) => {
  const backgroundImage = useRandomBackground();

  // Updated discoverCategories with tiles from HomeScreen "Explore & Play" section
  const discoverCategories = [
    {
      id: '1',
      title: 'Read a Story',
      icon: <FontAwesome5 name="book-open" size={24} color="#FFF" />,
      backgroundColor: COLORS.storyWorld.primary,
      screen: 'ReadStory',
    },
    {
      id: '2',
      title: 'Learn Phonics',
      icon: <FontAwesome5 name="font" size={24} color="#FFF" />,
      backgroundColor: COLORS.phonicsPlayground.primary,
      screen: 'LearnPhonics',
    },
    {
      id: '3',
      title: 'Sing with Us',
      icon: <FontAwesome5 name="music" size={24} color="#FFF" />,
      backgroundColor: COLORS.rhymeRhythm.primary,
      screen: 'SingWithUs',
    },
    {
      id: '4',
      title: 'Puzzles & Games',
      icon: <FontAwesome5 name="puzzle-piece" size={24} color="#FFF" />,
      backgroundColor: COLORS.gameZone.primary,
      screen: 'PuzzlesGames',
    },
    {
      id: '5',
      title: 'This Week\'s Favorites',
      icon: <FontAwesome5 name="star" size={24} color="#FFF" />,
      backgroundColor: COLORS.accent1,
      screen: 'WeeklyFavorites',
    },
  ];

  // Handle category press
  const handleCategoryPress = (category) => {
    navigation.navigate(category.screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ImageBackground 
        source={backgroundImage}
        style={styles.backgroundImage}
      >
        <View style={[styles.overlay, getTransparentOverlay()]}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Discover</Text>
              <Text style={styles.headerSubtitle}>Explore new content</Text>
            </View>

            {/* Search Bar */}
            <TouchableOpacity style={styles.searchBar}>
              <FontAwesome5 name="search" size={18} color={COLORS.textLight} style={styles.searchIcon} />
              <Text style={styles.searchPlaceholder}>Search for fun activities...</Text>
            </TouchableOpacity>

            {/* Categories - Using the style from HomeScreen's QuickAccessItem */}
            <View style={styles.categoriesContainer}>
              {discoverCategories.map((category) => (
                <TouchableOpacity 
                  key={category.id}
                  style={[styles.categoryCard, { backgroundColor: category.backgroundColor }]}
                  onPress={() => handleCategoryPress(category)}
                >
                  <View style={styles.categoryContent}>
                    <View style={styles.categoryIconContainer}>
                      {category.icon}
                    </View>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Featured Content */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Featured</Text>
              <View style={styles.featuredCard}>
                <Image 
                  source={{ uri: 'https://placehold.co/600x400/FFD54F/FFF?text=Featured+Content' }}
                  style={styles.featuredImage}
                  resizeMode="cover"
                />
                <View style={styles.featuredContent}>
                  <Text style={styles.featuredTitle}>African Animal Adventure</Text>
                  <Text style={styles.featuredDescription}>Join Kojo on a safari through Africa!</Text>
                  <TouchableOpacity style={styles.playButton}>
                    <FontAwesome5 name="play" size={12} color="#FFF" />
                    <Text style={styles.playButtonText}>Play Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Coming Soon */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Coming Soon</Text>
              <View style={styles.comingSoonContainer}>
                <TouchableOpacity style={styles.comingSoonCard}>
                  <View style={styles.comingSoonBadge}>
                    <Text style={styles.comingSoonBadgeText}>New</Text>
                  </View>
                  <View style={[styles.comingSoonIconContainer, { backgroundColor: COLORS.accent6 }]}>
                    <FontAwesome5 name="paint-brush" size={24} color="#FFF" />
                  </View>
                  <Text style={styles.comingSoonTitle}>Coloring Book</Text>
                  <Text style={styles.comingSoonDate}>Next Week</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.comingSoonCard}>
                  <View style={styles.comingSoonBadge}>
                    <Text style={styles.comingSoonBadgeText}>New</Text>
                  </View>
                  <View style={[styles.comingSoonIconContainer, { backgroundColor: COLORS.accent3 }]}>
                    <FontAwesome5 name="shapes" size={24} color="#FFF" />
                  </View>
                  <Text style={styles.comingSoonTitle}>Shape Matching</Text>
                  <Text style={styles.comingSoonDate}>Coming Soon</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
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
  scrollContainer: {
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: SIZES.large,
    paddingBottom: SIZES.xlarge * 2,
  },
  header: {
    marginBottom: SIZES.large,
  },
  headerTitle: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    marginTop: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: SIZES.borderRadius,
    padding: SIZES.medium,
    marginBottom: SIZES.xlarge,
    ...SHADOWS.small,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    color: COLORS.textLight,
    fontSize: SIZES.font,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SIZES.xlarge,
  },
  categoryCard: {
    width: '48%',
    borderRadius: SIZES.borderRadius,
    overflow: 'hidden',
    marginBottom: 12,
    ...SHADOWS.medium,
  },
  categoryContent: {
    padding: SIZES.medium,
    alignItems: 'center',
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryTitle: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: SIZES.medium,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: SIZES.xlarge,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.medium,
  },
  featuredCard: {
    borderRadius: SIZES.cardRadius,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  featuredImage: {
    width: '100%',
    height: 150,
  },
  featuredContent: {
    padding: SIZES.medium,
  },
  featuredTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  featuredDescription: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
    marginBottom: SIZES.medium,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 6,
  },
  comingSoonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comingSoonCard: {
    width: '48%',
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.background,
    padding: SIZES.medium,
    alignItems: 'center',
    position: 'relative',
    ...SHADOWS.small,
  },
  comingSoonBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.accent5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  comingSoonBadgeText: {
    color: '#FFF',
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
  comingSoonIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.medium,
  },
  comingSoonTitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  comingSoonDate: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
});

export default DiscoverScreen; 