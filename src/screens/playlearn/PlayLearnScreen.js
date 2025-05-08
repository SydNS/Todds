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
  TouchableOpacity,
  View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import { getTransparentOverlay, useRandomBackground } from '../../utils/backgroundUtils';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - (SIZES.screenPadding * 2) - 16) / 2; // Two columns with spacing

const PlayLearnScreen = ({ navigation }) => {
  const backgroundImage = useRandomBackground();
  
  // Updated categories without Children's Books
  const categories = [
    {
      id: '1',
      title: 'Alphabet Adventure',
      description: 'Trace, match, and say letters',
      icon: <FontAwesome5 name="font" size={34} color="#333" />,
      backgroundColor: COLORS.accent3,
      screen: 'AlphabetAdventure',
    },
    {
      id: '2',
      title: 'Animal Sounds Safari',
      description: 'Match animals to sounds',
      icon: <FontAwesome5 name="paw" size={34} color="#333" />,
      backgroundColor: COLORS.accent5,
      screen: 'AnimalSounds',
    },
    {
      id: '3',
      title: 'Color Quest',
      description: 'Pick and name colors',
      icon: <Ionicons name="color-palette" size={34} color="#333" />,
      backgroundColor: COLORS.accent6,
      screen: 'ColorQuest',
    },
    {
      id: '4',
      title: 'Sound It Out!',
      description: 'Hear and tap the correct sound',
      icon: <FontAwesome5 name="headphones" size={34} color="#333" />,
      backgroundColor: COLORS.accent2,
      screen: 'SoundItOut',
    },
    {
      id: '5',
      title: 'Memory Mix',
      description: 'Flip cards, match shapes/sounds',
      icon: <MaterialCommunityIcons name="cards" size={34} color="#333" />,
      backgroundColor: COLORS.accent1,
      screen: 'MemoryMix',
    },
    {
      id: '6',
      title: 'Draw & Tell',
      description: 'Simple canvas to draw and speak',
      icon: <FontAwesome5 name="paint-brush" size={34} color="#333" />,
      backgroundColor: COLORS.tertiary,
      screen: 'DrawAndTell',
    }
  ];

  const handleCardPress = (category) => {
    // Pass the title and color to the placeholder screen
    navigation.navigate(category.screen, { 
      title: category.title,
      color: category.backgroundColor
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={backgroundImage}
        style={styles.backgroundImage}
      >
        <View style={[styles.overlay, getTransparentOverlay()]}>
          <View style={styles.header}>
            <Text style={styles.title}>Play & Learn</Text>
            <Text style={styles.subtitle}>Choose an activity to play and learn!</Text>
            <FontAwesome5 name="star" size={18} color={COLORS.accent1} style={styles.star} />
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            <View style={styles.cardsGrid}>
              {categories.map((category) => (
                <Animatable.View
                  key={category.id}
                  animation="fadeInUp"
                  delay={200 + (parseInt(category.id) * 100)}
                  duration={500}
                >
                  <TouchableOpacity 
                    style={[styles.activityCard, { backgroundColor: category.backgroundColor }]}
                    onPress={() => handleCardPress(category)}
                  >
                    <View style={styles.iconCircle}>
                      {category.icon}
                    </View>
                    <View style={styles.cardTextContent}>
                      <Text style={styles.cardTitle}>{category.title}</Text>
                      <Text style={styles.cardDescription}>{category.description}</Text>
                    </View>
                  </TouchableOpacity>
                </Animatable.View>
              ))}
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
  header: {
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: SIZES.spacing.xl,
    paddingBottom: SIZES.spacing.m,
    position: 'relative',
  },
  star: {
    position: 'absolute',
    top: SIZES.spacing.xl,
    right: SIZES.screenPadding,
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
  scrollViewContent: {
    paddingHorizontal: SIZES.screenPadding,
    paddingBottom: 100, // Extra padding at bottom to account for tab bar
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityCard: {
    width: CARD_WIDTH,
    borderRadius: 16,
    padding: SIZES.medium,
    marginBottom: 16,
    ...SHADOWS.medium,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    alignSelf: 'center',
  },
  cardTextContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: SIZES.small,
    color: '#333',
    textAlign: 'center',
  }
});

export default PlayLearnScreen; 