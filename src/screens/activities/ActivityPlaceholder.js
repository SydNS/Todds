import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

const ActivityPlaceholder = ({ navigation, route }) => {
  const { title = "Activity", color = COLORS.primary } = route.params || {};
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={18} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <Animatable.View 
          animation="fadeIn" 
          duration={600} 
          style={[styles.activityCard, { backgroundColor: color }]}
        >
          <FontAwesome5 name="tools" size={60} color="#FFF" />
          <Text style={styles.comingSoonText}>Coming Soon!</Text>
          <Text style={styles.activityDescription}>
            This activity is under development and will be available in a future update.
          </Text>
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
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: SIZES.spacing.xl,
    paddingBottom: SIZES.spacing.m,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    flexGrow: 1,
    padding: SIZES.screenPadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityCard: {
    width: '100%',
    borderRadius: SIZES.cardRadius,
    padding: SIZES.xlarge,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  comingSoonText: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 20,
    marginBottom: 12,
  },
  activityDescription: {
    fontSize: SIZES.medium,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
  }
});

export default ActivityPlaceholder; 