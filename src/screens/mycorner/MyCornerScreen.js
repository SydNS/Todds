import {
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons
} from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

const MyCornerScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Mock data
  const userInfo = {
    name: 'Sheena',
    age: '4 years',
    grade: 'Pre-K',
    avatar: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f467.png',
  };
  
  const badges = [
    {
      id: '1',
      name: 'First Steps',
      icon: <FontAwesome5 name="baby" size={30} color={COLORS.accent1} />,
      description: 'Completed first lesson',
      earned: true,
    },
    {
      id: '2',
      name: 'Letter Master',
      icon: <FontAwesome5 name="font" size={30} color={COLORS.accent3} />,
      description: 'Learned 5 letters',
      earned: true,
    },
    {
      id: '3',
      name: 'Number Whiz',
      icon: <MaterialCommunityIcons name="numeric" size={30} color={COLORS.accent6} />,
      description: 'Counted to 10',
      earned: true,
    },
    {
      id: '4',
      name: 'Story Explorer',
      icon: <FontAwesome5 name="book" size={30} color={COLORS.storyWorld.primary} />,
      description: 'Read 3 stories',
      earned: false,
    },
  ];
  
  const progressItems = [
    {
      id: '1',
      title: 'Letters',
      completed: 5,
      total: 26,
      color: COLORS.phonicsPlayground.primary,
    },
    {
      id: '2',
      title: 'Numbers',
      completed: 7,
      total: 10,
      color: COLORS.accent2,
    },
    {
      id: '3',
      title: 'Colors',
      completed: 4,
      total: 8,
      color: COLORS.accent6,
    },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Background pattern for light/dark mode
  const lightBackgroundPattern = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiPjwvcmVjdD4KPC9zdmc+';
  const darkBackgroundPattern = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMTIxMjEyIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxYTFhMWEiPjwvcmVjdD4KPC9zdmc+';

  return (
    <SafeAreaView style={[
      styles.container, 
      isDarkMode && { backgroundColor: '#121212' }
    ]}>
      <ImageBackground
        source={{ uri: isDarkMode ? darkBackgroundPattern : lightBackgroundPattern }}
        style={styles.backgroundPattern}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Animatable.View 
            animation="fadeIn" 
            duration={800} 
            style={styles.header}
          >
            <Text style={[
              styles.title, 
              isDarkMode && { color: COLORS.background }
            ]}>
              My Corner
            </Text>
            <Animatable.View animation="pulse" iterationCount="infinite" duration={2000}>
              <FontAwesome5 
                name="crown" 
                size={22} 
                color={isDarkMode ? '#FDD835' : COLORS.accent1} 
              />
            </Animatable.View>
          </Animatable.View>
          
          {/* Profile Section */}
          <Animatable.View 
            animation="fadeInUp" 
            duration={800} 
            delay={200}
            style={[
              styles.profileCard,
              isDarkMode && { backgroundColor: '#2A2A2A' }
            ]}
          >
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: userInfo.avatar }} 
                style={styles.avatar}
                resizeMode="cover"
              />
              <View style={styles.avatarEditButton}>
                <Ionicons name="pencil" size={16} color={COLORS.background} />
              </View>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={[
                styles.profileName,
                isDarkMode && { color: COLORS.background }
              ]}>
                {userInfo.name}
              </Text>
              <View style={styles.profileDetails}>
                <View style={styles.profileDetailItem}>
                  <FontAwesome5 name="birthday-cake" size={12} color={isDarkMode ? '#AAA' : COLORS.textLight} style={styles.detailIcon} />
                  <Text style={styles.profileDetail}>{userInfo.age}</Text>
                </View>
                <View style={styles.profileDetailItem}>
                  <FontAwesome5 name="graduation-cap" size={12} color={isDarkMode ? '#AAA' : COLORS.textLight} style={styles.detailIcon} />
                  <Text style={styles.profileDetail}>{userInfo.grade}</Text>
                </View>
              </View>
            </View>
          </Animatable.View>
          
          {/* Badges Section */}
          <Animatable.View 
            animation="fadeInUp" 
            duration={800} 
            delay={400}
            style={[
              styles.sectionCard,
              isDarkMode && { backgroundColor: '#2A2A2A' }
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={[
                styles.sectionTitle,
                isDarkMode && { color: COLORS.background }
              ]}>
                My Badges
              </Text>
              <FontAwesome5 name="medal" size={20} color={isDarkMode ? '#FFD54F' : COLORS.accent1} />
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.badgesContainer}
            >
              {badges.map((badge) => (
                <Animatable.View 
                  key={badge.id}
                  animation={badge.earned ? "pulse" : undefined}
                  iterationCount={badge.earned ? "infinite" : 1}
                  duration={2000}
                  style={[
                    styles.badgeItem,
                    !badge.earned && styles.badgeItemLocked
                  ]}
                >
                  <View style={[
                    styles.badgeIcon,
                    isDarkMode && { backgroundColor: '#333' }
                  ]}>
                    {badge.icon}
                    {!badge.earned && (
                      <View style={styles.badgeLock}>
                        <FontAwesome5 name="lock" size={12} color={COLORS.background} />
                      </View>
                    )}
                  </View>
                  <Text style={[
                    styles.badgeName,
                    isDarkMode && { color: COLORS.background }
                  ]}>
                    {badge.name}
                  </Text>
                  <Text style={styles.badgeDescription}>{badge.description}</Text>
                </Animatable.View>
              ))}
            </ScrollView>
          </Animatable.View>
          
          {/* Progress Section */}
          <Animatable.View 
            animation="fadeInUp" 
            duration={800} 
            delay={600}
            style={[
              styles.sectionCard,
              isDarkMode && { backgroundColor: '#2A2A2A' }
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={[
                styles.sectionTitle,
                isDarkMode && { color: COLORS.background }
              ]}>
                My Progress
              </Text>
              <Ionicons name="stats-chart" size={20} color={isDarkMode ? '#81D4FA' : COLORS.accent2} />
            </View>
            
            {progressItems.map((item) => (
              <View key={item.id} style={styles.progressItem}>
                <View style={styles.progressInfo}>
                  <Text style={[
                    styles.progressTitle,
                    isDarkMode && { color: COLORS.background }
                  ]}>
                    {item.title}
                  </Text>
                  <Text style={styles.progressText}>
                    {item.completed} of {item.total} completed
                  </Text>
                </View>
                
                <View style={[
                  styles.progressBarContainer,
                  isDarkMode && { backgroundColor: '#333' }
                ]}>
                  <Animatable.View 
                    animation="fadeInLeft"
                    duration={1000}
                    delay={1000 + parseInt(item.id) * 300}
                    style={[
                      styles.progressBar, 
                      { 
                        width: `${(item.completed / item.total) * 100}%`,
                        backgroundColor: item.color
                      }
                    ]} 
                  />
                </View>

                {/* Progress stars */}
                <View style={styles.starsContainer}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FontAwesome5 
                      key={index}
                      name="star" 
                      size={14} 
                      color={index < Math.round((item.completed / item.total) * 5) ? item.color : '#e0e0e0'} 
                      style={styles.starIcon}
                    />
                  ))}
                </View>
              </View>
            ))}
          </Animatable.View>
          
          {/* Settings Section */}
          <Animatable.View 
            animation="fadeInUp" 
            duration={800} 
            delay={800}
            style={[
              styles.sectionCard,
              isDarkMode && { backgroundColor: '#2A2A2A' }
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={[
                styles.sectionTitle,
                isDarkMode && { color: COLORS.background }
              ]}>
                Settings
              </Text>
              <Ionicons name="settings" size={20} color={isDarkMode ? '#81C784' : COLORS.accent3} />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLabelContainer}>
                <Ionicons 
                  name={isDarkMode ? "moon" : "sunny"} 
                  size={22} 
                  color={isDarkMode ? '#FDD835' : COLORS.accent1} 
                  style={styles.settingIcon}
                />
                <Text style={[
                  styles.settingLabel,
                  isDarkMode && { color: COLORS.background }
                ]}>
                  Dark Mode
                </Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: COLORS.card, true: COLORS.accent2 }}
                thumbColor={isDarkMode ? COLORS.accent2 : COLORS.background}
              />
            </View>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLabelContainer}>
                <Ionicons 
                  name="volume-high" 
                  size={22} 
                  color={isDarkMode ? '#81D4FA' : COLORS.accent2} 
                  style={styles.settingIcon}
                />
                <Text style={[
                  styles.settingLabel,
                  isDarkMode && { color: COLORS.background }
                ]}>
                  Sound Effects
                </Text>
              </View>
              <Ionicons 
                name="chevron-forward" 
                size={22} 
                color={isDarkMode ? COLORS.background : COLORS.text} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLabelContainer}>
                <Ionicons 
                  name="lock-closed" 
                  size={22} 
                  color={isDarkMode ? '#F48FB1' : COLORS.accent6} 
                  style={styles.settingIcon}
                />
                <Text style={[
                  styles.settingLabel,
                  isDarkMode && { color: COLORS.background }
                ]}>
                  Parental Controls
                </Text>
              </View>
              <Ionicons 
                name="chevron-forward" 
                size={22} 
                color={isDarkMode ? COLORS.background : COLORS.text} 
              />
            </TouchableOpacity>
          </Animatable.View>
        </ScrollView>
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
  scrollContent: {
    paddingBottom: SIZES.spacing.xxl,
  },
  header: {
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: SIZES.spacing.xl,
    paddingBottom: SIZES.spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    margin: SIZES.spacing.m,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.spacing.l,
    ...SHADOWS.medium,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.accent3,
  },
  avatarEditButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  profileInfo: {
    marginLeft: SIZES.spacing.l,
    flex: 1,
  },
  profileName: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.spacing.s,
  },
  profileDetails: {
    marginTop: 5,
  },
  profileDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailIcon: {
    marginRight: 8,
  },
  profileDetail: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
  },
  sectionCard: {
    backgroundColor: COLORS.card,
    margin: SIZES.spacing.m,
    marginTop: 0,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.spacing.l,
    ...SHADOWS.medium,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  badgesContainer: {
    paddingVertical: SIZES.spacing.s,
    paddingRight: SIZES.spacing.l,
  },
  badgeItem: {
    alignItems: 'center',
    marginRight: SIZES.spacing.l,
    width: 100,
  },
  badgeItemLocked: {
    opacity: 0.6,
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.spacing.s,
    ...SHADOWS.small,
    position: 'relative',
  },
  badgeLock: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.textLight,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeName: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 2,
  },
  badgeDescription: {
    fontSize: SIZES.small - 2,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  progressItem: {
    marginBottom: SIZES.spacing.m,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.spacing.xs,
  },
  progressTitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
  },
  progressText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: COLORS.background,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  starIcon: {
    marginRight: 3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.spacing.m,
    paddingVertical: SIZES.spacing.xs,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 10,
  },
  settingLabel: {
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
});

export default MyCornerScreen; 