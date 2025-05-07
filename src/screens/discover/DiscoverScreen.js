import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
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
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

const DiscoverScreen = () => {
  const discoverCategories = [
    {
      id: '1',
      title: 'Stories',
      icon: <FontAwesome5 name="book" size={24} color={COLORS.storyWorld.primary} />,
      color: COLORS.storyWorld.primary,
    },
    {
      id: '2',
      title: 'Songs',
      icon: <FontAwesome5 name="music" size={24} color={COLORS.rhymeRhythm.primary} />,
      color: COLORS.rhymeRhythm.primary,
    },
    {
      id: '3',
      title: 'Games',
      icon: <FontAwesome5 name="gamepad" size={24} color={COLORS.gameZone.primary} />,
      color: COLORS.gameZone.primary,
    },
    {
      id: '4',
      title: 'Videos',
      icon: <FontAwesome5 name="video" size={24} color={COLORS.accent5} />,
      color: COLORS.accent5,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Discover</Text>
          <Text style={styles.headerSubtitle}>Explore new content</Text>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar}>
          <FontAwesome5 name="search" size={18} color={COLORS.textLight} style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search for fun activities...</Text>
        </TouchableOpacity>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          {discoverCategories.map((category) => (
            <TouchableOpacity 
              key={category.id}
              style={[styles.categoryCard, { borderColor: category.color }]}
            >
              <View style={[styles.categoryIconContainer, { backgroundColor: category.color }]}>
                {category.icon}
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Content */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <View style={styles.featuredCard}>
            <Image 
              source={{ uri: 'https://placehold.co/600x400/FFD54F/FFF?text=Featured+Content' }}
              style={styles.featuredImage}
              resizeMode="cover"
            />
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>African Animal Adventure</Text>
              <Text style={styles.featuredDescription}>Join Kojo on a safari through Africa!</Text>
              <TouchableOpacity style={styles.playButton}>
                <FontAwesome5 name="play" size={12} color="#FFF" />
                <Text style={styles.playButtonText}>Play Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Coming Soon */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Coming Soon</Text>
          <View style={styles.comingSoonContainer}>
            <TouchableOpacity style={styles.comingSoonCard}>
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonBadgeText}>New</Text>
              </View>
              <View style={[styles.comingSoonIconContainer, { backgroundColor: COLORS.accent6 }]}>
                <FontAwesome5 name="paint-brush" size={24} color="#FFF" />
              </View>
              <Text style={styles.comingSoonTitle}>Coloring Book</Text>
              <Text style={styles.comingSoonDate}>Next Week</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.comingSoonCard}>
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonBadgeText}>New</Text>
              </View>
              <View style={[styles.comingSoonIconContainer, { backgroundColor: COLORS.accent3 }]}>
                <FontAwesome5 name="shapes" size={24} color="#FFF" />
              </View>
              <Text style={styles.comingSoonTitle}>Shape Matching</Text>
              <Text style={styles.comingSoonDate}>Coming Soon</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginBottom: SIZES.large,
  },
  headerTitle: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    marginTop: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: SIZES.borderRadius,
    padding: SIZES.medium,
    marginBottom: SIZES.xlarge,
    ...SHADOWS.small,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    color: COLORS.textLight,
    fontSize: SIZES.font,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SIZES.xlarge,
  },
  categoryCard: {
    width: '48%',
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.background,
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
    alignItems: 'center',
    borderWidth: 2,
    ...SHADOWS.small,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.accent1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.medium,
  },
  categoryTitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
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
  featuredCard: {
    borderRadius: SIZES.cardRadius,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  featuredImage: {
    width: '100%',
    height: 150,
  },
  featuredContent: {
    padding: SIZES.medium,
  },
  featuredTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  featuredDescription: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
    marginBottom: SIZES.medium,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 6,
  },
  comingSoonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comingSoonCard: {
    width: '48%',
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.background,
    padding: SIZES.medium,
    alignItems: 'center',
    position: 'relative',
    ...SHADOWS.small,
  },
  comingSoonBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.error,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  comingSoonBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  comingSoonIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.medium,
  },
  comingSoonTitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  comingSoonDate: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
});

export default DiscoverScreen; 