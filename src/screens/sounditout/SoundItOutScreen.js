import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import {
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
      soundFile: require('../../../assets/sounds/b_sound.mp3'),
      targetImage: 'https://cdn-icons-png.flaticon.com/512/3097/3097648.png',
      options: ['B', 'D', 'P', 'T'],
      correctOption: 'B',
    },
    {
      id: '2',
      targetSound: 'S',
      targetWord: 'Snake',
      soundFile: require('../../../assets/sounds/s_sound.mp3'),
      targetImage: 'https://cdn-icons-png.flaticon.com/512/3097/3097795.png',
      options: ['S', 'Z', 'C', 'F'],
      correctOption: 'S',
    },
    {
      id: '3',
      targetSound: 'M',
      targetWord: 'Mouse',
      soundFile: require('../../../assets/sounds/m_sound.mp3'),
      targetImage: 'https://cdn-icons-png.flaticon.com/512/3097/3097878.png',
      options: ['M', 'N', 'W', 'V'],
      correctOption: 'M',
    },
    {
      id: '4',
      targetSound: 'C',
      targetWord: 'Cat',
      soundFile: require('../../../assets/sounds/c_sound.mp3'),
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
    const currentSound = levels[currentLevel].soundFile;
    console.log('Loading Sound for:', levels[currentLevel].targetSound);
    
    try {
      // Unload the previous sound if exists
      if (sound) {
        await sound.unloadAsync();
      }
      
      // Create new sound instance
      const { sound: newSound } = await Audio.Sound.createAsync(currentSound);
      setSound(newSound);
      
      console.log('Playing Sound');
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }
  
  const handlePlaySound = () => {
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