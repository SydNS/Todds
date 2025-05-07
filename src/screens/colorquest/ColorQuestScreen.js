import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
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
const CARD_SIZE = (width - 60) / 2;

const ColorQuestScreen = ({ navigation }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [gameMode, setGameMode] = useState('explore'); // explore, quiz
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  
  const colors = [
    { id: '1', name: 'Red', hex: '#FF5252' },
    { id: '2', name: 'Blue', hex: '#536DFE' },
    { id: '3', name: 'Green', hex: '#4CAF50' },
    { id: '4', name: 'Yellow', hex: '#FFD600' },
    { id: '5', name: 'Purple', hex: '#9C27B0' },
    { id: '6', name: 'Orange', hex: '#FF9800' },
    { id: '7', name: 'Pink', hex: '#F06292' },
    { id: '8', name: 'Brown', hex: '#795548' },
  ];
  
  const quizQuestions = [
    {
      question: 'Which color is this?',
      colorHex: '#FF5252',
      options: ['Red', 'Blue', 'Green', 'Yellow'],
      answer: 'Red'
    },
    {
      question: 'Which color is this?',
      colorHex: '#536DFE',
      options: ['Yellow', 'Blue', 'Purple', 'Green'],
      answer: 'Blue'
    },
    {
      question: 'Which color is this?',
      colorHex: '#4CAF50',
      options: ['Red', 'Blue', 'Green', 'Orange'],
      answer: 'Green'
    },
    {
      question: 'Which color is this?',
      colorHex: '#FFD600',
      options: ['Pink', 'Orange', 'Brown', 'Yellow'],
      answer: 'Yellow'
    }
  ];
  
  const handleColorPress = (color) => {
    setSelectedColor(color);
  };
  
  const handleAnswerPress = (answer) => {
    const correct = answer === quizQuestions[currentQuestion].answer;
    
    if (correct) {
      setScore(score + 1);
    }
    
    // Move to next question or end quiz
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // End of quiz, could show results or reset
      setTimeout(() => {
        setGameMode('explore');
        setCurrentQuestion(0);
        setScore(0);
      }, 1500);
    }
  };
  
  const renderExploreContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.instructionText}>
        Tap on a color to learn about it!
      </Text>
      
      <View style={styles.colorGrid}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color.id}
            style={[
              styles.colorCard,
              { backgroundColor: color.hex },
              selectedColor?.id === color.id && styles.selectedColorCard
            ]}
            onPress={() => handleColorPress(color)}
          >
            <Text style={styles.colorName}>{color.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {selectedColor && (
        <Animatable.View 
          style={styles.colorDetailCard}
          animation="fadeIn"
        >
          <Text style={styles.colorDetailTitle}>
            {selectedColor.name}
          </Text>
          <View style={[styles.colorSwatch, { backgroundColor: selectedColor.hex }]} />
          <Text style={styles.colorDescription}>
            Things that are {selectedColor.name.toLowerCase()}:
          </Text>
          
          <View style={styles.exampleContainer}>
            {getExamplesForColor(selectedColor.name).map((example, index) => (
              <Text key={index} style={styles.exampleText}>• {example}</Text>
            ))}
          </View>
        </Animatable.View>
      )}
      
      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => setGameMode('quiz')}
      >
        <FontAwesome5 name="question-circle" size={18} color="#FFF" />
        <Text style={styles.quizButtonText}>Take Color Quiz</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderQuizContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.quizProgress}>
        Question {currentQuestion + 1} of {quizQuestions.length}
      </Text>
      <Text style={styles.scoreText}>Score: {score}</Text>
      
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {quizQuestions[currentQuestion].question}
        </Text>
        
        <View 
          style={[
            styles.colorSample, 
            { backgroundColor: quizQuestions[currentQuestion].colorHex }
          ]} 
        />
        
        <View style={styles.optionsContainer}>
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswerPress(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
  
  const getExamplesForColor = (colorName) => {
    switch(colorName.toLowerCase()) {
      case 'red':
        return ['Apples', 'Fire trucks', 'Strawberries'];
      case 'blue':
        return ['Sky', 'Ocean', 'Blueberries'];
      case 'green':
        return ['Grass', 'Leaves', 'Frogs'];
      case 'yellow':
        return ['Sun', 'Bananas', 'Lemons'];
      case 'purple':
        return ['Grapes', 'Lavender', 'Eggplants'];
      case 'orange':
        return ['Oranges', 'Carrots', 'Pumpkins'];
      case 'pink':
        return ['Flowers', 'Cotton candy', 'Flamingos'];
      case 'brown':
        return ['Chocolate', 'Tree trunks', 'Bears'];
      default:
        return ['Loading examples...'];
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={18} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Color Quest</Text>
      </View>
      
      <View style={styles.modeSelector}>
        <TouchableOpacity 
          style={[styles.modeButton, gameMode === 'explore' && styles.activeModeButton]} 
          onPress={() => setGameMode('explore')}
        >
          <FontAwesome5 
            name="palette" 
            size={18} 
            color={gameMode === 'explore' ? '#FFF' : COLORS.text} 
          />
          <Text style={[
            styles.modeButtonText, 
            gameMode === 'explore' && styles.activeModeButtonText
          ]}>
            Explore Colors
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.modeButton, gameMode === 'quiz' && styles.activeModeButton]} 
          onPress={() => setGameMode('quiz')}
        >
          <FontAwesome5 
            name="question-circle" 
            size={18} 
            color={gameMode === 'quiz' ? '#FFF' : COLORS.text} 
          />
          <Text style={[
            styles.modeButtonText, 
            gameMode === 'quiz' && styles.activeModeButtonText
          ]}>
            Color Quiz
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.mainContent}
        contentContainerStyle={styles.scrollContent}
      >
        {gameMode === 'explore' ? renderExploreContent() : renderQuizContent()}
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
  modeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
    marginBottom: 15,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#FFF',
    ...SHADOWS.small,
  },
  activeModeButton: {
    backgroundColor: COLORS.accent6,
  },
  modeButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  activeModeButtonText: {
    color: '#FFF',
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.screenPadding,
    paddingBottom: 80,
  },
  contentContainer: {
    flex: 1,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorCard: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    margin: 5,
    ...SHADOWS.medium,
  },
  selectedColorCard: {
    borderWidth: 3,
    borderColor: '#FFF',
  },
  colorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  colorDetailCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    ...SHADOWS.medium,
  },
  colorDetailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 15,
  },
  colorSwatch: {
    width: '100%',
    height: 80,
    borderRadius: 10,
    marginBottom: 15,
  },
  colorDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 10,
  },
  exampleContainer: {
    paddingLeft: 10,
  },
  exampleText: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 5,
  },
  quizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent6,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 30,
  },
  quizButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 8,
  },
  quizProgress: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 5,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.accent1,
    textAlign: 'center',
    marginBottom: 20,
  },
  questionContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    ...SHADOWS.medium,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  colorSample: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    ...SHADOWS.small,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
});

export default ColorQuestScreen; 