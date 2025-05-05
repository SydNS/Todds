import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';

/**
 * CategoryCard component for displaying activity categories
 * 
 * @param {Object} props
 * @param {string} props.title - Category title
 * @param {string} props.description - Short description 
 * @param {Object} props.icon - React element for the icon
 * @param {string} props.backgroundColor - Background color for the card
 * @param {Function} props.onPress - Function to call on press
 */
const CategoryCard = ({ 
  title, 
  description, 
  icon, 
  backgroundColor = COLORS.card,
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor }]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Animatable.View 
        animation="pulse" 
        iterationCount="infinite" 
        duration={2000}
        style={styles.iconContainer}
      >
        <View style={styles.iconCircle}>
          {icon}
        </View>
      </Animatable.View>
      
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    height: 180,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.spacing.m,
    marginBottom: SIZES.spacing.m,
    ...SHADOWS.medium,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: SIZES.spacing.s,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  textContainer: {
    alignItems: 'center',
    padding: 4,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
    textAlign: 'center',
  },
  description: {
    fontSize: SIZES.small,
    color: '#555',
    textAlign: 'center',
  }
});

export default CategoryCard; 