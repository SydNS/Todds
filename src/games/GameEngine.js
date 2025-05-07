import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    BackHandler,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';

// Import the context at the top level but don't use the hook yet
import ChallengeContext from '../context/ChallengeContext';

const GameEngine = ({
  children,
  title,
  gameId,
  challengeId,
  difficulty = 'Easy',
  isComplete,
  onClose,
  score = 0,
  maxScore = 100,
  showTimer = false,
  timerSeconds = 60,
  instructions = 'Play the game to win!',
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [gameState, setGameState] = useState('playing'); // playing, won, lost, paused
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const [isInstructionsVisible, setIsInstructionsVisible] = useState(true);
  
  // Only use challenges context if challengeId is provided
  const completeChallenge = challengeId ? 
    React.useContext(ChallengeContext)?.completeChallenge : 
    null;
  
  // Handle back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (modalVisible) {
        setModalVisible(false);
        return true;
      }
      if (gameState !== 'playing') {
        onClose();
        return true;
      }
      setModalVisible(true);
      return true;
    });
    
    return () => backHandler.remove();
  }, [modalVisible, gameState]);
  
  // Set up timer
  useEffect(() => {
    let interval = null;
    
    if (showTimer && gameState === 'playing' && !isInstructionsVisible && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setGameState('lost');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showTimer, gameState, isInstructionsVisible, timeLeft]);
  
  // Handle completion 
  useEffect(() => {
    if (isComplete) {
      setGameState('won');
      if (challengeId && completeChallenge) {
        completeChallenge(challengeId, score);
      }
    }
  }, [isComplete, score, challengeId, completeChallenge]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleContinue = () => {
    setIsInstructionsVisible(false);
  };
  
  const handlePlayAgain = () => {
    setGameState('playing');
    setTimeLeft(timerSeconds);
    setIsInstructionsVisible(false);
  };
  
  const handleExitGame = () => {
    onClose();
  };
  
  // Render different screens based on game state
  const renderGameOver = () => (
    <Animatable.View 
      animation="fadeIn"
      duration={800}
      style={styles.overlayContainer}
    >
      <View style={styles.gameOverCard}>
        <Animatable.View 
          animation="bounceIn" 
          duration={1000}
          style={styles.gameOverIconContainer}
        >
          <FontAwesome5 
            name={gameState === 'won' ? 'trophy' : 'frown'} 
            size={50} 
            color={gameState === 'won' ? COLORS.accent1 : COLORS.accent4} 
          />
        </Animatable.View>
        
        <Text style={styles.gameOverTitle}>
          {gameState === 'won' ? 'Congratulations!' : 'Game Over!'}
        </Text>
        
        <Text style={styles.gameOverText}>
          {gameState === 'won' 
            ? 'You completed the game successfully!' 
            : 'Don\'t worry, you can try again!'}
        </Text>
        
        {gameState === 'won' && (
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Score: {score}/{maxScore}</Text>
            <View style={styles.scoreBar}>
              <View 
                style={[
                  styles.scoreBarFill, 
                  { width: `${(score / maxScore) * 100}%` }
                ]}
              />
            </View>
          </View>
        )}
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, styles.playAgainButton]} 
            onPress={handlePlayAgain}
          >
            <FontAwesome5 name="redo" size={16} color="#FFF" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.exitButton]} 
            onPress={handleExitGame}
          >
            <FontAwesome5 name="times" size={16} color="#FFF" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Exit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );
  
  // Render instructions overlay
  const renderInstructions = () => (
    <Animatable.View 
      animation="fadeIn"
      duration={800}
      style={styles.overlayContainer}
    >
      <View style={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>How to Play</Text>
        
        <Text style={styles.instructionsText}>{instructions}</Text>
        
        <View style={styles.difficultyContainer}>
          <Text style={styles.difficultyLabel}>Difficulty:</Text>
          <View 
            style={[
              styles.difficultyBadge, 
              { 
                backgroundColor: 
                  difficulty === 'Easy' ? COLORS.accent1 : 
                  difficulty === 'Medium' ? COLORS.accent2 : 
                  COLORS.accent4 
              }
            ]}
          >
            <Text style={styles.difficultyText}>{difficulty}</Text>
          </View>
        </View>
        
        {showTimer && (
          <View style={styles.timerInfoContainer}>
            <FontAwesome5 name="clock" size={18} color={COLORS.textLight} />
            <Text style={styles.timerInfoText}>Time limit: {formatTime(timerSeconds)}</Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Start Playing</Text>
          <FontAwesome5 name="arrow-right" size={14} color="#FFF" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
  
  // Render pause menu
  const renderPauseMenu = () => (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.pauseCard}>
          <Text style={styles.pauseTitle}>Game Paused</Text>
          
          <View style={styles.pauseButtonContainer}>
            <TouchableOpacity 
              style={styles.pauseButton}
              onPress={() => setModalVisible(false)}
            >
              <FontAwesome5 name="play" size={16} color={COLORS.text} />
              <Text style={styles.pauseButtonText}>Resume</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.pauseButton}
              onPress={() => {
                setModalVisible(false);
                setIsInstructionsVisible(true);
              }}
            >
              <FontAwesome5 name="question-circle" size={16} color={COLORS.text} />
              <Text style={styles.pauseButtonText}>Instructions</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.pauseButton}
              onPress={handleExitGame}
            >
              <FontAwesome5 name="times" size={16} color={COLORS.text} />
              <Text style={styles.pauseButtonText}>Exit Game</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Game Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {showTimer && (
            <View style={styles.timerContainer}>
              <FontAwesome5 name="clock" size={14} color={COLORS.textLight} />
              <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity 
          style={styles.pauseIconButton}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome5 name="pause" size={16} color={COLORS.text} />
        </TouchableOpacity>
      </View>
      
      {/* Game Content */}
      <View style={styles.gameContainer}>
        {children}
      </View>
      
      {/* Conditionally rendered overlays */}
      {isInstructionsVisible && renderInstructions()}
      {(gameState === 'won' || gameState === 'lost') && renderGameOver()}
      {renderPauseMenu()}
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
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.screenPadding,
    paddingVertical: SIZES.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  timerText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  pauseIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  gameContainer: {
    flex: 1,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  instructionsCard: {
    width: '90%',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.spacing.l,
    ...SHADOWS.large,
  },
  instructionsTitle: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.spacing.m,
    textAlign: 'center',
  },
  instructionsText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 24,
    marginBottom: SIZES.spacing.l,
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.m,
  },
  difficultyLabel: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
    marginRight: SIZES.spacing.s,
  },
  difficultyBadge: {
    paddingHorizontal: SIZES.spacing.s,
    paddingVertical: 3,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.card,
  },
  timerInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.l,
  },
  timerInfoText: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
    marginLeft: SIZES.spacing.s,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.spacing.m,
    borderRadius: 25,
    ...SHADOWS.medium,
  },
  continueButtonText: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: SIZES.spacing.s,
  },
  gameOverCard: {
    width: '90%',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.spacing.l,
    ...SHADOWS.large,
    alignItems: 'center',
  },
  gameOverIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.spacing.l,
  },
  gameOverTitle: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.spacing.s,
    textAlign: 'center',
  },
  gameOverText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: SIZES.spacing.l,
    textAlign: 'center',
  },
  scoreContainer: {
    width: '100%',
    marginBottom: SIZES.spacing.l,
  },
  scoreText: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.spacing.xs,
  },
  scoreBar: {
    height: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.spacing.m,
    borderRadius: 25,
    ...SHADOWS.medium,
    flex: 0.48,
  },
  playAgainButton: {
    backgroundColor: COLORS.primary,
  },
  exitButton: {
    backgroundColor: COLORS.error,
  },
  buttonText: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: '#FFF',
  },
  buttonIcon: {
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseCard: {
    width: '80%',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.spacing.l,
    ...SHADOWS.large,
  },
  pauseTitle: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.spacing.l,
    textAlign: 'center',
  },
  pauseButtonContainer: {
    width: '100%',
  },
  pauseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  pauseButtonText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginLeft: SIZES.spacing.m,
  },
});

export default GameEngine; 