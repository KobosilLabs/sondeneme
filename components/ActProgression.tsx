import React from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Dimensions, 
  Animated,
  TouchableOpacity,
  Text 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { Arc } from '@/data/habitsData';

interface ActProgressionProps {
  arcs: Arc[];
  currentArcIndex: number;
  onSelectArc: (index: number) => void;
}

const { width, height } = Dimensions.get('window');
const ARC_HEIGHT = 160;
const ARC_SPACING = 40;
const SPINE_WIDTH = 4;

export default function ActProgression({ 
  arcs, 
  currentArcIndex,
  onSelectArc 
}: ActProgressionProps) {
  const pulseAnim = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    );
    
    pulse.start();
    
    return () => pulse.stop();
  }, []);
  
  const spineColor = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#7A00F3', '#FF4E4E'],
  });
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Glowing Spine Line */}
      <Animated.View 
        style={[
          styles.spineLine,
          { backgroundColor: spineColor }
        ]} 
      />
      
      {/* Arcs */}
      {arcs.map((arc, index) => (
        <TouchableOpacity
          key={arc.id}
          style={[
            styles.arcContainer,
            index === currentArcIndex && styles.currentArc
          ]}
          onPress={() => onSelectArc(index)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[
              'rgba(30, 30, 30, 0.9)',
              index === currentArcIndex 
                ? 'rgba(122, 0, 243, 0.2)' 
                : 'rgba(30, 30, 30, 0.9)',
            ]}
            style={styles.arcContent}
          >
            <View style={styles.arcHeader}>
              <Text style={styles.arcName}>{arc.name}</Text>
              <Text style={styles.arcProgress}>
                {arc.days.length} DAYS
              </Text>
            </View>
            
            <Text style={styles.arcDescription}>
              {arc.description}
            </Text>
            
            {index === currentArcIndex && (
              <View style={styles.currentIndicator}>
                <Text style={styles.currentText}>CURRENT ARC</Text>
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      ))}
      
      {/* Bottom Spacing */}
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  content: {
    alignItems: 'center',
    paddingTop: height * 0.1, // Start from top
    paddingBottom: height * 0.1, // Extra space at bottom
  },
  spineLine: {
    position: 'absolute',
    width: SPINE_WIDTH,
    height: '100%',
    borderRadius: SPINE_WIDTH / 2,
    shadowColor: '#7A00F3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  arcContainer: {
    width: width * 0.85,
    height: ARC_HEIGHT,
    marginBottom: ARC_SPACING,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#5A5A5A',
    overflow: 'hidden',
  },
  currentArc: {
    borderColor: '#7A00F3',
    shadowColor: '#7A00F3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  arcContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  arcHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  arcName: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 24,
    color: '#DCDCDC',
    letterSpacing: 1,
  },
  arcProgress: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
    color: '#FF4E4E',
    letterSpacing: 1,
  },
  arcDescription: {
    fontFamily: 'Rajdhani-Regular',
    fontSize: 16,
    color: '#DCDCDC',
    opacity: 0.7,
  },
  currentIndicator: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(122, 0, 243, 0.2)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#7A00F3',
  },
  currentText: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
    color: '#7A00F3',
    letterSpacing: 1,
  },
  bottomSpace: {
    height: ARC_SPACING,
  },
});