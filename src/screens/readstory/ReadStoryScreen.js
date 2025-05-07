import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;

const ReadStoryScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Story categories
  const categories = [
    { id: '1', name: 'All' },
    { id: '2', name: 'Animals' },
    { id: '3', name: 'Adventure' },
    { id: '4', name: 'Bedtime' },
    { id: '5', name: 'Educational' },
  ];
  
  // Story data with real educational content images
  const stories = [
    {
      id: '1',
      title: 'The Lion Cub',
      category: 'Animals',
      cover: 'https://img.freepik.com/free-vector/cute-lion-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3783.jpg',
      difficulty: 'Beginner',
      pages: 10,
      favorite: true,
    },
    {
      id: '2',
      title: 'Monkey See Monkey Do',
      category: 'Animals',
      cover: 'https://img.freepik.com/free-vector/cute-monkey-hanging-branch-cartoon-vector-icon-illustration_138676-2743.jpg',
      difficulty: 'Beginner',
      pages: 8,
      favorite: false,
    },
    {
      id: '3',
      title: 'The Magic Forest',
      category: 'Adventure',
      cover: 'https://img.freepik.com/free-vector/forest-scene-with-various-forest-trees_1308-58237.jpg',
      difficulty: 'Intermediate',
      pages: 12,
      favorite: true,
    },
    {
      id: '4',
      title: 'Sleepy Sheep',
      category: 'Bedtime',
      cover: 'https://img.freepik.com/free-vector/cute-sheep-sleeping-cloud-cartoon-vector-icon-illustration_138676-5385.jpg',
      difficulty: 'Beginner',
      pages: 6,
      favorite: false,
    },
    {
      id: '5',
      title: 'Count with Elephants',
      category: 'Educational',
      cover: 'https://img.freepik.com/free-vector/cute-elephant-playing-water-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4244.jpg',
      difficulty: 'Beginner',
      pages: 8,
      favorite: true,
    },
  ];
  
  // Filter stories based on selected category
  const filteredStories = selectedCategory === 'All' 
    ? stories 
    : stories.filter(story => story.category === selectedCategory);
  
  const handleCategoryPress = (category) => {
    setSelectedCategory(category.name);
  };
  
  const handleStoryPress = (story) => {
    // Navigate to story details screen (to be implemented)
    console.log('Open story:', story.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={18} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Read a Story</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Animated Welcome Banner */}
        <Animatable.View 
          animation="fadeIn" 
          duration={800}
          style={styles.welcomeBanner}
        >
          <View>
            <Text style={styles.welcomeTitle}>Story Time!</Text>
            <Text style={styles.welcomeSubtitle}>Pick a story to read along</Text>
          </View>
          <Animatable.View 
            animation="pulse" 
            iterationCount="infinite" 
            duration={2000}
          >
            <FontAwesome5 name="book-reader" size={40} color={COLORS.storyWorld.primary} />
          </Animatable.View>
        </Animatable.View>
        
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesList}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={[
                  styles.categoryPill,
                  selectedCategory === item.name && styles.selectedCategoryPill
                ]}
                onPress={() => handleCategoryPress(item)}
              >
                <Text 
                  style={[
                    styles.categoryText,
                    selectedCategory === item.name && styles.selectedCategoryText
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        
        {/* Stories Carousel */}
        <View style={styles.storiesContainer}>
          <Text style={styles.sectionTitle}>{selectedCategory} Stories</Text>
          <Animatable.View animation="fadeInUp" duration={800}>
            <FlatList
              data={filteredStories}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesListContent}
              renderItem={({ item, index }) => (
                <Animatable.View 
                  animation="fadeInRight"
                  duration={800}
                  delay={index * 100}
                >
                  <TouchableOpacity 
                    style={styles.storyCard}
                    onPress={() => handleStoryPress(item)}
                  >
                    <Image 
                      source={{ uri: item.cover }} 
                      style={styles.storyCover}
                      resizeMode="cover"
                    />
                    {item.favorite && (
                      <View style={styles.favoriteTag}>
                        <FontAwesome5 name="star" size={12} color="#FFF" />
                      </View>
                    )}
                    <View style={styles.storyInfo}>
                      <Text style={styles.storyTitle} numberOfLines={1}>{item.title}</Text>
                      <View style={styles.storyMetaContainer}>
                        <Text style={styles.storyCategory}>{item.category}</Text>
                        <View style={styles.storyDetailsBadge}>
                          <Text style={styles.storyDetails}>{item.pages} pages</Text>
                        </View>
                      </View>
                      <View style={styles.readButtonContainer}>
                        <TouchableOpacity style={styles.readButton}>
                          <Text style={styles.readButtonText}>Read</Text>
                          <FontAwesome5 name="book-open" size={12} color="#FFF" style={styles.readButtonIcon} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Animatable.View>
              )}
            />
          </Animatable.View>
        </View>
        
        {/* Featured Story */}
        <View style={styles.featuredContainer}>
          <Text style={styles.sectionTitle}>Featured Story</Text>
          <Animatable.View 
            animation="fadeInUp" 
            duration={800}
            style={styles.featuredCard}
          >
            <Image 
              source={{ uri: 'https://placehold.co/600x400/4FC3F7/FFF?text=Featured+Story' }}
              style={styles.featuredImage}
              resizeMode="cover"
            />
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>The Adventures of Kojo</Text>
              <Text style={styles.featuredDescription}>
                Follow Kojo as he explores Africa and learns about different animals and cultures!
              </Text>
              <TouchableOpacity style={styles.startReadingButton}>
                <Text style={styles.startReadingText}>Start Reading</Text>
                <FontAwesome5 name="arrow-right" size={12} color="#FFF" style={styles.buttonIcon} />
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: SIZES.medium,
    paddingBottom: SIZES.small,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  scrollContainer: {
    paddingBottom: SIZES.xlarge * 2,
  },
  welcomeBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 183, 77, 0.2)',
    borderRadius: SIZES.cardRadius,
    padding: SIZES.medium,
    marginHorizontal: SIZES.screenPadding,
    marginBottom: SIZES.large,
  },
  welcomeTitle: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
  },
  categoriesContainer: {
    marginBottom: SIZES.large,
  },
  categoriesList: {
    paddingHorizontal: SIZES.screenPadding,
  },
  categoryPill: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedCategoryPill: {
    backgroundColor: COLORS.storyWorld.primary,
  },
  categoryText: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  storiesContainer: {
    marginBottom: SIZES.xlarge,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.medium,
    paddingHorizontal: SIZES.screenPadding,
  },
  storiesListContent: {
    paddingLeft: SIZES.screenPadding,
    paddingRight: SIZES.screenPadding / 2,
  },
  storyCard: {
    width: CARD_WIDTH,
    borderRadius: SIZES.cardRadius,
    backgroundColor: COLORS.background,
    marginRight: SIZES.medium,
    ...SHADOWS.medium,
    overflow: 'hidden',
  },
  storyCover: {
    width: '100%',
    height: CARD_WIDTH * 1.2,
    borderTopLeftRadius: SIZES.cardRadius,
    borderTopRightRadius: SIZES.cardRadius,
  },
  favoriteTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 213, 79, 0.9)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  storyInfo: {
    padding: SIZES.medium,
  },
  storyTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 6,
  },
  storyMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  storyCategory: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  storyDetailsBadge: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  storyDetails: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  readButtonContainer: {
    alignItems: 'center',
  },
  readButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.storyWorld.primary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  readButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginRight: 6,
  },
  readButtonIcon: {
    marginLeft: 4,
  },
  featuredContainer: {
    marginBottom: SIZES.xlarge,
  },
  featuredCard: {
    marginHorizontal: SIZES.screenPadding,
    borderRadius: SIZES.cardRadius,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  featuredImage: {
    width: '100%',
    height: 180,
  },
  featuredContent: {
    padding: SIZES.medium,
  },
  featuredTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
    marginBottom: SIZES.medium,
  },
  startReadingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.storyWorld.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  startReadingText: {
    color: '#FFF',
    fontWeight: '600',
    marginRight: 6,
  },
  buttonIcon: {
    marginLeft: 4,
  },
});

export default ReadStoryScreen; 