import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
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
import { storyContentMap } from './StoryContent';

const { width } = Dimensions.get('window');

const ReadStoryScreen = ({ route, navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { storyId, storyTitle } = route.params || {};
  const [storyContent, setStoryContent] = useState(null);
  
  useEffect(() => {
    // Get the story content based on the storyId
    if (storyId && storyContentMap[storyId]) {
      setStoryContent(storyContentMap[storyId]);
    } else {
      // Fallback to the first story if the storyId doesn't exist
      setStoryContent(storyContentMap['1']);
    }
  }, [storyId]);
  
  const handleNextPage = () => {
    if (currentPage < storyContent?.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  if (!storyContent) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading story...</Text>
      </SafeAreaView>
    );
  }
  
  const currentPageContent = storyContent.pages[currentPage];

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
        <Text style={styles.headerTitle}>{storyContent.title}</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <View style={styles.storyContainer}>
        {/* Story Image */}
        <Animatable.View 
          animation="fadeIn" 
          duration={500}
          key={`image-${currentPage}`}
          style={styles.imageContainer}
        >
          <Image 
            source={{ uri: currentPageContent.image }} 
            style={styles.storyImage}
            resizeMode="contain"
          />
        </Animatable.View>
        
        {/* Story Text */}
        <Animatable.View 
          animation="fadeIn" 
          duration={500}
          key={`text-${currentPage}`}
          style={styles.textContainer}
        >
          <ScrollView>
            <Text style={styles.storyText}>{currentPageContent.text}</Text>
          </ScrollView>
        </Animatable.View>
        
        {/* Navigation Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity 
            style={[styles.navButton, currentPage === 0 && styles.disabledButton]}
            onPress={handlePreviousPage}
            disabled={currentPage === 0}
          >
            <FontAwesome5 name="chevron-left" size={16} color={currentPage === 0 ? "#ccc" : COLORS.text} />
            <Text style={[styles.navButtonText, currentPage === 0 && styles.disabledText]}>Previous</Text>
          </TouchableOpacity>
          
          <Text style={styles.pageIndicator}>
            Page {currentPage + 1} of {storyContent.pages.length}
          </Text>
          
          <TouchableOpacity 
            style={[styles.navButton, currentPage === storyContent.pages.length - 1 && styles.disabledButton]}
            onPress={handleNextPage}
            disabled={currentPage === storyContent.pages.length - 1}
          >
            <Text style={[styles.navButtonText, currentPage === storyContent.pages.length - 1 && styles.disabledText]}>Next</Text>
            <FontAwesome5 name="chevron-right" size={16} color={currentPage === storyContent.pages.length - 1 ? "#ccc" : COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  storyContainer: {
    flex: 1,
    padding: SIZES.medium,
  },
  imageContainer: {
    height: width * 0.7,
    marginBottom: SIZES.medium,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    ...SHADOWS.medium,
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
    ...SHADOWS.small,
  },
  storyText: {
    fontSize: 18,
    lineHeight: 28,
    color: COLORS.text,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    ...SHADOWS.small,
  },
  navButtonText: {
    marginHorizontal: 8,
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
  },
  pageIndicator: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  disabledButton: {
    backgroundColor: '#f5f5f5',
  },
  disabledText: {
    color: '#ccc',
  },
});

export default ReadStoryScreen; 