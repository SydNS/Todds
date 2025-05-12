import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import { getTransparentOverlay, useRandomBackground } from '../../utils/backgroundUtils';

const DashboardScreen = ({ navigation }) => {
  const backgroundImage = useRandomBackground();

  const dashboardWidgets = [
    {
      id: '1',
      title: 'Active Services',
      value: '24',
      icon: <FontAwesome5 name="cogs" size={22} color="#FFF" />,
      backgroundColor: COLORS.govBlue.primary,
      screen: 'ActiveServices',
    },
    {
      id: '2',
      title: 'Pending Requests',
      value: '12',
      icon: <FontAwesome5 name="clock" size={22} color="#FFF" />,
      backgroundColor: COLORS.justiceRed.primary,
      screen: 'PendingRequests',
    },
    {
      id: '3',
      title: 'New Announcements',
      value: '7',
      icon: <FontAwesome5 name="bullhorn" size={22} color="#FFF" />,
      backgroundColor: COLORS.civicGreen.primary,
      screen: 'Announcements',
    },
    {
      id: '4',
      title: 'Budget Overview',
      value: '$1.2M',
      icon: <FontAwesome5 name="chart-pie" size={22} color="#FFF" />,
      backgroundColor: COLORS.legislativeYellow.primary,
      screen: 'BudgetOverview',
    },
  ];

  // Recent activities data
  const recentActivities = [
    {
      id: '1',
      title: 'Permit Application Submitted',
      timestamp: '10:30 AM Today',
      icon: 'file-alt',
      iconColor: COLORS.govBlue.primary,
    },
    {
      id: '2',
      title: 'Tax Payment Processed',
      timestamp: 'Yesterday',
      icon: 'money-bill-wave',
      iconColor: COLORS.civicGreen.primary,
    },
    {
      id: '3',
      title: 'New Policy Registration',
      timestamp: '2 days ago',
      icon: 'clipboard-list',
      iconColor: COLORS.publicServicesOrange.primary,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={[styles.overlay, getTransparentOverlay()]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <FontAwesome5 name="arrow-left" size={18} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <TouchableOpacity style={styles.optionsButton}>
              <FontAwesome5 name="ellipsis-v" size={18} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {/* Summary Widgets */}
            <View style={styles.widgetsContainer}>
              {dashboardWidgets.map((widget, index) => (
                <Animatable.View 
                  key={widget.id}
                  animation="fadeInUp"
                  delay={300 + (index * 100)}
                  duration={500}
                >
                  <TouchableOpacity 
                    style={[styles.widget, { backgroundColor: widget.backgroundColor }]}
                    onPress={() => navigation.navigate(widget.screen)}
                  >
                    <View style={styles.widgetIconContainer}>
                      {widget.icon}
                    </View>
                    <Text style={styles.widgetValue}>{widget.value}</Text>
                    <Text style={styles.widgetTitle}>{widget.title}</Text>
                  </TouchableOpacity>
                </Animatable.View>
              ))}
            </View>
            
            {/* Recent Activities Section */}
            <Animatable.View
              animation="fadeInUp"
              delay={700}
              duration={500}
              style={styles.activitiesContainer}
            >
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Activities</Text>
                <TouchableOpacity>
                  <Text style={styles.sectionAction}>View All</Text>
                </TouchableOpacity>
              </View>

              {recentActivities.map((activity) => (
                <View key={activity.id} style={styles.activityItem}>
                  <View style={[styles.activityIconContainer, { backgroundColor: activity.iconColor }]}>
                    <FontAwesome5 name={activity.icon} size={16} color="#FFF" />
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>{activity.title}</Text>
                    <Text style={styles.activityTimestamp}>{activity.timestamp}</Text>
                  </View>
                  <FontAwesome5 name="chevron-right" size={14} color={COLORS.textLight} />
                </View>
              ))}
            </Animatable.View>

            {/* Quick Actions Section */}
            <Animatable.View
              animation="fadeInUp"
              delay={900}
              duration={500}
              style={styles.quickActionsContainer}
            >
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.quickActionsGrid}>
                <TouchableOpacity style={styles.quickActionButton}>
                  <View style={[styles.quickActionIcon, { backgroundColor: COLORS.civicGreen.primary }]}>
                    <FontAwesome5 name="file-upload" size={20} color="#FFF" />
                  </View>
                  <Text style={styles.quickActionText}>Upload Documents</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickActionButton}>
                  <View style={[styles.quickActionIcon, { backgroundColor: COLORS.justiceRed.primary }]}>
                    <FontAwesome5 name="calendar-alt" size={20} color="#FFF" />
                  </View>
                  <Text style={styles.quickActionText}>Schedule Meeting</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickActionButton}>
                  <View style={[styles.quickActionIcon, { backgroundColor: COLORS.govBlue.primary }]}>
                    <FontAwesome5 name="comment-alt" size={20} color="#FFF" />
                  </View>
                  <Text style={styles.quickActionText}>Chat Support</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickActionButton}>
                  <View style={[styles.quickActionIcon, { backgroundColor: COLORS.legislativeYellow.primary }]}>
                    <FontAwesome5 name="search" size={20} color="#FFF" />
                  </View>
                  <Text style={styles.quickActionText}>Find Services</Text>
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
  },
  overlay: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.spacing.m,
    paddingTop: SIZES.spacing.l,
    paddingBottom: SIZES.spacing.m,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  optionsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: SIZES.spacing.xxl,
  },
  widgetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.spacing.m,
  },
  widget: {
    width: (SIZES.width - (SIZES.spacing.m * 2) - SIZES.spacing.m) / 2,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.spacing.m,
    marginBottom: SIZES.spacing.m,
    ...SHADOWS.medium,
  },
  widgetIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.spacing.s,
  },
  widgetValue: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  widgetTitle: {
    fontSize: SIZES.small,
    color: 'rgba(255,255,255,0.8)',
  },
  activitiesContainer: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    marginHorizontal: SIZES.spacing.m,
    padding: SIZES.spacing.m,
    marginBottom: SIZES.spacing.l,
    ...SHADOWS.medium,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.spacing.m,
  },
  sectionTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  sectionAction: {
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  activityIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.spacing.m,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: SIZES.medium,
    fontWeight: '500',
    color: COLORS.text,
  },
  activityTimestamp: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginTop: 2,
  },
  quickActionsContainer: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    marginHorizontal: SIZES.spacing.m,
    padding: SIZES.spacing.m,
    ...SHADOWS.medium,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: SIZES.spacing.s,
  },
  quickActionButton: {
    width: '48%',
    alignItems: 'center',
    marginBottom: SIZES.spacing.m,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.spacing.xs,
    ...SHADOWS.small,
  },
  quickActionText: {
    fontSize: SIZES.small,
    color: COLORS.text,
    textAlign: 'center',
  }
});

export default DashboardScreen; 