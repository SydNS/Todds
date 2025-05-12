import { Audio } from 'expo-av';

export const playSound = async (soundFile) => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      typeof soundFile === 'string' ? { uri: soundFile } : soundFile
    );
    await sound.playAsync();
    return sound;
  } catch (error) {
    console.error('Error playing sound:', error);
    throw error;
  }
};

export const stopSound = async (sound) => {
  try {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
  } catch (error) {
    console.error('Error stopping sound:', error);
    throw error;
  }
};

// For video, you should use the <Video /> component from expo-av in your React components.
// If you need utility functions for video, you can add them here as needed. 