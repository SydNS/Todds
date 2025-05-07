import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

const SoundItOutScreen = ({ navigation }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [sound, setSound] = useState(null);

  // Request audio permissions when component mounts
  useEffect(() => {
    (async () => {
      try {
        console.log("Requesting audio permissions...");
        const permission = await Audio.requestPermissionsAsync();
        console.log("Permission response:", permission);
        
        if (permission.status !== 'granted') {
          Alert.alert(
            'Permission Required',
            'Audio playback requires microphone permission',
            [{ text: 'OK' }]
          );
        }
      } catch (error) {
        console.error("Error requesting permissions:", error);
      }
    })();
  }, []);

  // Cleanup sound on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const levels = [
    {
      id: '1',
      targetSound: 'B',
      targetWord: 'Ball',
      audioUrl: 'https://assets.mixkit.co/sfx/preview/mixkit-cartoon-toy-whistle-616.mp3',
      targetImage: 'https://cdn-icons-png.flaticon.com/512/3097/3097648.png',
      options: ['B', 'D', 'P', 'T'],
      correctOption: 'B',
    },
    {
      id: '2',
      targetSound: 'S',
      targetWord: 'Snake',
      audioUrl: 'https://assets.mixkit.co/sfx/preview/mixkit-cinematic-fairy-water-splashes-538.mp3',
      targetImage: 'https://cdn-icons-png.flaticon.com/512/3097/3097795.png',
      options: ['S', 'Z', 'C', 'F'],
      correctOption: 'S',
    },
    {
      id: '3',
      targetSound: 'M',
      targetWord: 'Mouse',
      audioUrl: 'https://assets.mixkit.co/sfx/preview/mixkit-cartoon-falling-whistle-395.mp3',
      targetImage: 'https://cdn-icons-png.flaticon.com/512/3097/3097878.png',
      options: ['M', 'N', 'W', 'V'],
      correctOption: 'M',
    },
    {
      id: '4',
      targetSound: 'C',
      targetWord: 'Cat',
      audioUrl: 'https://assets.mixkit.co/sfx/preview/mixkit-cat-meow-mammal-4520.mp3',
      targetImage: 'https://cdn-icons-png.flaticon.com/512/3097/3097877.png',
      options: ['C', 'K', 'G', 'Q'],
      correctOption: 'C',
    },
  ];

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    const correct = option === levels[currentLevel].correctOption;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
    
    // Move to next level after a delay
    setTimeout(() => {
      if (currentLevel < levels.length - 1) {
        setCurrentLevel(currentLevel + 1);
      } else {
        // Game finished
        // Reset after showing results
        setTimeout(() => {
          setCurrentLevel(0);
          setScore(0);
        }, 1500);
      }
      setSelectedOption(null);
      setIsCorrect(null);
    }, 1500);
  };
  
  async function playSound() {
    const currentSound = levels[currentLevel];
    console.log('Attempting to play sound for:', currentSound.targetSound);
    
    try {
      // Unload the previous sound if it exists
      if (sound) {
        await sound.unloadAsync();
      }
      
      // Set up audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      
      console.log('Loading sound from URL:', currentSound.audioUrl);
      
      // Create new sound instance from URL
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: currentSound.audioUrl },
        { shouldPlay: true, volume: 1.0 }
      );
      
      setSound(newSound);
      
      // Monitor playback status
      newSound.setOnPlaybackStatusUpdate((status) => {
        console.log('Playback status:', status.isPlaying ? 'Playing' : 'Stopped');
        
        if (status.didJustFinish) {
          console.log('Sound finished playing');
        }
      });
      
    } catch (error) {
      console.error('Error playing sound:', error);
      Alert.alert('Sound Error', 'There was a problem playing the sound.');
    }
  }
  
  const handlePlaySound = () => {
    console.log('Play sound button pressed');
    // Play the current target letter sound
    playSound();
  };
  
  const currentLevelData = levels[currentLevel];
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={18} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sound It Out!</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Level {currentLevel + 1} of {levels.length}
        </Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.instructionText}>
          Listen to the sound and tap the correct letter!
        </Text>
        
        <View style={styles.targetContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: currentLevelData.targetImage }} 
              style={styles.targetImage}
              resizeMode="contain"
            />
            <Text style={styles.targetWord}>{currentLevelData.targetWord}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.playButton}
            onPress={handlePlaySound}
          >
            <FontAwesome5 name="volume-up" size={24} color="#FFF" />
            <Text style={styles.playButtonText}>Play Sound</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.optionsContainer}>
          {currentLevelData.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionCard,
                selectedOption === option && 
                  (isCorrect ? styles.correctOption : styles.incorrectOption)
              ]}
              onPress={() => handleOptionPress(option)}
              disabled={selectedOption !== null}
            >
              <Text style={styles.optionText}>{option}</Text>
              {selectedOption === option && isCorrect && (
                <Animatable.View 
                  style={styles.feedbackIcon}
                  animation="bounceIn"
                >
                  <MaterialIcons name="check-circle" size={30} color="#4CAF50" />
                </Animatable.View>
              )}
              {selectedOption === option && !isCorrect && (
                <Animatable.View 
                  style={styles.feedbackIcon}
                  animation="bounceIn"
                >
                  <MaterialIcons name="cancel" size={30} color="#F44336" />
                </Animatable.View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        {isCorrect === false && (
          <Animatable.View 
            style={styles.hintContainer}
            animation="fadeIn"
          >
            <Text style={styles.hintText}>
              The correct answer was "{currentLevelData.correctOption}"
            </Text>
            <Text style={styles.hintDetail}>
              {currentLevelData.targetWord} starts with the letter {currentLevelData.correctOption}
            </Text>
          </Animatable.View>
        )}
        
        {currentLevel === levels.length - 1 && selectedOption !== null && (
          <Animatable.View 
            style={styles.completionContainer}
            animation="fadeIn"
          >
            <Text style={styles.completionText}>
              Great job! You scored {score} out of {levels.length}!
            </Text>
            <TouchableOpacity 
              style={styles.restartButton}
              onPress={() => {
                setCurrentLevel(0);
                setScore(0);
                setSelectedOption(null);
                setIsCorrect(null);
              }}
            >
              <Text style={styles.restartButtonText}>Play Again</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
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
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.screenPadding,
    marginBottom: 10,
  },
  progressText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.accent2,
  },
  content: {
    padding: SIZES.screenPadding,
    paddingBottom: 100,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  targetContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    ...SHADOWS.medium,
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  targetImage: {
    width: 130,
    height: 130,
    marginBottom: 10,
  },
  targetWord: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  playButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    backgroundColor: '#FFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    ...SHADOWS.medium,
    position: 'relative',
  },
  correctOption: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    borderWidth: 2,
    borderColor: '#F44336',
  },
  optionText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  feedbackIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  hintContainer: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  hintText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.accent6,
    marginBottom: 5,
  },
  hintDetail: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  completionContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    ...SHADOWS.medium,
  },
  completionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.accent2,
    textAlign: 'center',
    marginBottom: 15,
  },
  restartButton: {
    backgroundColor: COLORS.accent2,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  restartButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default SoundItOutScreen; 