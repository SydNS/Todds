import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { WebView } from 'react-native-webview';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import { getTransparentOverlay, useRandomBackground } from '../../utils/backgroundUtils';

const SingWithUsScreen = ({ navigation }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const progressInterval = useRef(null);
  const [progress, setProgress] = useState(0);
  const backgroundImage = useRandomBackground();
  
  // Song data with YouTube IDs
  const songs = [
    {
      id: '1',
      title: 'Shapes for Kids to Learn - Learning Shapes for Toddlers',
      category: 'Educational',
      duration: '3:15',
      thumbnail: 'https://img.youtube.com/vi/noCiE_1YRJo/maxresdefault.jpg',
      hasLyrics: true,
      hasSignLanguage: true,
      youtubeId: 'noCiE_1YRJo'
    },
    {
      id: '2',
      title: 'Phonics Song with TWO Words - A For Apple - ABC Alphabet Songs',
      category: 'Educational',
      duration: '4:02',
      thumbnail: 'https://img.youtube.com/vi/DvTAWOItdAg/maxresdefault.jpg',
      hasLyrics: true,
      hasSignLanguage: true,
      youtubeId: 'DvTAWOItdAg'
    },
    {
      id: '3',
      title: 'Counting Numbers 1 to 10 - Simple Number Counting for Toddlers',
      category: 'Counting',
      duration: '2:55',
      thumbnail: 'https://img.youtube.com/vi/FzAACRBg_Qc/maxresdefault.jpg',
      hasLyrics: true,
      hasSignLanguage: false,
      youtubeId: 'FzAACRBg_Qc'
    },
    {
      id: '4',
      title: 'ABC Phonics | Reading for Kids Part 1 | LOTTY LEARNS',
      category: 'Educational',
      duration: '3:21',
      thumbnail: 'https://img.youtube.com/vi/fYEzqbRGwcY/maxresdefault.jpg',
      hasLyrics: true,
      hasSignLanguage: false,
      youtubeId: 'fYEzqbRGwcY'
    },
  ];
  
  // Categories
  const categories = [
    { id: '1', title: 'All' },
    { id: '2', title: 'Educational' },
    { id: '3', title: 'Bedtime' },
    { id: '4', title: 'Action' },
    { id: '5', title: 'Animals' },
    { id: '6', title: 'Traditional' },
  ];
  
  useEffect(() => {
    // Clean up interval when component unmounts
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    // Reset progress when changing songs
    if (currentSong) {
      setProgress(0);
      if (isPlaying) {
        startProgressSimulation();
      }
    }
  }, [currentSong]);

  useEffect(() => {
    // Handle play/pause state change
    if (isPlaying) {
      startProgressSimulation();
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }
  }, [isPlaying]);

  const startProgressSimulation = () => {
    // Clear any existing interval
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    
    if (!currentSong) return;
    
    // Parse duration (e.g., "2:32" to seconds)
    const durationParts = currentSong.duration.split(':');
    const totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
    const increment = 1 / (totalSeconds * 2); // Update twice per second
    
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 1) {
          clearInterval(progressInterval.current);
          setIsPlaying(false);
          return 1;
        }
        return prev + increment;
      });
    }, 500);
  };
  
  const handleSongPress = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const openVideoModal = () => {
    if (currentSong) {
      setVideoModalVisible(true);
    }
  };

  const closeVideoModal = () => {
    setVideoModalVisible(false);
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
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <FontAwesome5 name="arrow-left" size={18} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Sing with Us</Text>
            <View style={{ width: 40 }} />
          </View>
          
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Welcome Section */}
            <Animatable.View 
              animation="fadeIn" 
              duration={800}
              style={styles.welcomeBanner}
            >
              <View>
                <Text style={styles.welcomeTitle}>Time to Sing!</Text>
                <Text style={styles.welcomeSubtitle}>Learn through music and rhythm</Text>
              </View>
              <Animatable.View 
                animation="pulse" 
                iterationCount="infinite" 
                duration={2000}
              >
                <FontAwesome5 name="music" size={40} color={COLORS.rhymeRhythm.primary} />
              </Animatable.View>
            </Animatable.View>
            
            {/* Categories */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {categories.map((category) => (
                <TouchableOpacity 
                  key={category.id} 
                  style={styles.categoryPill}
                >
                  <Text style={styles.categoryText}>{category.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            {/* Current Song Player (shown when a song is selected) */}
            {currentSong && (
              <Animatable.View 
                animation="fadeInDown" 
                duration={800}
                style={styles.playerContainer}
              >
                <View style={styles.playerContent}>
                  <TouchableOpacity onPress={openVideoModal}>
                    <Image 
                      source={{ uri: currentSong.thumbnail }}
                      style={styles.playerThumbnail}
                      resizeMode="cover"
                    />
                    <View style={styles.thumbnailOverlay}>
                      <FontAwesome5 name="play-circle" size={24} color="#FFF" />
                    </View>
                  </TouchableOpacity>
                  
                  <View style={styles.playerInfo}>
                    <Text style={styles.playerTitle}>{currentSong.title}</Text>
                    <Text style={styles.playerCategory}>{currentSong.category}</Text>
                    
                    <View style={styles.playerControls}>
                      <TouchableOpacity style={styles.controlButton}>
                        <FontAwesome5 name="step-backward" size={18} color={COLORS.text} />
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={styles.playPauseButton}
                        onPress={togglePlayPause}
                      >
                        <FontAwesome5 
                          name={isPlaying ? "pause" : "play"} 
                          size={20} 
                          color="#FFF" 
                        />
                      </TouchableOpacity>
                      
                      <TouchableOpacity style={styles.controlButton}>
                        <FontAwesome5 name="step-forward" size={18} color={COLORS.text} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                </View>
                
                <View style={styles.playerFeatures}>
                  {currentSong.hasLyrics && (
                    <TouchableOpacity style={styles.featureButton}>
                      <FontAwesome5 name="closed-captioning" size={14} color={COLORS.text} />
                      <Text style={styles.featureText}>Lyrics</Text>
                    </TouchableOpacity>
                  )}
                  
                  {currentSong.hasSignLanguage && (
                    <TouchableOpacity style={styles.featureButton}>
                      <FontAwesome5 name="sign-language" size={14} color={COLORS.text} />
                      <Text style={styles.featureText}>Sign Language</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </Animatable.View>
            )}
            
            {/* Songs List */}
            <View style={styles.songsContainer}>
              <Text style={styles.sectionTitle}>Popular Songs</Text>
              
              {songs.map((song) => (
                <Animatable.View 
                  key={song.id}
                  animation="fadeInUp"
                  duration={600}
                  delay={parseInt(song.id) * 100}
                >
                  <TouchableOpacity 
                    style={styles.songCard}
                    onPress={() => handleSongPress(song)}
                  >
                    <Image 
                      source={{ uri: song.thumbnail }}
                      style={styles.songThumbnail}
                    />
                    <View style={styles.songInfo}>
                      <Text style={styles.songTitle}>{song.title}</Text>
                      <Text style={styles.songCategory}>{song.category}</Text>
                      <View style={styles.songFeatures}>
                        {song.hasLyrics && (
                          <View style={styles.featureTag}>
                            <FontAwesome5 name="closed-captioning" size={10} color={COLORS.textLight} />
                          </View>
                        )}
                        {song.hasSignLanguage && (
                          <View style={styles.featureTag}>
                            <FontAwesome5 name="sign-language" size={10} color={COLORS.textLight} />
                          </View>
                        )}
                      </View>
                    </View>
                    <View style={styles.songMeta}>
                      <Text style={styles.songDuration}>{song.duration}</Text>
                      <TouchableOpacity 
                        style={styles.playButton}
                        onPress={() => handleSongPress(song)}
                      >
                        <FontAwesome5 name="play" size={12} color="#FFF" />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </Animatable.View>
              ))}
            </View>
            
            {/* Traditional Rhymes Section */}
            <View style={styles.traditionalContainer}>
              <Text style={styles.sectionTitle}>African Traditional Rhymes</Text>
              <Animatable.View 
                animation="fadeIn" 
                duration={800}
                style={styles.traditionalCard}
              >
                <Image 
                  source={{ uri: 'https://placehold.co/600x300/FF8A65/FFF?text=Traditional+Rhymes' }}
                  style={styles.traditionalImage}
                  resizeMode="cover"
                />
                <View style={styles.traditionalContent}>
                  <Text style={styles.traditionalTitle}>Discover Cultural Rhymes</Text>
                  <Text style={styles.traditionalDescription}>
                    Explore traditional African rhymes and songs that celebrate 
                    our rich heritage and culture.
                  </Text>
                  <TouchableOpacity style={styles.exploreButton}>
                    <Text style={styles.exploreButtonText}>Explore</Text>
                    <FontAwesome5 name="arrow-right" size={12} color="#FFF" style={styles.buttonIcon} />
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            </View>
            
          </ScrollView>
          
          {/* Video Modal */}
          <Modal
            visible={videoModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={closeVideoModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.videoContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={closeVideoModal}>
                  <FontAwesome5 name="times" size={20} color="#FFF" />
                </TouchableOpacity>
                
                {currentSong && (
                  <View style={styles.videoWrapper}>
                    <WebView
                      source={{ 
                        uri: `https://www.youtube.com/embed/${currentSong.youtubeId}?rel=0&autoplay=1&playsinline=1` 
                      }}
                      style={styles.video}
                      allowsFullscreenVideo
                      mediaPlaybackRequiresUserAction={false}
                      javaScriptEnabled={true}
                      domStorageEnabled={true}
                    />
                    <Text style={styles.videoTitle}>{currentSong.title}</Text>
                  </View>
                )}
              </View>
            </View>
          </Modal>
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
    backgroundColor: 'rgba(206, 147, 216, 0.2)',
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
    paddingHorizontal: SIZES.screenPadding,
    marginBottom: SIZES.large,
  },
  categoryPill: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  playerContainer: {
    backgroundColor: COLORS.card,
    marginHorizontal: SIZES.screenPadding,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.medium,
    marginBottom: SIZES.large,
    ...SHADOWS.medium,
  },
  playerContent: {
    flexDirection: 'row',
    marginBottom: SIZES.medium,
  },
  playerThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: SIZES.medium,
  },
  playerInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  playerTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  playerCategory: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.small,
  },
  playPauseButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.rhymeRhythm.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SIZES.small,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 2,
    marginBottom: SIZES.medium,
  },
  progressFill: {
    width: '35%',
    height: '100%',
    backgroundColor: COLORS.rhymeRhythm.primary,
    borderRadius: 2,
  },
  playerFeatures: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  featureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SIZES.medium,
  },
  featureText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  songsContainer: {
    marginBottom: SIZES.xlarge,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.medium,
    paddingHorizontal: SIZES.screenPadding,
  },
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    marginHorizontal: SIZES.screenPadding,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.small,
    marginBottom: SIZES.small,
    ...SHADOWS.small,
  },
  songThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: SIZES.medium,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  songCategory: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  songFeatures: {
    flexDirection: 'row',
  },
  featureTag: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  songMeta: {
    alignItems: 'center',
  },
  songDuration: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: 6,
  },
  playButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.rhymeRhythm.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  traditionalContainer: {
    marginBottom: SIZES.xlarge,
  },
  traditionalCard: {
    marginHorizontal: SIZES.screenPadding,
    borderRadius: SIZES.cardRadius,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  traditionalImage: {
    width: '100%',
    height: 150,
  },
  traditionalContent: {
    padding: SIZES.medium,
  },
  traditionalTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  traditionalDescription: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
    marginBottom: SIZES.medium,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.rhymeRhythm.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  exploreButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginRight: 6,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  thumbnailOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoTitle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: '#FFF',
    fontSize: SIZES.font,
    fontWeight: 'bold',
    padding: SIZES.small,
  },
});

export default SingWithUsScreen; 