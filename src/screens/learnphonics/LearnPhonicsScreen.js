import { FontAwesome5 } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
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
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import { getTransparentOverlay, useRandomBackground } from '../../utils/backgroundUtils';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.42;
const CARD_HEIGHT = 180;

const LearnPhonicsScreen = ({ navigation }) => {
  const [selectedSection, setSelectedSection] = useState('letters');
  const [activeCard, setActiveCard] = useState(null);
  const soundRef = useRef(null);
  const backgroundImage = useRandomBackground();
  
  const backButtonRef = useRef();
  const sectionButtonsRef = useRef({});
  
  // Play animation for back button on mount
  React.useEffect(() => {
    setTimeout(() => {
      if (backButtonRef.current) {
        backButtonRef.current.bounceIn(800);
      }
    }, 300);
  }, []);
  
  // Phonics data - letters with enhanced imagery and sounds
  const letters = [
    { 
      id: 'a', 
      letter: 'A', 
      sound: '/æ/', 
      word: 'Apple', 
      image: 'https://img.freepik.com/free-vector/red-apple-with-green-leaf_1308-119052.jpg',
      color: '#FF8A65' 
    },
    { 
      id: 'b', 
      letter: 'B', 
      sound: '/b/', 
      word: 'Ball', 
      image: 'https://img.freepik.com/free-vector/colorful-beach-ball_1308-133363.jpg',
      color: '#64B5F6' 
    },
    { 
      id: 'c', 
      letter: 'C', 
      sound: '/k/', 
      word: 'Cat', 
      image: 'https://img.freepik.com/free-vector/cute-cat-cartoon_1308-133244.jpg',
      color: '#9575CD' 
    },
    { 
      id: 'd', 
      letter: 'D', 
      sound: '/d/', 
      word: 'Dog', 
      image: 'https://img.freepik.com/free-vector/cute-dog-cartoon_1308-133235.jpg',
      color: '#FFB74D' 
    },
    { 
      id: 'e', 
      letter: 'E', 
      sound: '/ɛ/', 
      word: 'Elephant', 
      image: 'https://img.freepik.com/free-vector/cute-elephant-cartoon_1308-133164.jpg',
      color: '#4DB6AC' 
    },
    { 
      id: 'f', 
      letter: 'F', 
      sound: '/f/', 
      word: 'Fish', 
      image: 'https://img.freepik.com/free-vector/cute-fish-cartoon_1308-133233.jpg',
      color: '#FF8A65' 
    },
    // More letters would be added here
  ];
  
  // Phonics data - blends
  const blends = [
    { 
      id: 'bl', 
      blend: 'BL', 
      sound: '/bl/', 
      word: 'Blue', 
      image: 'https://img.freepik.com/free-vector/blue-color-objects-collection_1308-118640.jpg',
      color: '#42A5F5' 
    },
    { 
      id: 'cl', 
      blend: 'CL', 
      sound: '/kl/', 
      word: 'Clap', 
      image: 'https://img.freepik.com/free-vector/hands-clapping-applause-gesture_1308-133146.jpg',
      color: '#EC407A' 
    },
    { 
      id: 'fl', 
      blend: 'FL', 
      sound: '/fl/', 
      word: 'Flower', 
      image: 'https://img.freepik.com/free-vector/colorful-flower-cartoon_1308-134061.jpg',
      color: '#9CCC65' 
    },
    { 
      id: 'gl', 
      blend: 'GL', 
      sound: '/gl/', 
      word: 'Glue', 
      image: 'https://img.freepik.com/free-vector/glue-stick-cartoon_1308-134097.jpg',
      color: '#FFD54F' 
    },
    // More blends would be added here
  ];
  
  // Phonics data - digraphs
  const digraphs = [
    { 
      id: 'ch', 
      digraph: 'CH', 
      sound: '/tʃ/', 
      word: 'Chair', 
      image: 'https://img.freepik.com/free-vector/comfortable-chair-cartoon_1308-133310.jpg',
      color: '#7E57C2' 
    },
    { 
      id: 'sh', 
      digraph: 'SH', 
      sound: '/ʃ/', 
      word: 'Ship', 
      image: 'https://img.freepik.com/free-vector/sailboat-cartoon_1308-134094.jpg',
      color: '#26A69A' 
    },
    { 
      id: 'th', 
      digraph: 'TH', 
      sound: '/θ/', 
      word: 'Thumb', 
      image: 'https://img.freepik.com/free-vector/thumbs-up-hand-gesture-cartoon_1308-134046.jpg',
      color: '#FFA726' 
    },
    { 
      id: 'wh', 
      digraph: 'WH', 
      sound: '/w/', 
      word: 'Wheel', 
      image: 'https://img.freepik.com/free-vector/car-wheel-cartoon_1308-134210.jpg',
      color: '#EF5350' 
    },
    // More digraphs would be added here
  ];
  
  // Load and play sound
  const playSound = async (letter) => {
    // In a real app, you'd have actual sound files for each letter
    // For this example, we're simulating sound playback
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }
      // This is a placeholder - in a real app, you'd load the actual sound file
      console.log(`Playing sound for ${letter}`);
      setActiveCard(letter);
      
      // Reset active card after animation completes
      setTimeout(() => {
        setActiveCard(null);
      }, 1500);
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };
  
  const handleSectionChange = (section) => {
    // Animate the section change
    setSelectedSection(section);
    
    // Animate the selected button
    if (sectionButtonsRef.current[section]) {
      sectionButtonsRef.current[section].pulse(500);
    }
  };
  
  const handleCardPress = (item) => {
    // Get the appropriate text based on section
    const soundText = selectedSection === 'letters' ? item.letter : 
                    selectedSection === 'blends' ? item.blend : item.digraph;
    
    // Play sound and animation
    playSound(soundText);
  };
  
  // Render item based on selected section
  const renderPhonicsItem = ({ item, index }) => {
    const itemText = selectedSection === 'letters' ? item.letter : 
                    selectedSection === 'blends' ? item.blend : item.digraph;
    const itemWord = item.word;
    const itemSound = item.sound;
    const itemImage = item.image;
    const bgColor = item.color;
    
    const isActive = activeCard === itemText;
    
    return (
      <Animatable.View
        animation="bounceIn"
        duration={800}
        delay={index * 100}
        style={styles.cardContainer}
      >
        <TouchableOpacity 
          style={[
            styles.phonicsCard, 
            { backgroundColor: bgColor },
            isActive && styles.activeCard
          ]}
          onPress={() => handleCardPress(item)}
          activeOpacity={0.7}
        >
          <Animatable.Text 
            style={styles.phonicsLetter}
            animation={isActive ? 'bounce' : undefined}
            iterationCount={isActive ? 2 : undefined}
          >
            {itemText}
          </Animatable.Text>
          
          <View style={styles.cardDivider} />
          
          <Image 
            source={{ uri: itemImage }}
            style={styles.phonicsImage}
            resizeMode="contain"
          />
          
          <View style={styles.phonicsDetails}>
            <Text style={styles.phonicsSound}>{itemSound}</Text>
            <Text style={styles.phonicsWord}>{itemWord}</Text>
          </View>
          
          <Animatable.View 
            style={styles.phonicsIconContainer}
            animation={isActive ? 'pulse' : undefined}
            iterationCount={isActive ? 'infinite' : undefined}
          >
            <FontAwesome5 name="volume-up" size={18} color="#FFF" />
          </Animatable.View>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ImageBackground 
        source={backgroundImage}
        style={styles.backgroundImage}
      >
        <View style={[styles.overlay, getTransparentOverlay()]}>
          {/* Header */}
          <View style={styles.header}>
            <Animatable.View ref={backButtonRef}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <FontAwesome5 name="arrow-left" size={18} color={COLORS.text} />
              </TouchableOpacity>
            </Animatable.View>
            <Text style={styles.headerTitle}>Learn Phonics</Text>
            <View style={{ width: 40 }} />
          </View>
          
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Intro Section with clouds background */}
            <Animatable.View 
              animation="fadeIn" 
              duration={800}
              style={styles.introContainer}
            >
              {/* Cloud decorations */}
              <Animatable.View 
                animation="pulse" 
                iterationCount="infinite" 
                duration={3000}
                style={[styles.cloud, { top: 10, left: 20 }]}
              />
              <Animatable.View 
                animation="pulse" 
                iterationCount="infinite" 
                duration={4000}
                style={[styles.cloud, { bottom: 15, right: 30 }]}
              />
              
              <View style={styles.introContent}>
                <Text style={styles.introTitle}>Let's Learn Phonics!</Text>
                <Text style={styles.introSubtitle}>Tap on a card to hear sounds</Text>
              </View>
            </Animatable.View>
            
            {/* Section Selector - Made more playful and colorful */}
            <View style={styles.sectionSelector}>
              <Animatable.View
                ref={ref => sectionButtonsRef.current.letters = ref}
                animation="bounceIn"
                duration={800}
                delay={200}
              >
                <TouchableOpacity 
                  style={[
                    styles.sectionButton, 
                    { backgroundColor: selectedSection === 'letters' ? '#FF8A65' : COLORS.card },
                  ]}
                  onPress={() => handleSectionChange('letters')}
                >
                  <Text style={[
                    styles.sectionButtonText,
                    { color: selectedSection === 'letters' ? '#FFF' : COLORS.text }
                  ]}>
                    Letters
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
              
              <Animatable.View
                ref={ref => sectionButtonsRef.current.blends = ref}
                animation="bounceIn"
                duration={800}
                delay={300}
              >
                <TouchableOpacity 
                  style={[
                    styles.sectionButton, 
                    { backgroundColor: selectedSection === 'blends' ? '#64B5F6' : COLORS.card },
                  ]}
                  onPress={() => handleSectionChange('blends')}
                >
                  <Text style={[
                    styles.sectionButtonText,
                    { color: selectedSection === 'blends' ? '#FFF' : COLORS.text }
                  ]}>
                    Blends
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
              
              <Animatable.View
                ref={ref => sectionButtonsRef.current.digraphs = ref}
                animation="bounceIn"
                duration={800}
                delay={400}
              >
                <TouchableOpacity 
                  style={[
                    styles.sectionButton, 
                    { backgroundColor: selectedSection === 'digraphs' ? '#9575CD' : COLORS.card },
                  ]}
                  onPress={() => handleSectionChange('digraphs')}
                >
                  <Text style={[
                    styles.sectionButtonText,
                    { color: selectedSection === 'digraphs' ? '#FFF' : COLORS.text }
                  ]}>
                    Digraphs
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
            </View>
            
            {/* Phonics Cards - Redesigned to be more visually appealing */}
            <View style={styles.phonicsContainer}>
              <FlatList
                data={selectedSection === 'letters' ? letters : selectedSection === 'blends' ? blends : digraphs}
                keyExtractor={item => item.id}
                numColumns={2}
                scrollEnabled={false}
                renderItem={renderPhonicsItem}
                contentContainerStyle={styles.phonicsGrid}
              />
            </View>
            
            {/* Interactive Practice Game Section */}
            <Animatable.View 
              animation="fadeInUp" 
              duration={800}
              style={styles.practiceContainer}
            >
              <View style={styles.practiceHeader}>
                <FontAwesome5 name="gamepad" size={24} color={COLORS.primary} />
                <Text style={styles.practiceTitle}>Practice Time!</Text>
              </View>
              
              <Text style={styles.practiceDescription}>
                Play fun games to practice what you've learned!
              </Text>
              
              <View style={styles.gameButtons}>
                <TouchableOpacity style={[styles.gameButton, { backgroundColor: '#FF8A65' }]}>
                  <FontAwesome5 name="puzzle-piece" size={22} color="#FFF" style={styles.gameIcon} />
                  <Text style={styles.gameButtonText}>Matching Game</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.gameButton, { backgroundColor: '#64B5F6' }]}>
                  <FontAwesome5 name="headphones" size={22} color="#FFF" style={styles.gameIcon} />
                  <Text style={styles.gameButtonText}>Listen & Find</Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.spacing.m,
    paddingTop: SIZES.spacing.m,
    paddingBottom: SIZES.spacing.s,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  scrollContainer: {
    paddingBottom: SIZES.spacing.xxl,
  },
  introContainer: {
    position: 'relative',
    backgroundColor: 'rgba(174, 213, 255, 0.3)',
    borderRadius: SIZES.cardRadius,
    marginHorizontal: SIZES.spacing.m,
    marginTop: SIZES.spacing.s,
    marginBottom: SIZES.spacing.l,
    padding: SIZES.spacing.l,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  cloud: {
    position: 'absolute',
    width: 60,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: -1,
  },
  introContent: {
    alignItems: 'center',
  },
  introTitle: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.spacing.xs,
  },
  introSubtitle: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  sectionSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SIZES.spacing.m,
    marginBottom: SIZES.spacing.l,
  },
  sectionButton: {
    paddingVertical: SIZES.spacing.s,
    paddingHorizontal: SIZES.spacing.m,
    borderRadius: 20,
    minWidth: width * 0.25,
    ...SHADOWS.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionButtonText: {
    fontSize: SIZES.medium,
    fontWeight: '600',
  },
  phonicsContainer: {
    marginBottom: SIZES.spacing.xl,
  },
  phonicsGrid: {
    alignItems: 'center',
    paddingHorizontal: SIZES.spacing.s,
  },
  cardContainer: {
    margin: SIZES.spacing.s,
  },
  phonicsCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.spacing.m,
    position: 'relative',
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  activeCard: {
    transform: [{ scale: 1.03 }],
    ...SHADOWS.large,
  },
  phonicsLetter: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: SIZES.spacing.xs,
  },
  cardDivider: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginBottom: SIZES.spacing.xs,
  },
  phonicsImage: {
    width: '70%',
    height: 60,
    alignSelf: 'center',
    marginBottom: SIZES.spacing.xs,
  },
  phonicsDetails: {
    alignItems: 'center',
  },
  phonicsSound: {
    fontSize: SIZES.small,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  phonicsWord: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: '#FFF',
  },
  phonicsIconContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  practiceContainer: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    marginHorizontal: SIZES.spacing.m,
    padding: SIZES.spacing.l,
    ...SHADOWS.medium,
  },
  practiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.s,
  },
  practiceTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: SIZES.spacing.s,
  },
  practiceDescription: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    marginBottom: SIZES.spacing.l,
  },
  gameButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gameButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    padding: SIZES.spacing.m,
    borderRadius: 25,
    ...SHADOWS.small,
  },
  gameIcon: {
    marginRight: SIZES.spacing.xs,
  },
  gameButtonText: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default LearnPhonicsScreen; 