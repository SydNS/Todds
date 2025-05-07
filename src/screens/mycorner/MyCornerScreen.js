import { FontAwesome5 } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import {
  Image,
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
import ChallengeContext from '../../context/ChallengeContext';

const MyCornerScreen = ({ navigation }) => {
  const { userInfo } = useAuth();
  const challengeContext = useContext(ChallengeContext);
  
  // Get achievements and challenges safely
  const achievements = challengeContext?.achievements || [];
  const getChallengesWithStatus = challengeContext?.getChallengesWithStatus || (() => []);
  
  const [childName] = useState('Sheena');
  const [childAge] = useState('4 years');
  const [childClass] = useState('Pre-K');
  
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
      title: 'Alphabet',
      ...calculateCategoryProgress('Alphabet'),
      color: '#F87171',
      emoji: '😊',
    },
    {
      id: '2',
      title: 'Numbers',
      ...calculateCategoryProgress('Numbers'),
      color: '#FB923C',
      emoji: '😃',
    },
    {
      id: '3',
      title: 'Colors',
      ...calculateCategoryProgress('Colors'),
      color: '#60A5FA',
      emoji: '😄',
    },
  ];
  
  // Navigate to challenges screen
  const handleNavigateToChallenges = () => {
    navigation.navigate('Challenges');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
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
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://img.freepik.com/free-vector/cute-girl-wearing-hat_1308-128639.jpg' }}
            style={styles.profileImage}
            resizeMode="cover"
          />
          
          <View style={styles.profileBackground}>
            {/* Clouds and background */}
            <View style={[styles.cloud, styles.cloud1]} />
            <View style={[styles.cloud, styles.cloud2]} />
            <View style={[styles.cloud, styles.cloud3]} />
            <Image 
              source={{ uri: 'https://img.freepik.com/free-vector/tree-with-grass_1308-80496.jpg' }}
              style={styles.treeLeft}
              resizeMode="contain"
            />
            <Image 
              source={{ uri: 'https://img.freepik.com/free-vector/tree-with-grass_1308-80496.jpg' }}
              style={styles.treeRight}
              resizeMode="contain"
            />
          </View>
          
          {/* Child Info Card */}
          <Animatable.View 
            animation="fadeInUp"
            duration={800}
            style={styles.childInfoCard}
          >
            <Text style={styles.childName}>{childName}</Text>
            <View style={styles.childMetaRow}>
              <Text style={styles.childMeta}>{childAge}</Text>
              <View style={styles.metaDivider} />
              <Text style={styles.childMeta}>{childClass}</Text>
              <View style={styles.emojiContainer}>
                <Text style={styles.emoji}>🥳</Text>
              </View>
            </View>
            
            {/* Achievements - Updated to use context data */}
            <View style={styles.achievementsContainer}>
              {achievements.length > 0 ? (
                achievements.slice(0, 3).map((achievement) => (
                  <View key={achievement.id} style={styles.achievementItem}>
                    <View style={[styles.achievementIcon, { backgroundColor: achievement.iconBackground }]}>
                      <FontAwesome5 name={achievement.icon} size={22} color={achievement.iconColor} />
                    </View>
                    <View style={styles.achievementInfo}>
                      <Text style={styles.achievementTitle}>{achievement.title}</Text>
                      <Text style={styles.achievementSubtitle}>{achievement.description}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noAchievementText}>Complete challenges to earn badges!</Text>
              )}
            </View>
          </Animatable.View>
        </View>
        
        {/* Progress Section - Updated to use challenges data */}
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
                  <View style={styles.progressEmojiContainer}>
                    <Text style={styles.progressEmoji}>{item.emoji}</Text>
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
    justifyContent: 'center',
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: SIZES.spacing.l,
    paddingBottom: SIZES.spacing.m,
  },
  headerTitle: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginRight: SIZES.spacing.m,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingBottom: SIZES.spacing.xxl,
  },
  profileSection: {
    height: 300,
    position: 'relative',
    marginBottom: 80,
  },
  profileBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    backgroundColor: COLORS.dashboard.primary + '30',
  },
  cloud: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 30,
  },
  cloud1: {
    width: 100,
    height: 40,
    top: 40,
    left: 20,
  },
  cloud2: {
    width: 80,
    height: 30,
    top: 60,
    right: 40,
  },
  cloud3: {
    width: 60,
    height: 25,
    top: 100,
    left: 120,
  },
  treeLeft: {
    position: 'absolute',
    width: 120,
    height: 140,
    bottom: 0,
    left: 10,
    opacity: 0.8,
  },
  treeRight: {
    position: 'absolute',
    width: 120,
    height: 140,
    bottom: 0,
    right: 10,
    opacity: 0.8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFF',
    position: 'absolute',
    top: 220,
    left: SIZES.screenPadding + 20,
    zIndex: 10,
    ...SHADOWS.medium,
  },
  childInfoCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.spacing.l,
    marginHorizontal: SIZES.screenPadding,
    position: 'absolute',
    top: 250,
    left: 0,
    right: 0,
    ...SHADOWS.medium,
  },
  childName: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: 90,
    marginBottom: 5,
  },
  childMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 90,
    marginBottom: SIZES.spacing.m,
  },
  childMeta: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
  },
  metaDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.textLight,
    marginHorizontal: SIZES.spacing.xs,
  },
  emojiContainer: {
    marginLeft: SIZES.spacing.s,
    backgroundColor: COLORS.accent3 + '20',
    borderRadius: 12,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  emoji: {
    fontSize: 16,
  },
  achievementsContainer: {
    marginTop: SIZES.spacing.s,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.m,
  },
  achievementIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.spacing.m,
    ...SHADOWS.small,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  achievementSubtitle: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  noAchievementText: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: SIZES.spacing.m,
  },
  progressSection: {
    paddingHorizontal: SIZES.screenPadding,
    marginBottom: SIZES.spacing.xl,
  },
  sectionTitle: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.spacing.m,
  },
  progressItem: {
    marginBottom: SIZES.spacing.m,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.xs,
  },
  progressEmojiContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.spacing.s,
  },
  progressEmoji: {
    fontSize: 20,
  },
  progressTitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
  },
  progressBarContainer: {
    marginLeft: 44,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  moreActivitiesSection: {
    paddingHorizontal: SIZES.screenPadding,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityCard: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.spacing.m,
    marginBottom: SIZES.spacing.m,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  activityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.spacing.s,
    ...SHADOWS.small,
  },
  activityTitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
});

export default MyCornerScreen; 