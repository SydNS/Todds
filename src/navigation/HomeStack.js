import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';

// Import screens
import MyCornerScreen from '../screens/mycorner/MyCornerScreen';
import PhonicsFunScreen from '../screens/phonicsfun/PhonicsFunScreen';
import PlayLearnScreen from '../screens/playlearn/PlayLearnScreen';
import StoryWorldScreen from '../screens/storyworld/StoryWorldScreen';
import TodaysChallengeScreen from '../screens/todayschallenge/TodaysChallengeScreen';

// Create tab navigator
const Tab = createBottomTabNavigator();

// Animated tab icon component
const AnimatedTabIcon = ({ name, focused, icon, color, size = 24 }) => {
  return (
    <View style={styles.tabIconContainer}>
      <Animatable.View
        animation={focused ? 'kidBounce' : undefined}
        iterationCount={focused ? 1 : 1}
        duration={1200}
        style={[
          styles.iconBackground,
          { backgroundColor: focused ? color : 'rgba(240,240,240,0.9)' }
        ]}
      >
        {icon}
      </Animatable.View>
      <Text 
        style={[
          styles.tabLabel, 
          { 
            color: focused ? color : COLORS.textLight,
            fontWeight: focused ? '600' : '400'
          }
        ]}
      >
        {name}
      </Text>
    </View>
  );
};

const HomeStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: COLORS.primary,
      }}
      initialRouteName="PlayLearn"
    >
      <Tab.Screen 
        name="StoryWorld" 
        component={StoryWorldScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon 
              name="Story World" 
              focused={focused} 
              color={COLORS.storyWorld.primary}
              icon={<FontAwesome5 
                name="book-open" 
                size={24} 
                color={focused ? "#fff" : COLORS.storyWorld.primary} 
              />}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen 
        name="PhonicsFun" 
        component={PhonicsFunScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon 
              name="Phonics Fun" 
              focused={focused} 
              color={COLORS.phonicsPlayground.primary}
              icon={<MaterialCommunityIcons 
                name="alphabetical" 
                size={28} 
                color={focused ? "#fff" : COLORS.phonicsPlayground.primary} 
              />}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen 
        name="PlayLearn" 
        component={PlayLearnScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon 
              name="Play & Learn" 
              focused={focused} 
              color={COLORS.gameZone.primary}
              icon={<FontAwesome5 
                name="puzzle-piece" 
                size={24} 
                color={focused ? "#fff" : COLORS.gameZone.primary} 
              />}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen 
        name="TodaysChallenge" 
        component={TodaysChallengeScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon 
              name="Today's Challenge" 
              focused={focused} 
              color={COLORS.accent1}
              icon={<FontAwesome 
                name="target" 
                size={24} 
                color={focused ? "#fff" : COLORS.accent1} 
              />}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen 
        name="MyCorner" 
        component={MyCornerScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon 
              name="My Corner" 
              focused={focused} 
              color={COLORS.accent2}
              icon={<Ionicons 
                name="person" 
                size={24} 
                color={focused ? "#fff" : COLORS.accent2} 
              />}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 75,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    paddingTop: 5,
    paddingBottom: 10,
    ...SHADOWS.large,
    elevation: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBackground: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    ...SHADOWS.small,
  },
  tabLabel: {
    fontSize: SIZES.small,
    marginTop: 2,
    textAlign: 'center',
    width: 70,
  },
});

export default HomeStack; 