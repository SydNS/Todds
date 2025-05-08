import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { WebView } from 'react-native-webview';
import { COLORS, SIZES } from '../../constants/theme';
import { getTransparentOverlay, useRandomBackground } from '../../utils/backgroundUtils';

const { width, height } = Dimensions.get('window');

const BookReaderScreen = ({ navigation, route }) => {
  const { book } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const backgroundImage = useRandomBackground();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ImageBackground 
        source={backgroundImage}
        style={styles.backgroundImage}
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
            <Text style={styles.headerTitle} numberOfLines={1}>{book.title}</Text>
            <View style={{ width: 40 }} />
          </View>
          
          {/* Loading Indicator */}
          {isLoading && (
            <Animatable.View 
              animation="fadeIn" 
              style={styles.loadingContainer}
            >
              <ActivityIndicator size="large" color={COLORS.storyWorld.primary} />
              <Text style={styles.loadingText}>Loading your book...</Text>
            </Animatable.View>
          )}
          
          {/* PDF Viewer */}
          <View style={styles.webViewContainer}>
            <WebView
              source={{ uri: book.url }}
              style={styles.webView}
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.error('WebView error: ', nativeEvent);
              }}
              // Enable JavaScript and DOM storage for better PDF rendering
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              renderLoading={() => <ActivityIndicator color={COLORS.storyWorld.primary} size="large" />}
              // Allow scaling and gestures for better PDF interaction
              scalesPageToFit={true}
              bounces={false}
            />
          </View>
          
          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={() => navigation.goBack()}
            >
              <FontAwesome5 name="times" size={20} color="#FFF" />
              <Text style={styles.controlText}>Close</Text>
            </TouchableOpacity>
          </View>
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
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: SIZES.medium,
    paddingBottom: SIZES.small,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
    textAlign: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    zIndex: 5,
  },
  loadingText: {
    marginTop: SIZES.medium,
    fontSize: SIZES.medium,
    color: COLORS.storyWorld.primary,
    fontWeight: '600',
  },
  webViewContainer: {
    flex: 1,
    width: width,
    height: height - 150, // Adjust based on header + controls height
  },
  webView: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SIZES.medium,
    backgroundColor: COLORS.background,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.storyWorld.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  controlText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default BookReaderScreen; 