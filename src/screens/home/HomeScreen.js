import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

const HomeScreen = () => {
  const { userInfo, logout } = useAuth();

  // Learning categories
  const categories = [
    {
      id: '1',
      title: 'Letters',
      description: 'Learn the alphabet',
      color: COLORS.accent1,
      icon: '🔤',
    },
    {
      id: '2',
      title: 'Numbers',
      description: 'Count and learn',
      color: COLORS.accent2,
      icon: '🔢',
    },
    {
      id: '3',
      title: 'Colors',
      description: 'Explore colors',
      color: COLORS.accent3,
      icon: '🎨',
    },
    {
      id: '4',
      title: 'Animals',
      description: 'Discover animals',
      color: COLORS.primary,
      icon: '🦁',
    },
  ];

  // Recent activities
  const recentActivities = [
    {
      id: '1',
      title: 'Letter A',
      category: 'Letters',
      progress: '75%',
      color: COLORS.accent1,
    },
    {
      id: '2',
      title: 'Numbers 1-5',
      category: 'Numbers',
      progress: '50%',
      color: COLORS.accent2,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {userInfo?.name || 'Friend'}!</Text>
            <Text style={styles.welcomeText}>Ready to learn something new today?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileImageContainer}>
              <Text style={styles.profileInitial}>{(userInfo?.name || 'A').charAt(0)}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Daily Challenge */}
        <TouchableOpacity style={styles.dailyChallenge}>
          <View style={styles.dailyChallengeContent}>
            <View>
              <Text style={styles.dailyChallengeLabel}>Today's Challenge</Text>
              <Text style={styles.dailyChallengeTitle}>Match the Animals</Text>
              <Text style={styles.dailyChallengeDescription}>
                Help match animals to their habitats
              </Text>
            </View>
            <View style={styles.dailyChallengeIcon}>
              <Text style={styles.emoji}>🦁</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Categories Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Learning Categories</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={[styles.categoryCard, { backgroundColor: category.color }]}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activities Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
          {recentActivities.map((activity) => (
            <TouchableOpacity 
              key={activity.id} 
              style={styles.activityCard}
            >
              <View style={[styles.activityColorTag, { backgroundColor: activity.color }]} />
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityCategory}>{activity.category}</Text>
              </View>
              <View style={styles.activityProgress}>
                <Text style={styles.activityProgressText}>{activity.progress}</Text>
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { 
                        width: activity.progress,
                        backgroundColor: activity.color
                      }
                    ]} 
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button - For testing only */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={logout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  welcomeText: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  dailyChallenge: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.medium,
    marginBottom: SIZES.xlarge,
    ...SHADOWS.medium,
  },
  dailyChallengeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dailyChallengeLabel: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: COLORS.background,
    opacity: 0.9,
    marginBottom: 4,
  },
  dailyChallengeTitle: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: 6,
  },
  dailyChallengeDescription: {
    fontSize: SIZES.font,
    color: COLORS.background,
    opacity: 0.9,
  },
  dailyChallengeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 30,
  },
  sectionContainer: {
    marginBottom: SIZES.xlarge,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.medium,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    borderRadius: SIZES.cardRadius,
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
    ...SHADOWS.small,
  },
  categoryIcon: {
    fontSize: 30,
    marginBottom: SIZES.small,
  },
  categoryTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: SIZES.small,
    color: COLORS.background,
    opacity: 0.9,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    marginBottom: SIZES.medium,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  activityColorTag: {
    width: 8,
    height: '100%',
  },
  activityDetails: {
    flex: 1,
    padding: SIZES.medium,
  },
  activityTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  activityCategory: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  activityProgress: {
    padding: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityProgressText: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  progressBarContainer: {
    width: 60,
    height: 6,
    backgroundColor: COLORS.card,
    borderRadius: 3,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  logoutButton: {
    alignSelf: 'center',
    marginTop: SIZES.large,
    padding: SIZES.medium,
  },
  logoutText: {
    color: COLORS.error,
    fontSize: SIZES.font,
    fontWeight: '600',
  },
});

export default HomeScreen; 