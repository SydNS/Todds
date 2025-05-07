import { FontAwesome5 } from '@expo/vector-icons';
import { Video as ExpoVideo, useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
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
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING = 10;

// Carousel component for videos
const VideoCarousel = ({ data }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [useExpoAV, setUseExpoAV] = useState(false);
  const videoRef = useRef(null);
  
  // Create the player at the top level with null initial source
  const player = useVideoPlayer(null);

  const closeModal = () => {
    setModalVisible(false);
    if (player && !useExpoAV) {
      player.pause();
    }
    if (videoRef.current && useExpoAV) {
      videoRef.current.pauseAsync();
    }
  };

  const handleVideoPress = (video) => {
    setSelectedVideo(video);
    try {
      // Try to use expo-video first
      if (player && !useExpoAV) {
        console.log("Loading video with expo-video:", video.url);
        player.replaceAsync(video.url)
          .then(() => {
            console.log("Playing video");
            player.play();
          })
          .catch(error => {
            console.error("Error playing video with expo-video:", error);
            setUseExpoAV(true);
          });
      }
      setModalVisible(true);
    } catch (error) {
      console.error("Error in handleVideoPress:", error);
      // Fall back to ExpoAV
      setUseExpoAV(true);
      setModalVisible(true);
    }
  };

  useEffect(() => {
    // Load the video using expo-video when modal is opened with useExpoAV
    if (modalVisible && useExpoAV && videoRef.current && selectedVideo) {
      console.log("Loading video with expo-av:", selectedVideo.url);
      try {
        videoRef.current.loadAsync({ uri: selectedVideo.url }, {}, false)
          .then(() => videoRef.current.playAsync())
          .catch(error => console.error("Error loading video with expo-av:", error));
      } catch (error) {
        console.error("Error in useEffect loading video:", error);
      }
    }
  }, [modalVisible, useExpoAV, selectedVideo]);

  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.carouselTitle}>Watch & Learn</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: SIZES.screenPadding }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.carouselCard}
            onPress={() => handleVideoPress(item)}
          >
            <Image source={{ uri: item.thumbnail }} style={styles.carouselImage} />
            <View style={styles.cardOverlay}>
              <View style={styles.playButton}>
                <FontAwesome5 name="play" size={15} color="#FFF" />
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDuration}>{item.duration}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Video Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.videoContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <FontAwesome5 name="times" size={20} color="#FFF" />
            </TouchableOpacity>
            
            {selectedVideo && !useExpoAV && player && (
              <View style={styles.videoWrapper}>
                <VideoView
                  player={player}
                  style={styles.video}
                  nativeControls
                />
                <Text style={styles.videoTitle}>{selectedVideo.title}</Text>
              </View>
            )}

            {selectedVideo && useExpoAV && (
              <View style={styles.videoWrapper}>
                <ExpoVideo
                  ref={videoRef}
                  style={styles.video}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                  onError={(error) => {
                    console.error("Expo Video error:", error);
                  }}
                />
                <Text style={styles.videoTitle}>{selectedVideo.title}</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Today's Challenge component
const TodaysChallenge = ({ onPress }) => {
  const bounceAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animatable.View 
      animation="fadeInUp" 
      duration={800} 
      delay={300}
      style={styles.challengeContainer}
    >
      <View style={styles.challengeHeader}>
        <FontAwesome5 name="calendar-day" size={18} color={COLORS.accent1} />
        <Text style={styles.challengeHeaderText}>Today's Challenge</Text>
      </View>
      <Text style={styles.challengeTitle}>Can you match the beginning sounds? 🧠</Text>
      <Animated.View 
        style={[
          styles.startButtonContainer, 
          { transform: [{ scale: bounceAnim }] }
        ]}
      >
        <TouchableOpacity 
          style={styles.startButton}
          onPress={onPress}
        >
          <Text style={styles.startButtonText}>Start Challenge</Text>
          <FontAwesome5 name="arrow-right" size={12} color="#FFF" style={styles.buttonIcon} />
        </TouchableOpacity>
      </Animated.View>
    </Animatable.View>
  );
};

// Staggered list item component
const QuickAccessItem = ({ item, index, onPress }) => {
  return (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 100}
      duration={600}
      style={[styles.quickAccessItem, { backgroundColor: item.backgroundColor }]}
    >
      <TouchableOpacity 
        style={styles.quickAccessButton} 
        onPress={() => onPress(item)}
      >
        <View style={styles.quickAccessIconContainer}>
          {item.icon}
        </View>
        <Text style={styles.quickAccessText}>{item.title}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const HomeScreen = ({ navigation }) => {
  const { userInfo } = useAuth();
  
  // Updated video data with direct video URLs
  const videoData = [
    {
      id: '1',
      title: 'ABC Song - Learn English Alphabet for Children',
      thumbnail: 'https://i.ytimg.com/vi/75p-N9YKqNo/maxresdefault.jpg',
      duration: '2:32',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Updated to a sample video that should work
    },
    {
      id: '2',
      title: 'Numbers Song 1-10',
      thumbnail: 'https://i.ytimg.com/vi/DR-cfDsHCGA/maxresdefault.jpg',
      duration: '2:48',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', // Updated to a sample video that should work
    },
    {
      id: '3',
      title: 'Phonics Song with Two Words',
      thumbnail: 'https://i.ytimg.com/vi/BELlZKpi1Zs/maxresdefault.jpg',
      duration: '2:38',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', // Updated to a sample video that should work
    },
    {
      id: '4',
      title: 'Colors Song for Kids',
      thumbnail: 'https://i.ytimg.com/vi/_mVE4BJp8Zw/maxresdefault.jpg',
      duration: '3:05',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', // Updated to a sample video that should work
    },
  ];
  
  // Quick access items for staggered list
  const quickAccessItems = [
    {
      id: '1',
      title: 'Read a Story',
      icon: <FontAwesome5 name="book-open" size={24} color="#FFF" />,
      backgroundColor: COLORS.storyWorld.primary,
      screen: 'ReadStory',
    },
    {
      id: '2',
      title: 'Books',
      icon: <FontAwesome5 name="book" size={24} color="#FFF" />,
      backgroundColor: COLORS.storyWorld.secondary || '#FF9800',
      screen: 'Books',
    },
    {
      id: '3',
      title: 'Learn Phonics',
      icon: <FontAwesome5 name="font" size={24} color="#FFF" />,
      backgroundColor: COLORS.phonicsPlayground.primary,
      screen: 'LearnPhonics',
    },
    {
      id: '4',
      title: 'Sing with Us',
      icon: <FontAwesome5 name="music" size={24} color="#FFF" />,
      backgroundColor: COLORS.rhymeRhythm.primary,
      screen: 'SingWithUs',
    },
    {
      id: '5',
      title: 'Puzzles & Games',
      icon: <FontAwesome5 name="puzzle-piece" size={24} color="#FFF" />,
      backgroundColor: COLORS.gameZone.primary,
      screen: 'PuzzlesGames',
    },
    {
      id: '6',
      title: 'This Week\'s Favorites',
      icon: <FontAwesome5 name="star" size={24} color="#FFF" />,
      backgroundColor: COLORS.accent1,
      screen: 'WeeklyFavorites',
    },
  ];

  const handleChallenge = () => {
    navigation.navigate('TodaysChallenge');
  };

  const handleQuickAccessPress = (item) => {
    navigation.navigate(item.screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with welcome message and avatar */}
        <Animatable.View 
          animation="fadeIn" 
          duration={600}
          style={styles.header}
        >
          <View>
            <Text style={styles.greeting}>Welcome back, {userInfo?.name || 'Friend'}!</Text>
            <View style={styles.badgeContainer}>
              <FontAwesome5 name="star" size={14} color={COLORS.accent1} />
              <Text style={styles.badgeText}>3 lessons today!</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileImageContainer}>
              <Text style={styles.profileInitial}>{(userInfo?.name || 'A').charAt(0)}</Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>

        {/* Today's Challenge */}
        <TodaysChallenge onPress={handleChallenge} />

        {/* Videos Carousel */}
        <VideoCarousel data={videoData} />

        {/* Quick Access Staggered List */}
        <View style={styles.quickAccessContainer}>
          <Text style={styles.sectionTitle}>Explore & Play</Text>
          <View style={styles.quickAccessGrid}>
            {quickAccessItems.map((item, index) => (
              <QuickAccessItem 
                key={item.id}
                item={item}
                index={index}
                onPress={handleQuickAccessPress}
              />
            ))}
          </View>
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
  scrollContainer: {
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: SIZES.large,
    paddingBottom: SIZES.xlarge * 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.large,
  },
  greeting: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    backgroundColor: 'rgba(255, 213, 79, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: SIZES.small,
    color: COLORS.text,
    marginLeft: 6,
    fontWeight: '500',
  },
  profileButton: {
    padding: 4,
  },
  profileImageContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  profileInitial: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  challengeContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: SIZES.cardRadius,
    padding: SIZES.medium,
    marginBottom: SIZES.xlarge,
    borderWidth: 2,
    borderColor: '#90CAF9',
    ...SHADOWS.medium,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  challengeHeaderText: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: COLORS.accent1,
    marginLeft: 6,
  },
  challengeTitle: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.medium,
  },
  startButtonContainer: {
    alignSelf: 'flex-start',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    ...SHADOWS.small,
  },
  startButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginRight: 6,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  carouselContainer: {
    marginBottom: SIZES.xlarge,
  },
  carouselTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.medium,
    paddingHorizontal: SIZES.screenPadding,
  },
  carouselCard: {
    width: CARD_WIDTH,
    marginRight: SPACING,
    borderRadius: SIZES.cardRadius,
    overflow: 'hidden',
    backgroundColor: COLORS.background,
    ...SHADOWS.medium,
  },
  carouselImage: {
    width: '100%',
    height: 160,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  cardContent: {
    padding: SIZES.medium,
  },
  cardTitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  cardDuration: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  quickAccessContainer: {
    marginBottom: SIZES.xlarge,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.medium,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAccessItem: {
    width: '48%',
    borderRadius: SIZES.cardRadius,
    overflow: 'hidden',
    marginBottom: 12,
    ...SHADOWS.medium,
  },
  quickAccessButton: {
    padding: SIZES.medium,
    alignItems: 'center',
  },
  quickAccessIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickAccessText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: SIZES.medium,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '90%',
    height: '60%',
    backgroundColor: '#000',
    borderRadius: SIZES.cardRadius,
    overflow: 'hidden',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoWrapper: {
    width: '100%',
    height: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoTitle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    color: '#FFF',
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default HomeScreen; 