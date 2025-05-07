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
const SPACING = 10;

const BooksScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Book categories
  const categories = [
    { id: '1', name: 'All' },
    { id: '2', name: 'Fables' },
    { id: '3', name: 'Adventure' },
    { id: '4', name: 'Educational' },
    { id: '5', name: 'Short Stories' },
  ];
  
  // Book data
  const books = [
    {
      id: '1',
      title: 'Short Stories for Children',
      category: 'Short Stories',
      cover: 'https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg',
      description: 'A collection of short stories for young readers',
      pages: 42,
      favorite: true,
      url: 'https://storage.dtelab.com.ar/uploads/2023/02/short-stories-for-children-ingles-primaria-continuemos-estudiando.pdf',
    },
    {
      id: '2',
      title: 'The Three Little Pigs',
      category: 'Fables',
      cover: 'https://img.freepik.com/free-vector/three-little-pigs-tale-illustration_23-2148629236.jpg',
      description: 'The classic tale of the three little pigs',
      pages: 12,
      favorite: false,
      url: 'https://storage.dtelab.com.ar/uploads/2023/02/short-stories-for-children-ingles-primaria-continuemos-estudiando.pdf',
    },
    {
      id: '3',
      title: 'Jack and the Beanstalk',
      category: 'Adventure',
      cover: 'https://img.freepik.com/free-vector/jack-beanstalk-concept-illustration_114360-8960.jpg',
      description: 'Follow Jack on his magical adventure up the beanstalk',
      pages: 15,
      favorite: true,
      url: 'https://storage.dtelab.com.ar/uploads/2023/02/short-stories-for-children-ingles-primaria-continuemos-estudiando.pdf',
    },
    {
      id: '4',
      title: 'Little Red Riding Hood',
      category: 'Fables',
      cover: 'https://img.freepik.com/free-vector/little-red-riding-hood-fairytale-scene_23-2148629233.jpg',
      description: 'The story of Little Red Riding Hood and the wolf',
      pages: 10,
      favorite: false,
      url: 'https://storage.dtelab.com.ar/uploads/2023/02/short-stories-for-children-ingles-primaria-continuemos-estudiando.pdf',
    },
    {
      id: '5',
      title: 'Learn Your ABCs',
      category: 'Educational',
      cover: 'https://img.freepik.com/free-vector/abc-cubes-collection_23-2147501346.jpg',
      description: 'A fun way to learn the alphabet with pictures',
      pages: 26,
      favorite: true,
      url: 'https://storage.dtelab.com.ar/uploads/2023/02/short-stories-for-children-ingles-primaria-continuemos-estudiando.pdf',
    },
  ];
  
  // Filter books based on selected category
  const filteredBooks = selectedCategory === 'All' 
    ? books 
    : books.filter(book => book.category === selectedCategory);
  
  const handleCategoryPress = (category) => {
    setSelectedCategory(category.name);
  };
  
  const handleBookPress = (book) => {
    // Navigate to book reader screen with the book URL
    navigation.navigate('BookReader', { book });
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
        <Text style={styles.headerTitle}>Children's Books</Text>
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
            <Text style={styles.welcomeTitle}>Book Time!</Text>
            <Text style={styles.welcomeSubtitle}>Choose a book to read along</Text>
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
        
        {/* Books Grid */}
        <View style={styles.booksContainer}>
          <Text style={styles.sectionTitle}>{selectedCategory} Books</Text>
          <Animatable.View animation="fadeInUp" duration={800}>
            <FlatList
              data={filteredBooks}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.booksListContent}
              renderItem={({ item, index }) => (
                <Animatable.View 
                  animation="fadeInRight"
                  duration={800}
                  delay={index * 100}
                >
                  <TouchableOpacity 
                    style={styles.bookCard}
                    onPress={() => handleBookPress(item)}
                  >
                    <Image 
                      source={{ uri: item.cover }} 
                      style={styles.bookCover}
                      resizeMode="cover"
                    />
                    {item.favorite && (
                      <View style={styles.favoriteTag}>
                        <FontAwesome5 name="star" size={12} color="#FFF" />
                      </View>
                    )}
                    <View style={styles.bookInfo}>
                      <Text style={styles.bookTitle} numberOfLines={1}>{item.title}</Text>
                      <View style={styles.bookMetaContainer}>
                        <Text style={styles.bookCategory}>{item.category}</Text>
                        <View style={styles.bookDetailsBadge}>
                          <Text style={styles.bookDetails}>{item.pages} pages</Text>
                        </View>
                      </View>
                      <View style={styles.readButtonContainer}>
                        <TouchableOpacity 
                          style={styles.readButton}
                          onPress={() => handleBookPress(item)}
                        >
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
        
        {/* Featured Book */}
        <View style={styles.featuredContainer}>
          <Text style={styles.sectionTitle}>Featured Book</Text>
          <Animatable.View 
            animation="fadeInUp" 
            duration={800}
            style={styles.featuredCard}
          >
            <Image 
              source={{ uri: 'https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg' }}
              style={styles.featuredImage}
              resizeMode="cover"
            />
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>Short Stories for Children</Text>
              <Text style={styles.featuredDescription}>
                A collection of engaging short stories perfect for young readers to enjoy and learn from.
              </Text>
              <TouchableOpacity 
                style={styles.startReadingButton}
                onPress={() => handleBookPress(books[0])}
              >
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
  booksContainer: {
    marginBottom: SIZES.xlarge,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.medium,
    paddingHorizontal: SIZES.screenPadding,
  },
  booksListContent: {
    paddingHorizontal: SIZES.screenPadding,
    paddingBottom: SIZES.medium,
  },
  bookCard: {
    width: CARD_WIDTH,
    marginRight: SPACING,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    ...SHADOWS.medium,
    overflow: 'hidden',
  },
  bookCover: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: SIZES.cardRadius,
    borderTopRightRadius: SIZES.cardRadius,
  },
  favoriteTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 183, 77, 0.9)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookInfo: {
    padding: SIZES.medium,
  },
  bookTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  bookMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookCategory: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
  },
  bookDetailsBadge: {
    backgroundColor: COLORS.lightGrey,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bookDetails: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  readButtonContainer: {
    alignItems: 'flex-start',
  },
  readButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.storyWorld.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
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
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    ...SHADOWS.medium,
    overflow: 'hidden',
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

export default BooksScreen; 