import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import { getTransparentOverlay, useRandomBackground } from '../../utils/backgroundUtils';

const CitizenPortalScreen = ({ navigation }) => {
  const backgroundImage = useRandomBackground();

  const portalServices = [
    {
      id: '1',
      title: 'ID Applications',
      icon: 'id-card',
      color: COLORS.govBlue.primary,
      screen: 'IDApplications',
    },
    {
      id: '2',
      title: 'Tax Services',
      icon: 'money-check-alt',
      color: COLORS.civicGreen.primary,
      screen: 'TaxServices',
    },
    {
      id: '3',
      title: 'Permits & Licenses',
      icon: 'file-certificate',
      color: COLORS.justiceRed.primary,
      screen: 'PermitsLicenses',
    },
    {
      id: '4',
      title: 'Report Issues',
      icon: 'exclamation-triangle',
      color: COLORS.publicServicesOrange.primary,
      screen: 'ReportIssues',
    },
    {
      id: '5',
      title: 'Public Records',
      icon: 'folder-open',
      color: COLORS.legislativeYellow.primary,
      screen: 'PublicRecords',
    },
    {
      id: '6',
      title: 'Voter Registration',
      icon: 'vote-yea',
      color: COLORS.accent1,
      screen: 'VoterRegistration',
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
            <Text style={styles.headerTitle}>Citizen Portal</Text>
            <TouchableOpacity style={styles.notificationButton}>
              <FontAwesome5 name="bell" size={18} color={COLORS.text} />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Welcome Banner */}
            <Animatable.View 
              animation="fadeIn" 
              duration={800}
              style={styles.welcomeBanner}
            >
              <Text style={styles.welcomeTitle}>Welcome, Citizen</Text>
              <Text style={styles.welcomeSubtitle}>
                Access government services and manage your civic responsibilities
              </Text>
            </Animatable.View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <FontAwesome5 name="search" size={18} color={COLORS.textLight} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for services..."
                placeholderTextColor={COLORS.textLight}
              />
            </View>

            {/* Service Categories */}
            <View style={styles.servicesContainer}>
              <Text style={styles.sectionTitle}>Services</Text>
              <View style={styles.servicesGrid}>
                {portalServices.map((service, index) => (
                  <Animatable.View 
                    key={service.id}
                    animation="fadeInUp"
                    delay={300 + (index * 100)}
                    duration={500}
                  >
                    <TouchableOpacity 
                      style={styles.serviceCard}
                      onPress={() => navigation.navigate(service.screen)}
                    >
                      <View style={[styles.serviceIconContainer, { backgroundColor: service.color }]}>
                        <FontAwesome5 name={service.icon} size={20} color="#FFF" />
                      </View>
                      <Text style={styles.serviceTitle}>{service.title}</Text>
                    </TouchableOpacity>
                  </Animatable.View>
                ))}
              </View>
            </View>

            {/* Applications Status */}
            <View style={styles.applicationSection}>
              <Text style={styles.sectionTitle}>My Applications</Text>
              <View style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <Text style={styles.applicationTitle}>Business License Renewal</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>In Progress</Text>
                  </View>
                </View>
                <View style={styles.applicationContent}>
                  <Text style={styles.applicationLabel}>Application #:</Text>
                  <Text style={styles.applicationValue}>BL-2023-45678</Text>
                </View>
                <View style={styles.applicationContent}>
                  <Text style={styles.applicationLabel}>Submitted:</Text>
                  <Text style={styles.applicationValue}>June 1, 2023</Text>
                </View>
                <View style={styles.applicationContent}>
                  <Text style={styles.applicationLabel}>Est. Completion:</Text>
                  <Text style={styles.applicationValue}>June 14, 2023</Text>
                </View>
                <TouchableOpacity style={styles.viewDetailsButton}>
                  <Text style={styles.viewDetailsText}>View Details</Text>
                  <FontAwesome5 name="chevron-right" size={14} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Upcoming Payments */}
            <View style={styles.paymentsSection}>
              <Text style={styles.sectionTitle}>Upcoming Payments</Text>
              <View style={styles.paymentCard}>
                <View style={styles.paymentHeader}>
                  <View style={styles.paymentIconContainer}>
                    <FontAwesome5 name="file-invoice-dollar" size={20} color="#FFF" />
                  </View>
                  <View>
                    <Text style={styles.paymentTitle}>Property Tax</Text>
                    <Text style={styles.paymentDue}>Due: July 15, 2023</Text>
                  </View>
                  <Text style={styles.paymentAmount}>$1,250.00</Text>
                </View>
                <TouchableOpacity style={styles.payButton}>
                  <Text style={styles.payButtonText}>Pay Now</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.error,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingBottom: SIZES.spacing.xxl,
  },
  welcomeBanner: {
    marginHorizontal: SIZES.spacing.m,
    marginBottom: SIZES.spacing.l,
    backgroundColor: COLORS.govBlue.primary,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.spacing.l,
    ...SHADOWS.medium,
  },
  welcomeTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: SIZES.font,
    color: 'rgba(255,255,255,0.8)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    marginHorizontal: SIZES.spacing.m,
    marginBottom: SIZES.spacing.l,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SIZES.spacing.m,
    ...SHADOWS.small,
  },
  searchIcon: {
    marginRight: SIZES.spacing.s,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  servicesContainer: {
    marginHorizontal: SIZES.spacing.m,
    marginBottom: SIZES.spacing.l,
  },
  sectionTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.spacing.m,
    paddingHorizontal: 4,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: (SIZES.width - SIZES.spacing.m * 2 - SIZES.spacing.m) / 2,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    paddingVertical: SIZES.spacing.l,
    marginBottom: SIZES.spacing.m,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.spacing.s,
  },
  serviceTitle: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    textAlign: 'center',
    paddingHorizontal: SIZES.spacing.s,
  },
  applicationSection: {
    marginHorizontal: SIZES.spacing.m,
    marginBottom: SIZES.spacing.l,
  },
  applicationCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.spacing.m,
    ...SHADOWS.medium,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.spacing.m,
  },
  applicationTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statusBadge: {
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
    paddingHorizontal: SIZES.spacing.s,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: SIZES.small,
    fontWeight: '500',
    color: COLORS.warning,
  },
  applicationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.spacing.s,
  },
  applicationLabel: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  applicationValue: {
    fontSize: SIZES.small,
    color: COLORS.text,
    fontWeight: '500',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.spacing.s,
    paddingVertical: SIZES.spacing.s,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  viewDetailsText: {
    fontSize: SIZES.font,
    color: COLORS.primary,
    fontWeight: '500',
    marginRight: SIZES.spacing.xs,
  },
  paymentsSection: {
    marginHorizontal: SIZES.spacing.m,
    marginBottom: SIZES.spacing.l,
  },
  paymentCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.spacing.m,
    ...SHADOWS.medium,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.civicGreen.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.spacing.m,
  },
  paymentTitle: {
    fontSize: SIZES.medium,
    fontWeight: '500',
    color: COLORS.text,
    flex: 1,
  },
  paymentDue: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  paymentAmount: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.civicGreen.primary,
    marginLeft: 'auto',
  },
  payButton: {
    backgroundColor: COLORS.civicGreen.primary,
    borderRadius: 25,
    paddingVertical: SIZES.spacing.s,
    paddingHorizontal: SIZES.spacing.l,
    alignSelf: 'flex-end',
    marginTop: SIZES.spacing.m,
    ...SHADOWS.small,
  },
  payButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: SIZES.font,
  },
});

export default CitizenPortalScreen; 