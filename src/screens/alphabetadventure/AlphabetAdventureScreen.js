import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

const { width } = Dimensions.get('window');
const LETTER_SIZE = (width - 100) / 4;

const AlphabetAdventureScreen = ({ navigation }) => {
  const [selectedMode, setSelectedMode] = useState('explore'); // explore, trace, match
  const [selectedLetter, setSelectedLetter] = useState(null);
  
  const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];
  
  const renderLetter = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.letterBox,
        selectedLetter === item && styles.selectedLetterBox
      ]}
      onPress={() => setSelectedLetter(item)}
    >
      <Text style={styles.letterText}>{item}</Text>
    </TouchableOpacity>
  );
  
  const renderContent = () => {
    switch(selectedMode) {
      case 'explore':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.instructionText}>Tap on a letter to learn about it</Text>
            <FlatList
              data={alphabet}
              renderItem={renderLetter}
              keyExtractor={(item) => item}
              numColumns={4}
              columnWrapperStyle={styles.letterRow}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.alphabetContainer}
            />
          </View>
        );
        
      case 'trace':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.instructionText}>Trace the letter with your finger</Text>
            {selectedLetter ? (
              <View style={styles.traceContainer}>
                <Text style={styles.traceLetter}>{selectedLetter}</Text>
                <Text style={styles.traceInstruction}>Use your finger to trace over the letter</Text>
                {/* Here would be a canvas component for tracing */}
                <View style={styles.traceCanvas} />
                <TouchableOpacity style={styles.resetButton}>
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.selectLetterPrompt}>Please select a letter first</Text>
            )}
          </View>
        );
        
      case 'match':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.instructionText}>Match the uppercase and lowercase letters</Text>
            {/* Here would be a drag and drop or tap-to-match game */}
            <View style={styles.matchContainer}>
              <Text style={styles.matchPrompt}>
                Matching game will be available in the next update!
              </Text>
            </View>
          </View>
        );
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={18} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alphabet Adventure</Text>
      </View>
      
      <View style={styles.modeSelector}>
        <TouchableOpacity 
          style={[styles.modeButton, selectedMode === 'explore' && styles.activeModeButton]} 
          onPress={() => setSelectedMode('explore')}
        >
          <FontAwesome5 name="book-open" size={18} color={selectedMode === 'explore' ? '#FFF' : COLORS.text} />
          <Text style={[styles.modeButtonText, selectedMode === 'explore' && styles.activeModeButtonText]}>Explore</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.modeButton, selectedMode === 'trace' && styles.activeModeButton]} 
          onPress={() => setSelectedMode('trace')}
        >
          <FontAwesome5 name="pencil-alt" size={18} color={selectedMode === 'trace' ? '#FFF' : COLORS.text} />
          <Text style={[styles.modeButtonText, selectedMode === 'trace' && styles.activeModeButtonText]}>Trace</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.modeButton, selectedMode === 'match' && styles.activeModeButton]} 
          onPress={() => setSelectedMode('match')}
        >
          <FontAwesome5 name="th-large" size={18} color={selectedMode === 'match' ? '#FFF' : COLORS.text} />
          <Text style={[styles.modeButtonText, selectedMode === 'match' && styles.activeModeButtonText]}>Match</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.mainContent}>
        {renderContent()}
      </View>
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
  modeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
    marginBottom: 15,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#FFF',
    ...SHADOWS.small,
  },
  activeModeButton: {
    backgroundColor: COLORS.accent3,
  },
  modeButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  activeModeButtonText: {
    color: '#FFF',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: SIZES.screenPadding,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 80,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  alphabetContainer: {
    paddingVertical: 10,
  },
  letterRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  letterBox: {
    width: LETTER_SIZE,
    height: LETTER_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    ...SHADOWS.small,
    margin: 4,
  },
  selectedLetterBox: {
    backgroundColor: COLORS.accent3,
  },
  letterText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  traceContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  traceLetter: {
    fontSize: 120,
    fontWeight: '300',
    color: COLORS.accent3,
    opacity: 0.6,
  },
  traceInstruction: {
    fontSize: 16,
    color: COLORS.textLight,
    marginVertical: 20,
  },
  traceCanvas: {
    width: width - 60,
    height: 300,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 15,
    marginBottom: 20,
  },
  resetButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.accent2,
    borderRadius: 20,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  selectLetterPrompt: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 50,
  },
  matchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  matchPrompt: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textLight,
    textAlign: 'center',
  },
});

export default AlphabetAdventureScreen; 