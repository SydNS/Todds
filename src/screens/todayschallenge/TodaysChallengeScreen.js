import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    Animated,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import { getTransparentOverlay } from '../../utils/backgroundUtils';

const TodaysChallengeScreen = () => {
  const [completed, setCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Options for the challenge
  const options = [
    {
      id: '1',
      icon: <FontAwesome5 name="fish" size={38} color="#333" />,
      label: 'S',
      correct: true,
    },
    {
      id: '2',
      icon: <FontAwesome5 name="bell" size={38} color="#333" />,
      label: 'B',
      correct: false,
    },
    {
      id: '3',
      icon: <Ionicons name="water" size={38} color="#333" />,
      label: 'W',
      correct: false,
    }
  ];

  const handleSelectOption = (option) => {
    setSelectedOption(option.id);
    
    if (option.correct) {
      setTimeout(() => {
        setCompleted(true);
        // Play success animation
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          })
        ]).start();
      }, 500);
    }
  };

  const handleTryAgain = () => {
    setCompleted(false);
    setSelectedOption(null);
  };

  const handleNextChallenge = () => {
    // Here you would fetch a new challenge
    setCompleted(false);
    setSelectedOption(null);
  };

  // Add a confetti-like background pattern
  const backgroundPattern = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiPjwvcmVjdD4KPC9zdmc+';

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={{ uri: backgroundPattern }}
        style={styles.backgroundPattern}
      >
        <View style={[styles.overlay, getTransparentOverlay()]}>
          <Animatable.View 
            animation="fadeIn" 
            duration={800} 
            style={styles.header}
          >
            <Text style={styles.title}>Today's Challenge</Text>
            <Animatable.View 
              animation="pulse" 
              iterationCount="infinite" 
              duration={2000}
              style={styles.starContainer}
            >
              <FontAwesome5 name="star" size={24} color={COLORS.accent1} />
            </Animatable.View>
          </Animatable.View>

          <Animatable.View 
            animation="fadeIn" 
            duration={1000} 
            delay={300}
            style={styles.challengeCard}
          >
            <View style={styles.challengeTitleContainer}>
              <FontAwesome5 name="question-circle" size={20} color={COLORS.accent2} style={styles.questionIcon} />
              <Text style={styles.challengeTitle}>
                Find the letter that makes the "sss" sound
              </Text>
            </View>

            {completed ? (
              <Animated.View 
                style={[
                  styles.successContainer, 
                  { transform: [{ scale: scaleAnim }] }
                ]}
              >
                <Animatable.View animation="bounceIn" duration={1000} style={styles.trophyContainer}>
                  <FontAwesome5 name="trophy" size={70} color={COLORS.accent1} />
                  <Animatable.View animation="fadeIn" delay={600} duration={800} style={styles.confettiLeft}>
                    <FontAwesome5 name="star" size={14} color={COLORS.accent6} />
                  </Animatable.View>
                  <Animatable.View animation="fadeIn" delay={800} duration={800} style={styles.confettiRight}>
                    <FontAwesome5 name="star" size={14} color={COLORS.accent3} />
                  </Animatable.View>
                  <Animatable.View animation="fadeIn" delay={1000} duration={800} style={styles.confettiTop}>
                    <FontAwesome5 name="star" size={14} color={COLORS.primary} />
                  </Animatable.View>
                </Animatable.View>
                <Text style={styles.successText}>Great job!</Text>
                <Text style={styles.successSubtext}>You found the right answer</Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity 
                    style={[styles.button, styles.nextButton]} 
                    onPress={handleNextChallenge}
                  >
                    <Text style={styles.buttonText}>Next Challenge</Text>
                    <FontAwesome5 name="arrow-right" size={14} color="#FFF" style={styles.buttonIcon} />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            ) : (
              <View style={styles.optionsContainer}>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      selectedOption === option.id && (option.correct ? styles.correctOption : styles.incorrectOption)
                    ]}
                    onPress={() => handleSelectOption(option)}
                    disabled={selectedOption !== null}
                  >
                    <Animatable.View
                      animation={selectedOption === option.id ? (option.correct ? "pulse" : "shake") : "pulse"}
                      iterationCount={selectedOption === option.id ? (option.correct ? "infinite" : 1) : "infinite"}
                      duration={1500}
                      style={styles.optionIconContainer}
                    >
                      {option.icon}
                    </Animatable.View>
                    <Text style={styles.optionLabel}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {selectedOption !== null && !completed && (
              <TouchableOpacity 
                style={styles.tryAgainButton} 
                onPress={handleTryAgain}
              >
                <Text style={styles.tryAgainText}>Try Again</Text>
              </TouchableOpacity>
            )}
          </Animatable.View>

          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Challenge 1 of 3</Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundPattern: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: SIZES.spacing.xl,
    paddingBottom: SIZES.spacing.m,
  },
  title: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  starContainer: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 213, 79, 0.2)',
  },
  challengeCard: {
    backgroundColor: COLORS.card,
    margin: SIZES.spacing.m,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.spacing.l,
    ...SHADOWS.medium,
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  challengeTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.spacing.l,
  },
  questionIcon: {
    marginRight: 10,
  },
  challengeTitle: {
    fontSize: SIZES.large,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    flex: 1,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: SIZES.spacing.l,
  },
  optionButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  optionIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  correctOption: {
    backgroundColor: COLORS.success,
  },
  incorrectOption: {
    backgroundColor: COLORS.error,
  },
  optionLabel: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    marginTop: SIZES.spacing.xs,
    color: COLORS.text,
  },
  tryAgainButton: {
    marginTop: SIZES.spacing.xl,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: 'rgba(255,138,101,0.1)',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  tryAgainText: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.spacing.xl,
  },
  trophyContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  confettiLeft: {
    position: 'absolute',
    top: 20,
    left: -20,
    transform: [{rotate: '-20deg'}],
  },
  confettiRight: {
    position: 'absolute',
    top: 10,
    right: -20,
    transform: [{rotate: '20deg'}],
  },
  confettiTop: {
    position: 'absolute',
    top: -15,
    left: 25,
    transform: [{rotate: '0deg'}],
  },
  successText: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SIZES.spacing.m,
  },
  successSubtext: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    marginTop: SIZES.spacing.xs,
    marginBottom: SIZES.spacing.l,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.spacing.m,
  },
  button: {
    paddingVertical: SIZES.spacing.s,
    paddingHorizontal: SIZES.spacing.m,
    borderRadius: 25,
    minWidth: 180,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    ...SHADOWS.small,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: SIZES.medium,
    fontWeight: '600',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  progressContainer: {
    paddingHorizontal: SIZES.screenPadding,
    paddingBottom: SIZES.spacing.xl,
  },
  progressText: {
    fontSize: SIZES.small,
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
    width: '33%',
    height: '100%',
    backgroundColor: COLORS.accent1,
  },
});

export default TodaysChallengeScreen; 