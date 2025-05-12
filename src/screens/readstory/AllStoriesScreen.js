import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - SIZES.screenPadding * 2 - 24) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

// Dummy story data (should be shared or imported from a central file in a real app)
const stories = [
  {
    id: '1',
    title: 'The Lion Cub',
    category: 'Animals',
    cover: 'https://img.freepik.com/free-vector/cute-lion-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3783.jpg',
    difficulty: 'Beginner',
    pages: 10,
    favorite: true,
    description: "A tale of an unlikely friendship between a mighty lion and a tiny mouse. When the playful mouse disturbs the lion's nap, he's caught but begs for mercy. The lion, amused, lets him go. Later, when the lion is trapped in a hunter's net, it's the little mouse who comes to his rescue, proving that even the smallest friend can be a great ally. This classic fable teaches children about kindness, friendship, and how help can come from unexpected places."
  },
  {
    id: '2',
    title: 'Monkey See Monkey Do',
    category: 'Animals',
    cover: 'https://img.freepik.com/free-vector/cute-monkey-hanging-branch-cartoon-vector-icon-illustration_138676-2743.jpg',
    difficulty: 'Beginner',
    pages: 8,
    favorite: false,
    description: "Join curious little Momo the monkey as he explores the jungle and learns by observing others. Momo watches the other animals and tries to copy what they do, sometimes with funny results! This adorable story teaches children about learning through observation, trying new things, and finding your own special talents. Perfect for young readers who love animal adventures."
  },
  {
    id: '3',
    title: 'The Magic Forest',
    category: 'Adventure',
    cover: 'https://img.freepik.com/free-vector/forest-scene-with-various-forest-trees_1308-58237.jpg',
    difficulty: 'Intermediate',
    pages: 12,
    favorite: true,
    description: "Step into The Magic Forest with Emma and Theo as they discover a hidden world of talking trees, friendly fairies, and magical creatures. When they find a mysterious map, they embark on a quest to find the ancient Guardian Tree before it loses its magic forever. This enchanting tale encourages imagination, respect for nature, and teaches children about teamwork and bravery."
  },
  {
    id: '4',
    title: 'Sleepy Sheep',
    category: 'Bedtime',
    cover: 'https://img.freepik.com/free-vector/cute-sheep-sleeping-cloud-cartoon-vector-icon-illustration_138676-5385.jpg',
    difficulty: 'Beginner',
    pages: 6,
    favorite: false,
    description: "It's bedtime for Wooly the sheep, but he just can't fall asleep! Follow along as he tries different methods to drift off to dreamland, from counting stars to listening to gentle lullabies. With soft, soothing illustrations and gentle rhyming text, this story is perfect for creating a peaceful bedtime routine and helping little ones relax before sleep."
  },
  {
    id: '5',
    title: 'Count with Elephants',
    category: 'Educational',
    cover: 'https://img.freepik.com/free-vector/cute-elephant-playing-water-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4244.jpg',
    difficulty: 'Beginner',
    pages: 8,
    favorite: true,
    description: "Join Ellie the elephant and her friends as they learn to count from one to ten! Each page introduces a new number with colorful elephants participating in fun activities. This educational story makes learning numbers enjoyable with its cheerful illustrations and simple counting exercises. A perfect first numbers book for toddlers and preschoolers."
  },
  {
    id: '6',
    title: 'The Tortoise and the Hare',
    category: 'Fables',
    cover: 'https://img.freepik.com/free-vector/turtle-cartoon-illustration_74440-768.jpg',
    difficulty: 'Beginner',
    pages: 8,
    favorite: true,
    description: "The classic Aesop's fable retold for young readers! When speedy Hare challenges slow Tortoise to a race, everyone thinks they know who will win. But Tortoise's determination and steady pace prove that 'slow and steady wins the race.' This timeless story teaches children important lessons about perseverance, humility, and the dangers of overconfidence."
  },
  {
    id: '7',
    title: 'Ocean Adventures',
    category: 'Adventure',
    cover: 'https://img.freepik.com/free-vector/cute-blue-whale-cartoon-vector-icon-illustration_138676-2789.jpg',
    difficulty: 'Intermediate',
    pages: 10,
    favorite: false,
    description: "Dive deep into the ocean with Marina the mermaid and her friend Finn the dolphin as they explore the wonders of the sea. From colorful coral reefs to mysterious shipwrecks, each page reveals amazing ocean creatures and underwater habitats. This educational adventure teaches children about marine life while encouraging environmental awareness and conservation."
  },
  {
    id: '8',
    title: 'Dinosaur Days',
    category: 'Educational',
    cover: 'https://img.freepik.com/free-vector/cute-dinosaur-cartoon-character_1308-133333.jpg',
    difficulty: 'Intermediate',
    pages: 12,
    favorite: true,
    description: "Travel back in time to when dinosaurs ruled the Earth! Meet different types of dinosaurs, from the towering Brachiosaurus to the fierce Tyrannosaurus Rex. With colorful illustrations and fascinating facts on each page, this educational story introduces young readers to paleontology and prehistoric life in an engaging and age-appropriate way."
  },
  {
    id: '9',
    title: 'The Brave Little Boat',
    category: 'Adventure',
    cover: 'https://img.freepik.com/free-vector/cute-ship-sea-cartoon-vector-icon-illustration-transportation-holiday-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4071.jpg',
    difficulty: 'Beginner',
    pages: 8,
    favorite: false,
    description: "Meet Bobbie the little boat who dreams of sailing the wide ocean instead of staying in the safe harbor. When a storm threatens the coastal town, Bobbie must overcome fear to help rescue stranded fishermen. This heartwarming story about courage, helping others, and believing in yourself will inspire young readers to face their own challenges."
  },
  {
    id: '10',
    title: 'Space Explorers',
    category: 'Adventure',
    cover: 'https://img.freepik.com/free-vector/astronaut-holding-flag-cartoon-vector-icon-illustration-science-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3492.jpg',
    difficulty: 'Advanced',
    pages: 14,
    favorite: true,
    description: "Blast off into the cosmos with Alex and Zara as they journey through our solar system in their magical spaceship! Visit each planet, marvel at the stars, and discover fascinating space phenomena. With realistic illustrations and exciting facts about astronomy, this educational adventure sparks curiosity about space science and exploration for elementary school readers."
  }
];

const AllStoriesScreen = ({ navigation }) => {
  const renderStoryCard = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 80}
      style={styles.cardWrapper}
    >
      <TouchableOpacity 
        style={styles.storyCard} 
        onPress={() => navigation.navigate('StoryDetails', { story: item })}
      >
        <Image source={{ uri: item.cover }} style={styles.storyCover} resizeMode="cover" />
        {item.favorite && (
          <View style={styles.favoriteTag}>
            <FontAwesome5 name="star" size={14} color="#FFF" />
          </View>
        )}
        <View style={styles.storyInfo}>
          <Text style={styles.storyTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.storyCategory}>{item.category}</Text>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={18} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Stories</Text>
        <View style={{ width: 40 }} />
      </View>
      <FlatList
        data={stories}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContent}
        renderItem={renderStoryCard}
        showsVerticalScrollIndicator={false}
      />
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
  gridContent: {
    paddingHorizontal: SIZES.screenPadding,
    paddingBottom: 24,
  },
  cardWrapper: {
    flex: 1,
    margin: 6,
  },
  storyCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    ...SHADOWS.medium,
    alignItems: 'center',
    padding: 10,
    minHeight: CARD_WIDTH + 40,
    position: 'relative',
  },
  storyCover: {
    width: CARD_WIDTH - 20,
    height: CARD_WIDTH - 20,
    borderRadius: 12,
    marginBottom: 8,
  },
  favoriteTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.accent2,
    borderRadius: 10,
    padding: 4,
    zIndex: 2,
  },
  storyInfo: {
    alignItems: 'center',
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  storyCategory: {
    fontSize: 13,
    color: COLORS.textLight,
  },
});

export default AllStoriesScreen; 