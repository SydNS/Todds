import { FontAwesome5 } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

const AnimalSoundsScreen = ({ navigation }) => {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  
  // Request audio permissions when component mounts
  useEffect(() => {
    (async () => {
      try {
        console.log("Requesting audio permissions...");
        const permission = await Audio.requestPermissionsAsync();
        console.log("Permission response:", permission);
        
        if (permission.status !== 'granted') {
          Alert.alert(
            'Permission Required',
            'Audio playback requires microphone permission',
            [{ text: 'OK' }]
          );
        }
      } catch (error) {
        console.error("Error requesting permissions:", error);
      }
    })();
  }, []);
  
  // Cleanup sound on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
    };
  }, [sound]);
  
  // Updated animal data with reliable HTTPS audio sources
  const animals = [
    {
      id: '1',
      name: 'Lion',
      sound: 'Roar',
      audioUrl: 'https://actions.google.com/sounds/v1/animals/large_cat_growl.ogg',
      image: 'https://cdn-icons-png.flaticon.com/512/2219/2219774.png'
    },
    {
      id: '2',
      name: 'Cow',
      sound: 'Moo',
      audioUrl: 'https://actions.google.com/sounds/v1/animals/cow_moo.ogg',
      image: 'https://cdn-icons-png.flaticon.com/512/2219/2219673.png'
    },
    {
      id: '3',
      name: 'Dog',
      sound: 'Woof',
      audioUrl: 'https://actions.google.com/sounds/v1/animals/dog_barking.ogg',
      image: 'https://cdn-icons-png.flaticon.com/512/2219/2219661.png'
    },
    {
      id: '4',
      name: 'Cat',
      sound: 'Meow',
      audioUrl: 'https://actions.google.com/sounds/v1/animals/cat_meow.ogg',
      image: 'https://cdn-icons-png.flaticon.com/512/2219/2219673.png'
    },
    {
      id: '5',
      name: 'Sheep',
      sound: 'Baa',
      audioUrl: 'https://actions.google.com/sounds/v1/animals/animal_sounds_sheep.ogg',
      image: 'https://cdn-icons-png.flaticon.com/512/2219/2219759.png'
    },
    {
      id: '6',
      name: 'Horse',
      sound: 'Neigh',
      audioUrl: 'https://actions.google.com/sounds/v1/animals/horse_gallop.ogg',
      image: 'https://cdn-icons-png.flaticon.com/512/2219/2219719.png'
    },
  ];
  
  async function playSound(animal) {
    console.log('Attempting to load sound for:', animal.name);
    
    try {
      // Unload the previous sound if it exists
      if (sound) {
        console.log('Unloading previous sound');
        await sound.unloadAsync();
      }
      
      // Set up audio mode for playback
      console.log('Setting up audio mode');
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      
      console.log('Loading sound from URL:', animal.audioUrl);
      
      // Create and load new sound from URL
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: animal.audioUrl },
        { shouldPlay: true, volume: 1.0 },
        (status) => {
          console.log('Loading status:', status);
          if (status.error) {
            console.error('Sound loading error:', status.error);
          }
        }
      );
      
      console.log('Sound loaded successfully');
      setSound(newSound);
      setIsPlaying(true);
      
      // Monitor playback status
      newSound.setOnPlaybackStatusUpdate((status) => {
        // Log playback status
        if (status.isLoaded) {
          console.log('Playback status:', 
            status.isPlaying ? 'Playing' : 'Paused', 
            'Position:', status.positionMillis,
            'Duration:', status.durationMillis
          );
        } else if (status.error) {
          console.error('Playback error:', status.error);
        }
        
        if (status.didJustFinish) {
          console.log('Sound finished playing');
          setIsPlaying(false);
        }
      });
      
    } catch (error) {
      console.error('Error playing sound:', error);
      
      // More detailed error information
      const errorDetails = error.message ? `\nDetails: ${error.message}` : '';
      const errorCode = error.code ? `\nCode: ${error.code}` : '';
      
      Alert.alert(
        'Sound Error', 
        `There was a problem playing the animal sound.${errorDetails}${errorCode}`,
        [{ text: 'OK' }]
      );
      
      setIsPlaying(false);
    }
  }
  
  const handleAnimalPress = (animal) => {
    console.log('Animal pressed:', animal.name);
    setSelectedAnimal(animal);
    
    // Play the animal sound
    playSound(animal);
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
        <Text style={styles.headerTitle}>Animal Sounds Safari</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.instructionText}>
          Tap on an animal to hear its sound!
        </Text>
        
        <View style={styles.animalGrid}>
          {animals.map((animal) => (
            <Animatable.View 
              key={animal.id}
              animation="fadeIn"
              delay={parseInt(animal.id) * 100}
            >
              <TouchableOpacity 
                style={[
                  styles.animalCard, 
                  selectedAnimal?.id === animal.id && styles.selectedAnimalCard
                ]}
                onPress={() => handleAnimalPress(animal)}
              >
                <Image 
                  source={{ uri: animal.image }} 
                  style={styles.animalImage}
                  resizeMode="contain"
                />
                <Text style={styles.animalName}>{animal.name}</Text>
                {selectedAnimal?.id === animal.id && isPlaying && (
                  <Animatable.View 
                    style={styles.soundIndicator}
                    animation="pulse"
                    iterationCount="infinite"
                    duration={500}
                  >
                    <FontAwesome5 name="volume-up" size={16} color="#FFF" />
                  </Animatable.View>
                )}
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </View>
        
        {selectedAnimal && (
          <Animatable.View 
            style={styles.soundCard}
            animation="bounceIn"
          >
            <Text style={styles.soundTitle}>
              The {selectedAnimal.name} says:
            </Text>
            <View style={styles.soundBubble}>
              <Animatable.Text 
                style={styles.soundText}
                animation={isPlaying ? "pulse" : ""}
                iterationCount={isPlaying ? "infinite" : 1}
                duration={500}
              >
                "{selectedAnimal.sound}!"
              </Animatable.Text>
            </View>
            <TouchableOpacity 
              style={styles.playButton}
              onPress={() => handleAnimalPress(selectedAnimal)}
            >
              <FontAwesome5 name="play" size={16} color="#FFF" />
              <Text style={styles.playButtonText}>Play Sound Again</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
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
  scrollContent: {
    padding: SIZES.screenPadding,
    paddingBottom: 80,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  animalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  animalCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: 16,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    ...SHADOWS.medium,
    position: 'relative',
  },
  selectedAnimalCard: {
    backgroundColor: COLORS.accent5 + '20',  // 20% opacity
    borderWidth: 2,
    borderColor: COLORS.accent5,
  },
  animalImage: {
    width: CARD_WIDTH * 0.7,
    height: CARD_WIDTH * 0.7,
  },
  animalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 10,
  },
  soundIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.accent5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  soundCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    ...SHADOWS.medium,
    marginTop: 10,
  },
  soundTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 15,
  },
  soundBubble: {
    backgroundColor: COLORS.accent5 + '20',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginBottom: 20,
  },
  soundText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.accent5,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  playButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 8,
  },
});

export default AnimalSoundsScreen; 