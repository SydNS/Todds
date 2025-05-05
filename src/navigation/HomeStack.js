import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

// Import screens
import HomeScreen from '../screens/home/HomeScreen';

// Placeholder screens (will be implemented later)
const ActivitiesScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Activities Screen</Text>
  </View>
);

const RewardsScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Rewards Screen</Text>
  </View>
);

const ProgressScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Progress Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Profile Screen</Text>
  </View>
);

// Create tab navigator
const Tab = createBottomTabNavigator();

// Tab icon component (placeholder for now)
const TabIcon = ({ name, focused }) => {
  return (
    <View style={styles.tabIconContainer}>
      <View 
        style={[
          styles.tabIcon, 
          { backgroundColor: focused ? COLORS.primary : COLORS.card }
        ]} 
      />
      <Text 
        style={[
          styles.tabLabel, 
          { color: focused ? COLORS.primary : COLORS.textLight }
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
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Home" focused={focused} />,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen 
        name="Activities" 
        component={ActivitiesScreen} 
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Activities" focused={focused} />,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen 
        name="Rewards" 
        component={RewardsScreen} 
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Rewards" focused={focused} />,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen 
        name="Progress" 
        component={ProgressScreen} 
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Progress" focused={focused} />,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Profile" focused={focused} />,
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.card,
    paddingTop: 5,
    paddingBottom: 10,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: SIZES.small,
    fontWeight: '500',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  placeholderText: {
    fontSize: SIZES.large,
    color: COLORS.textLight,
  },
});

export default HomeStack; 