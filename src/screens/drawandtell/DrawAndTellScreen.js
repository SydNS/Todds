import { FontAwesome5 } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    PanResponder,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

const { width } = Dimensions.get('window');
const CANVAS_WIDTH = width - 40;
const CANVAS_HEIGHT = width * 0.8;

const DrawAndTellScreen = ({ navigation }) => {
  const [currentColor, setCurrentColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  
  const colors = [
    { id: '1', color: '#000000', name: 'Black' },
    { id: '2', color: '#FF5252', name: 'Red' },
    { id: '3', color: '#4CAF50', name: 'Green' },
    { id: '4', color: '#536DFE', name: 'Blue' },
    { id: '5', color: '#FFD600', name: 'Yellow' },
    { id: '6', color: '#9C27B0', name: 'Purple' },
    { id: '7', color: '#FF9800', name: 'Orange' },
    { id: '8', color: '#795548', name: 'Brown' },
  ];
  
  const brushSizes = [
    { id: '1', size: 3, name: 'Small' },
    { id: '2', size: 5, name: 'Medium' },
    { id: '3', size: 8, name: 'Large' },
  ];
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      
      onPanResponderGrant: (event) => {
        const { locationX, locationY } = event.nativeEvent;
        
        // Start a new path with the current color and size
        setCurrentPath([
          {
            x: locationX,
            y: locationY,
            color: currentColor,
            brushSize: brushSize,
          },
        ]);
      },
      
      onPanResponderMove: (event) => {
        const { locationX, locationY } = event.nativeEvent;
        
        // Add to the current path
        setCurrentPath((prevPath) => [
          ...prevPath,
          {
            x: locationX,
            y: locationY,
            color: currentColor,
            brushSize: brushSize,
          },
        ]);
      },
      
      onPanResponderRelease: () => {
        // Save the current path to the paths array
        setPaths((prevPaths) => [...prevPaths, currentPath]);
        setCurrentPath([]);
      },
    })
  ).current;
  
  const clearCanvas = () => {
    Alert.alert(
      'Clear Drawing',
      'Are you sure you want to clear your drawing?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          onPress: () => {
            setPaths([]);
            setCurrentPath([]);
          },
        },
      ],
    );
  };
  
  const saveDrawing = () => {
    // Here we would save the drawing
    // This is a placeholder for now
    Alert.alert(
      'Great Drawing!',
      'Your drawing has been saved.',
      [{ text: 'OK' }]
    );
  };
  
  const renderColorPicker = () => {
    return (
      <FlatList
        horizontal
        data={colors}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.colorPickerContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.colorButton,
              { backgroundColor: item.color },
              currentColor === item.color && styles.selectedColorButton,
            ]}
            onPress={() => setCurrentColor(item.color)}
          />
        )}
      />
    );
  };
  
  const renderBrushPicker = () => {
    return (
      <View style={styles.brushPickerContainer}>
        {brushSizes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.brushButton,
              brushSize === item.size && styles.selectedBrushButton,
            ]}
            onPress={() => setBrushSize(item.size)}
          >
            <View
              style={[
                styles.brushSample,
                { 
                  width: item.size * 2,
                  height: item.size * 2,
                  borderRadius: item.size,
                  backgroundColor: currentColor
                },
              ]}
            />
            <Text style={styles.brushText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
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
        <Text style={styles.headerTitle}>Draw & Tell</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.instructionText}>
          Express yourself! Draw anything you like and tell a story about it.
        </Text>
        
        <View style={styles.canvasContainer}>
          <View
            style={styles.canvas}
            {...panResponder.panHandlers}
          >
            {/* Render saved paths */}
            {paths.map((path, pathIndex) => (
              <View key={`path-${pathIndex}`}>
                {path.map((point, pointIndex) => {
                  // Don't render single points
                  if (pointIndex === 0) return null;
                  
                  const previousPoint = path[pointIndex - 1];
                  
                  return (
                    <View
                      key={`point-${pointIndex}`}
                      style={[
                        styles.line,
                        {
                          left: previousPoint.x,
                          top: previousPoint.y,
                          width: Math.sqrt(
                            Math.pow(point.x - previousPoint.x, 2) +
                            Math.pow(point.y - previousPoint.y, 2)
                          ),
                          height: point.brushSize,
                          backgroundColor: point.color,
                          transform: [
                            {
                              rotate: `${Math.atan2(
                                point.y - previousPoint.y,
                                point.x - previousPoint.x
                              )}rad`,
                            },
                          ],
                        },
                      ]}
                    />
                  );
                })}
              </View>
            ))}
            
            {/* Render current path */}
            {currentPath.map((point, pointIndex) => {
              if (pointIndex === 0) return null;
              
              const previousPoint = currentPath[pointIndex - 1];
              
              return (
                <View
                  key={`current-point-${pointIndex}`}
                  style={[
                    styles.line,
                    {
                      left: previousPoint.x,
                      top: previousPoint.y,
                      width: Math.sqrt(
                        Math.pow(point.x - previousPoint.x, 2) +
                        Math.pow(point.y - previousPoint.y, 2)
                      ),
                      height: point.brushSize,
                      backgroundColor: point.color,
                      transform: [
                        {
                          rotate: `${Math.atan2(
                            point.y - previousPoint.y,
                            point.x - previousPoint.x
                          )}rad`,
                        },
                      ],
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>
        
        <View style={styles.toolsContainer}>
          <Text style={styles.toolsTitle}>Colors</Text>
          {renderColorPicker()}
          
          <Text style={styles.toolsTitle}>Brush Size</Text>
          {renderBrushPicker()}
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={clearCanvas}
            >
              <FontAwesome5 name="trash" size={16} color="#FFF" />
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={saveDrawing}
            >
              <FontAwesome5 name="save" size={16} color="#FFF" />
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingHorizontal: SIZES.screenPadding,
    paddingBottom: 80,
  },
  instructionText: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 20,
    textAlign: 'center',
  },
  canvasContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  canvas: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    ...SHADOWS.medium,
    overflow: 'hidden',
  },
  line: {
    position: 'absolute',
    transformOrigin: 'left',
  },
  toolsContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  toolsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 10,
  },
  colorPickerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 15,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    ...SHADOWS.small,
  },
  selectedColorButton: {
    borderWidth: 2,
    borderColor: COLORS.tertiary,
  },
  brushPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  brushButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  selectedBrushButton: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  brushSample: {
    marginBottom: 5,
  },
  brushText: {
    fontSize: 12,
    color: COLORS.text,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.tertiary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 8,
  },
});

export default DrawAndTellScreen; 