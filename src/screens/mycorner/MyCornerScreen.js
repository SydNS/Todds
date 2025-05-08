import { FontAwesome5 } from '@expo/vector-icons';
import React, { useContext } from 'react';
import {
  ImageBackground,
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
import { useAuth } from '../../context/AuthContext';
import ChallengeContext from '../../context/ChallengeContext';
import { getTransparentOverlay, useRandomBackground } from '../../utils/backgroundUtils';

const MyCornerScreen = ({ navigation }) => {
  const { userInfo, childInfo } = useAuth();
  const challengeContext = useContext(ChallengeContext);
  const backgroundImage = useRandomBackground();
  
  // Get achievements and challenges safely
  const achievements = challengeContext?.achievements || [];
  const getChallengesWithStatus = challengeContext?.getChallengesWithStatus || (() => []);
  
  // Get all challenges with their completion status
  const challenges = getChallengesWithStatus();
  
  // Calculate category progress
  const calculateCategoryProgress = (category) => {
    const categoryTasks = challenges.filter(c => c.category === category);
    if (categoryTasks.length === 0) return { completed: 0, total: 0 };
    
    const completed = categoryTasks.filter(c => c.completed).length;
    return {
      completed,
      total: categoryTasks.length
    };
  };
  
  // Progress data for different categories
  const progressItems = [
    {
      id: '1',
      title: 'Letters',
      ...calculateCategoryProgress('Alphabet'),
      color: '#FF9A8B',
    },
    {
      id: '2',
      title: 'Numbers',
      ...calculateCategoryProgress('Numbers'),
      color: '#FFAC63',
    },
    {
      id: '3',
      title: 'Colors',
      ...calculateCategoryProgress('Colors'),
      color: '#5ECEF4',
    },
  ];
  
  // Sample achievements for child profile
  const childAchievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Completed first lesson',
      icon: '⭐',
      color: '#FFD56B',
    },
    {
      id: '2',
      title: 'Letter Master',
      description: 'Learned 5 letters',
      icon: 'A',
      color: '#5BA7FF',
    },
    {
      id: '3',
      title: 'Number Whiz',
      description: 'Counted to 10',
      icon: '123',
      color: '#FF7882',
    },
  ];
  
  // Navigate to challenges screen
  const handleNavigateToChallenges = () => {
    navigation.navigate('Challenges');
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
            <Text style={styles.headerTitle}>My Corner</Text>
            <View style={styles.headerIcon}>
              <FontAwesome5 name="sun" size={22} color="#FFC107" />
            </View>
          </View>
          
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Profile Card - Styled like the reference image */}
            <Animatable.View 
              animation="fadeInUp"
              duration={800}
              style={styles.childProfileCard}
            >
              <Text style={styles.childName}>{childInfo?.name || 'Child'}</Text>
              <View style={styles.childMetaRow}>
                <Text style={styles.childMeta}>{childInfo?.age || 'Age not set'}</Text>
                <Text style={styles.childMeta}>{childInfo?.grade || 'Grade not set'}</Text>
                <View style={styles.emojiContainer}>
                  <Text style={styles.emoji}>🥳</Text>
                </View>
              </View>
              
              {/* Achievements in a row */}
              <View style={styles.achievementsRow}>
                {childAchievements.map((achievement) => (
                  <View key={achievement.id} style={styles.achievementItem}>
                    <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
                      <Text style={styles.achievementIconText}>{achievement.icon}</Text>
                    </View>
                    <Text style={styles.achievementTitle}>{achievement.title}</Text>
                    <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  </View>
                ))}
              </View>
            </Animatable.View>
            
            {/* Progress Section */}
            <Animatable.View 
              animation="fadeIn"
              duration={800}
              delay={300}
              style={styles.progressSection}
            >
              <Text style={styles.sectionTitle}>My Progress</Text>
              
              {progressItems.map((item) => (
                <Animatable.View 
                  key={item.id}
                  animation="fadeInRight"
                  duration={600}
                  delay={parseInt(item.id) * 150}
                >
                  <View style={styles.progressItem}>
                    <View style={styles.progressInfo}>
                      <View style={[styles.progressEmojiContainer, { backgroundColor: item.color }]}>
                        <Text style={styles.progressEmoji}>😊</Text>
                      </View>
                      <Text style={styles.progressTitle}>{item.title}</Text>
                    </View>
                    <View style={styles.progressBarContainer}>
                      <View style={styles.progressBarBackground}>
                        <View 
                          style={[
                            styles.progressBarFill, 
                            { 
                              width: `${(item.completed / Math.max(1, item.total)) * 100}%`,
                              backgroundColor: item.color
                            }
                          ]}
                        />
                      </View>
                      <Text style={styles.progressText}>
                        {item.completed}/{item.total} completed
                      </Text>
                    </View>
                  </View>
                </Animatable.View>
              ))}
            </Animatable.View>
            
            {/* More Activities Section */}
            <Animatable.View 
              animation="fadeIn"
              duration={800}
              delay={500}
              style={styles.moreActivitiesSection}
            >
              <Text style={styles.sectionTitle}>More Activities</Text>
              
              <View style={styles.activitiesGrid}>
                <TouchableOpacity 
                  style={styles.activityCard}
                  onPress={handleNavigateToChallenges}
                >
                  <View style={[styles.activityIcon, { backgroundColor: '#FFD54F' }]}>
                    <FontAwesome5 name="calendar-check" size={24} color="#FFF" />
                  </View>
                  <Text style={styles.activityTitle}>Daily Challenges</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.activityCard}>
                  <View style={[styles.activityIcon, { backgroundColor: '#4FC3F7' }]}>
                    <FontAwesome5 name="certificate" size={24} color="#FFF" />
                  </View>
                  <Text style={styles.activityTitle}>Certificates</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.activityCard}
                  onPress={handleNavigateToChallenges}
                >
                  <View style={[styles.activityIcon, { backgroundColor: '#AED581' }]}>
                    <FontAwesome5 name="trophy" size={24} color="#FFF" />
                  </View>
                  <Text style={styles.activityTitle}>Achievements</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.activityCard}>
                  <View style={[styles.activityIcon, { backgroundColor: '#FF8A65' }]}>
                    <FontAwesome5 name="star" size={24} color="#FFF" />
                  </View>
                  <Text style={styles.activityTitle}>Rewards</Text>
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
    justifyContent: 'center',
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: SIZES.spacing.l,
    paddingBottom: SIZES.spacing.m,
  },
  headerTitle: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: SIZES.spacing.m,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingHorizontal: SIZES.screenPadding,
    paddingBottom: SIZES.spacing.xxl,
  },
  childProfileCard: {
    backgroundColor: 'rgba(173, 216, 230, 0.9)',
    borderRadius: 16,
    padding: SIZES.spacing.l,
    marginBottom: SIZES.spacing.xl,
    ...SHADOWS.medium,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  childName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 8,
  },
  childMetaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  childMeta: {
    fontSize: 16,
    color: '#4A4A4A',
    fontWeight: '600',
    marginHorizontal: 8,
  },
  emojiContainer: {
    marginLeft: 8,
  },
  emoji: {
    fontSize: 20,
  },
  achievementsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  achievementItem: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    ...SHADOWS.small,
  },
  achievementIconText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 15,
  },
  progressSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: SIZES.spacing.l,
    marginBottom: SIZES.spacing.xl,
    ...SHADOWS.medium,
  },
  progressItem: {
    marginBottom: 15,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressEmojiContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  progressEmoji: {
    fontSize: 18,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBackground: {
    flex: 1,
    height: 12,
    backgroundColor: '#F2F2F2',
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    color: '#666666',
    minWidth: 70,
    textAlign: 'right',
  },
  moreActivitiesSection: {
    marginBottom: SIZES.spacing.xl,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  activityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    ...SHADOWS.small,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A4A',
    textAlign: 'center',
  },
});

export default MyCornerScreen; 