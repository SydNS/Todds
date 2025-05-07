import { FontAwesome5 } from '@expo/vector-icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
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
import ChallengeContext from '../../context/ChallengeContext';

// Mock challenge questions data - in a real app, these would come from an API or database
const getMockQuestionsForChallenge = (challengeId) => {
  const questionsMap = {
    // Alphabet recognition challenge
    '1': [
      {
        id: '1',
        type: 'letter-match',
        question: 'Which letter makes the "mmm" sound?',
        options: [
          { id: 'a', value: 'S', icon: 'font', correct: false },
          { id: 'b', value: 'M', icon: 'font', correct: true },
          { id: 'c', value: 'T', icon: 'font', correct: false },
        ],
      },
      {
        id: '2',
        type: 'letter-match',
        question: 'Match the uppercase and lowercase:',
        mainLetter: 'A',
        options: [
          { id: 'a', value: 'e', icon: 'font', correct: false },
          { id: 'b', value: 'a', icon: 'font', correct: true },
          { id: 'c', value: 'c', icon: 'font', correct: false },
        ],
      },
    ],
    // Number counting challenge
    '2': [
      {
        id: '1',
        type: 'number-match',
        question: 'Count the stars. How many?',
        stars: 5,
        options: [
          { id: 'a', value: '3', icon: 'sort-numeric-down', correct: false },
          { id: 'b', value: '5', icon: 'sort-numeric-down', correct: true },
          { id: 'c', value: '7', icon: 'sort-numeric-down', correct: false },
        ],
      },
      {
        id: '2',
        type: 'number-order',
        question: 'Which number comes next? 1, 2, 3, ...',
        options: [
          { id: 'a', value: '4', icon: 'sort-numeric-down', correct: true },
          { id: 'b', value: '5', icon: 'sort-numeric-down', correct: false },
          { id: 'c', value: '6', icon: 'sort-numeric-down', correct: false },
        ],
      },
    ],
    // Color matching challenge
    '3': [
      {
        id: '1',
        type: 'color-match',
        question: 'What color is an apple?',
        targetObject: 'apple',
        options: [
          { id: 'a', value: 'Red', icon: 'palette', color: '#EF4444', correct: true },
          { id: 'b', value: 'Blue', icon: 'palette', color: '#3B82F6', correct: false },
          { id: 'c', value: 'Yellow', icon: 'palette', color: '#F59E0B', correct: false },
        ],
      },
      {
        id: '2',
        type: 'color-match',
        question: 'What color is the sky?',
        targetObject: 'sky',
        options: [
          { id: 'a', value: 'Green', icon: 'palette', color: '#10B981', correct: false },
          { id: 'b', value: 'Blue', icon: 'palette', color: '#3B82F6', correct: true },
          { id: 'c', value: 'Purple', icon: 'palette', color: '#8B5CF6', correct: false },
        ],
      },
    ],
    // Default questions for other challenges
    'default': [
      {
        id: '1',
        type: 'multiple-choice',
        question: 'Select the correct answer:',
        options: [
          { id: 'a', value: 'Option A', icon: 'check-circle', correct: true },
          { id: 'b', value: 'Option B', icon: 'times-circle', correct: false },
          { id: 'c', value: 'Option C', icon: 'times-circle', correct: false },
        ],
      },
      {
        id: '2',
        type: 'multiple-choice',
        question: 'Choose the right one:',
        options: [
          { id: 'a', value: 'Choice 1', icon: 'times-circle', correct: false },
          { id: 'b', value: 'Choice 2', icon: 'check-circle', correct: true },
          { id: 'c', value: 'Choice 3', icon: 'times-circle', correct: false },
        ],
      },
    ],
  };

  return questionsMap[challengeId] || questionsMap['default'];
};

// Stars component for number counting
const Stars = ({ count }) => {
  return (
    <View style={styles.starsContainer}>
      {[...Array(count)].map((_, index) => (
        <Animatable.View
          key={index}
          animation="bounceIn"
          delay={index * 200}
          duration={600}
        >
          <FontAwesome5 name="star" size={40} color="#FFD700" style={styles.star} />
        </Animatable.View>
      ))}
    </View>
  );
};

// Option button component
const OptionButton = ({ option, selected, correct, incorrect, onSelect }) => {
  // Determine button style based on state
  const buttonStyle = [
    styles.optionButton,
    selected && styles.selectedOption,
    selected && correct && styles.correctOption,
    selected && incorrect && styles.incorrectOption,
  ];
  
  // Determine icon container style
  const iconContainerStyle = [
    styles.optionIconContainer,
    selected && correct && styles.correctIconContainer,
    selected && incorrect && styles.incorrectIconContainer,
  ];
  
  // Text style
  const textStyle = [
    styles.optionText,
    selected && correct && styles.correctText,
    selected && incorrect && styles.incorrectText,
  ];
  
  // Set color based on option (for color challenges)
  const iconColor = option.color || '#333';
  
  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={() => onSelect(option)}
      disabled={selected}
    >
      <View style={iconContainerStyle}>
        <FontAwesome5 name={option.icon} size={24} color={iconColor} />
      </View>
      <Text style={textStyle}>{option.value}</Text>
    </TouchableOpacity>
  );
};

// Animated background
const AnimatedBackground = () => {
  return (
    <View style={styles.backgroundContainer}>
      {/* Top left cloud */}
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        duration={4000}
        style={[styles.backgroundCloud, { top: '5%', left: '10%' }]}
      />
      
      {/* Top right cloud */}
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        duration={5000}
        style={[styles.backgroundCloud, { top: '15%', right: '10%' }]}
      />
      
      {/* Bottom left cloud */}
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        duration={6000}
        style={[styles.backgroundCloud, { bottom: '20%', left: '15%' }]}
      />
      
      {/* Bottom right cloud */}
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        duration={4500}
        style={[styles.backgroundCloud, { bottom: '10%', right: '15%' }]}
      />
    </View>
  );
};

// Render question based on type
const QuestionRenderer = ({ question, selectedOption, handleSelectOption }) => {
  switch (question.type) {
    case 'letter-match':
      return (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
          
          {question.mainLetter && (
            <Animatable.View animation="bounceIn" style={styles.mainLetterContainer}>
              <Text style={styles.mainLetter}>{question.mainLetter}</Text>
            </Animatable.View>
          )}
          
          <View style={styles.optionsContainer}>
            {question.options.map((option) => (
              <OptionButton
                key={option.id}
                option={option}
                selected={selectedOption === option.id}
                correct={selectedOption === option.id && option.correct}
                incorrect={selectedOption === option.id && !option.correct}
                onSelect={() => handleSelectOption(option)}
              />
            ))}
          </View>
        </View>
      );
      
    case 'number-match':
      return (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
          
          <Stars count={question.stars} />
          
          <View style={styles.optionsContainer}>
            {question.options.map((option) => (
              <OptionButton
                key={option.id}
                option={option}
                selected={selectedOption === option.id}
                correct={selectedOption === option.id && option.correct}
                incorrect={selectedOption === option.id && !option.correct}
                onSelect={() => handleSelectOption(option)}
              />
            ))}
          </View>
        </View>
      );
      
    case 'color-match':
      return (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
          
          <Animatable.View animation="bounceIn" style={styles.targetObjectContainer}>
            <Text style={styles.targetObject}>{question.targetObject}</Text>
          </Animatable.View>
          
          <View style={styles.optionsContainer}>
            {question.options.map((option) => (
              <OptionButton
                key={option.id}
                option={option}
                selected={selectedOption === option.id}
                correct={selectedOption === option.id && option.correct}
                incorrect={selectedOption === option.id && !option.correct}
                onSelect={() => handleSelectOption(option)}
              />
            ))}
          </View>
        </View>
      );
      
    default:
      return (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
          
          <View style={styles.optionsContainer}>
            {question.options.map((option) => (
              <OptionButton
                key={option.id}
                option={option}
                selected={selectedOption === option.id}
                correct={selectedOption === option.id && option.correct}
                incorrect={selectedOption === option.id && !option.correct}
                onSelect={() => handleSelectOption(option)}
              />
            ))}
          </View>
        </View>
      );
  }
};

const ChallengeDetailScreen = ({ route, navigation }) => {
  const { challengeId } = route.params;
  const { getChallengeById, completeChallenge } = useContext(ChallengeContext);
  
  // Get challenge data
  const challenge = getChallengeById(challengeId);
  
  // State for current question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  
  // Animation ref for success
  const successAnimRef = useRef(null);
  
  // Load questions for this challenge
  useEffect(() => {
    if (challenge) {
      const mockQuestions = getMockQuestionsForChallenge(challenge.id);
      setQuestions(mockQuestions);
    }
  }, [challenge]);
  
  // Current question
  const currentQuestion = questions[currentQuestionIndex];
  
  // Handler for selecting an option
  const handleSelectOption = (option) => {
    setSelectedOption(option.id);
    setIsCorrect(option.correct);
    
    if (option.correct) {
      // Increment score
      setScore(prevScore => prevScore + 1);
      
      // Wait a bit then move to next question or complete
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          // Move to next question
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOption(null);
        } else {
          // Challenge completed
          setIsCompleted(true);
          // Mark challenge as completed in context
          completeChallenge(challengeId, 100);
          // Start success animation
          if (successAnimRef.current) {
            successAnimRef.current.play();
          }
        }
      }, 1000);
    }
  };
  
  // Handler for try again
  const handleTryAgain = () => {
    setSelectedOption(null);
  };
  
  // Handler for back button
  const handleBack = () => {
    navigation.goBack();
  };
  
  if (!challenge) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <FontAwesome5 name="arrow-left" size={18} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Challenge</Text>
          <View style={{ width: 40 }} />
        </View>
        <Text style={styles.errorText}>Challenge not found</Text>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Animated background */}
      <AnimatedBackground />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FontAwesome5 name="arrow-left" size={18} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{challenge.title}</Text>
        <View style={{ width: 40 }} />
      </View>
      
      {!isCompleted ? (
        <ScrollView 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Challenge info */}
          <View style={styles.challengeInfoContainer}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{challenge.category}</Text>
            </View>
            <Text style={styles.challengeDescription}>{challenge.description}</Text>
          </View>
          
          {/* Progress indicator */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentQuestionIndex) / questions.length) * 100}%` }
                ]} 
              />
            </View>
          </View>
          
          {/* Current question */}
          {currentQuestion && (
            <Animatable.View
              animation="fadeIn"
              duration={600}
              style={styles.questionCard}
            >
              <QuestionRenderer
                question={currentQuestion}
                selectedOption={selectedOption}
                handleSelectOption={handleSelectOption}
              />
              
              {selectedOption && !isCorrect && (
                <TouchableOpacity 
                  style={styles.tryAgainButton} 
                  onPress={handleTryAgain}
                >
                  <Text style={styles.tryAgainText}>Try Again</Text>
                </TouchableOpacity>
              )}
            </Animatable.View>
          )}
        </ScrollView>
      ) : (
        // Success view
        <Animatable.View
          ref={successAnimRef}
          animation="fadeIn"
          duration={800}
          style={styles.successContainer}
        >
          <Animatable.View animation="bounceIn" duration={1000} style={styles.trophyContainer}>
            <FontAwesome5 name="trophy" size={80} color={COLORS.accent1} />
            <Animatable.View animation="fadeIn" delay={600} duration={800} style={styles.confettiLeft}>
              <FontAwesome5 name="star" size={18} color={COLORS.accent6} />
            </Animatable.View>
            <Animatable.View animation="fadeIn" delay={800} duration={800} style={styles.confettiRight}>
              <FontAwesome5 name="star" size={18} color={COLORS.accent3} />
            </Animatable.View>
            <Animatable.View animation="fadeIn" delay={1000} duration={800} style={styles.confettiTop}>
              <FontAwesome5 name="star" size={18} color={COLORS.primary} />
            </Animatable.View>
          </Animatable.View>
          
          <Text style={styles.successTitle}>Great job!</Text>
          <Text style={styles.successText}>You completed the challenge!</Text>
          
          <Animatable.View animation="fadeIn" delay={1200} duration={800}>
            <Text style={styles.rewardText}>You earned:</Text>
            <Animatable.View animation="zoomIn" delay={1500} duration={800} style={styles.rewardBadge}>
              <FontAwesome5 name="medal" size={30} color="#FFF" />
              <Text style={styles.rewardBadgeText}>{challenge.reward}</Text>
            </Animatable.View>
          </Animatable.View>
          
          <TouchableOpacity 
            style={styles.doneButton} 
            onPress={handleBack}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </Animatable.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  backgroundCloud: {
    position: 'absolute',
    width: 150,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: -1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: SIZES.spacing.l,
    paddingBottom: SIZES.spacing.m,
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
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  contentContainer: {
    paddingHorizontal: SIZES.screenPadding,
    paddingBottom: SIZES.spacing.xxl,
  },
  challengeInfoContainer: {
    marginVertical: SIZES.spacing.m,
  },
  categoryBadge: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: SIZES.spacing.m,
    paddingVertical: SIZES.spacing.xs,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: SIZES.spacing.s,
  },
  categoryText: {
    color: COLORS.primary,
    fontSize: SIZES.font,
    fontWeight: '600',
  },
  challengeDescription: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 24,
  },
  progressContainer: {
    marginVertical: SIZES.spacing.m,
  },
  progressText: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
    marginBottom: SIZES.spacing.xs,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  questionCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.spacing.l,
    ...SHADOWS.medium,
    marginBottom: SIZES.spacing.l,
  },
  questionContainer: {
    alignItems: 'center',
  },
  questionText: {
    fontSize: SIZES.large,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.spacing.l,
  },
  mainLetterContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: COLORS.accent1 + '30',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.spacing.l,
  },
  mainLetter: {
    fontSize: 50,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: SIZES.spacing.l,
  },
  star: {
    marginHorizontal: 5,
  },
  targetObjectContainer: {
    padding: SIZES.spacing.m,
    borderRadius: 20,
    backgroundColor: COLORS.accent3 + '30',
    marginBottom: SIZES.spacing.l,
  },
  targetObject: {
    fontSize: SIZES.xlarge,
    fontWeight: '600',
    color: COLORS.text,
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SIZES.spacing.m,
    borderRadius: SIZES.cardRadius,
    marginBottom: SIZES.spacing.m,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.05)',
    ...SHADOWS.small,
  },
  selectedOption: {
    borderColor: COLORS.primary,
  },
  correctOption: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.success + '20',
  },
  incorrectOption: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.error + '20',
  },
  optionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.spacing.m,
  },
  correctIconContainer: {
    backgroundColor: COLORS.success + '30',
  },
  incorrectIconContainer: {
    backgroundColor: COLORS.error + '30',
  },
  optionText: {
    fontSize: SIZES.medium,
    fontWeight: '500',
    color: COLORS.text,
    flex: 1,
  },
  correctText: {
    color: COLORS.success,
    fontWeight: 'bold',
  },
  incorrectText: {
    color: COLORS.error,
    fontWeight: 'bold',
  },
  tryAgainButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.spacing.m,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: SIZES.spacing.m,
    ...SHADOWS.small,
  },
  tryAgainText: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.card,
  },
  errorText: {
    fontSize: SIZES.large,
    fontWeight: '500',
    color: COLORS.error,
    textAlign: 'center',
    marginTop: SIZES.spacing.xxl,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.screenPadding,
  },
  trophyContainer: {
    marginBottom: SIZES.spacing.l,
    position: 'relative',
  },
  confettiLeft: {
    position: 'absolute',
    top: -10,
    left: -15,
  },
  confettiRight: {
    position: 'absolute',
    top: 10,
    right: -15,
  },
  confettiTop: {
    position: 'absolute',
    top: -20,
    right: 20,
  },
  successTitle: {
    fontSize: SIZES.xxxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.spacing.s,
  },
  successText: {
    fontSize: SIZES.large,
    color: COLORS.text,
    marginBottom: SIZES.spacing.l,
  },
  rewardText: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    marginBottom: SIZES.spacing.m,
    textAlign: 'center',
  },
  rewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent1,
    paddingHorizontal: SIZES.spacing.l,
    paddingVertical: SIZES.spacing.m,
    borderRadius: 25,
    ...SHADOWS.medium,
    marginBottom: SIZES.spacing.xl,
  },
  rewardBadgeText: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: SIZES.spacing.m,
  },
  doneButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.spacing.xl,
    paddingVertical: SIZES.spacing.m,
    borderRadius: 25,
    ...SHADOWS.medium,
  },
  doneButtonText: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default ChallengeDetailScreen; 