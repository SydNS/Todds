import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
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

const StoryDetailsScreen = ({ route, navigation }) => {
  const { story } = route.params;

  const handleStartReading = () => {
    // Navigate to ReadStory screen with the story data
    navigation.navigate('ReadStory', { storyId: story.id, storyTitle: story.title });
    
    // In a real app, you would likely load the story content from a backend or local storage
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={18} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Story Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animatable.View animation="fadeIn" duration={600}>
          <View style={styles.coverContainer}>
            <Image source={{ uri: story.cover }} style={styles.cover} resizeMode="cover" />
            {story.favorite && (
              <View style={styles.favoriteTag}>
                <FontAwesome5 name="star" size={16} color="#FFF" />
              </View>
            )}
          </View>
          
          <Text style={styles.title}>{story.title}</Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <FontAwesome5 name="bookmark" size={16} color={COLORS.accent} style={styles.infoIcon} />
              <Text style={styles.infoText}>{story.category}</Text>
            </View>
            <View style={styles.infoItem}>
              <FontAwesome5 name="signal" size={16} color={COLORS.accent} style={styles.infoIcon} />
              <Text style={styles.infoText}>{story.difficulty}</Text>
            </View>
            <View style={styles.infoItem}>
              <FontAwesome5 name="book-open" size={16} color={COLORS.accent} style={styles.infoIcon} />
              <Text style={styles.infoText}>{story.pages} pages</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.startReadingButton} onPress={handleStartReading}>
            <Text style={styles.startReadingText}>Start Reading</Text>
          </TouchableOpacity>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>About this story</Text>
            <Text style={styles.descriptionText}>
              {story.description || "Join us on an exciting adventure with this captivating story. Perfect for young readers to enjoy and learn."}
            </Text>
          </View>
        </Animatable.View>
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
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: SIZES.spacing.xl,
    paddingBottom: SIZES.spacing.m,
    backgroundColor: COLORS.background,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
    textAlign: 'center',
  },
  content: {
    padding: SIZES.screenPadding,
  },
  coverContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  cover: {
    width: width - (SIZES.screenPadding * 2),
    height: (width - (SIZES.screenPadding * 2)) * 0.75,
    borderRadius: 16,
    ...SHADOWS.medium,
  },
  favoriteTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: COLORS.accent2,
    borderRadius: 12,
    padding: 6,
    zIndex: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 15,
    color: COLORS.text,
  },
  startReadingButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  startReadingText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  descriptionContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    ...SHADOWS.small,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.text,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textLight,
  },
});

export default StoryDetailsScreen; 