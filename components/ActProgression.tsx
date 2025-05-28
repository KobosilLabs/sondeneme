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
const ARC_HEIGHT = 180;
const ARC_SPACING = 60;
const SPINE_WIDTH = 4;
const NODE_SIZE = 16;

export default function ActProgression({ 
  arcs, 
  currentArcIndex,
  onSelectArc 
}: ActProgressionProps) {
  const pulseAnim = React.useRef(new Animated.Value(0)).current;
  const shimmerAnim = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    // Pulse animation for the spine
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    );
    
    // Shimmer animation for nodes
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    );
    
    pulse.start();
    shimmer.start();
    
    return () => {
      pulse.stop();
      shimmer.stop();
    };
  }, []);
  
  const spineColor = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#7A00F3', '#FF4E4E'],
  });
  
  const nodeGlow = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 8],
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
          { 
            backgroundColor: spineColor,
            shadowColor: spineColor 
          }
        ]} 
      />
      
      {/* Arcs */}
      {arcs.map((arc, index) => (
        <View key={arc.id} style={styles.arcWrapper}>
          {/* Connection Node */}
          <Animated.View 
            style={[
              styles.node,
              { 
                backgroundColor: index === currentArcIndex ? '#FF4E4E' : '#7A00F3',
                shadowRadius: index === currentArcIndex ? nodeGlow : 4,
              }
            ]} 
          />
          
          <TouchableOpacity
            style={[
              styles.arcContainer,
              index === currentArcIndex && styles.currentArc
            ]}
            onPress={() => onSelectArc(index)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[
                'rgba(30, 30, 30, 0.95)',
                index === currentArcIndex 
                  ? 'rgba(122, 0, 243, 0.2)' 
                  : 'rgba(30, 30, 30, 0.95)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
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
        </View>
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
    paddingTop: height * 0.15,
    paddingBottom: height * 0.15,
  },
  spineLine: {
    position: 'absolute',
    width: SPINE_WIDTH,
    height: '100%',
    borderRadius: SPINE_WIDTH / 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  arcWrapper: {
    alignItems: 'center',
    marginBottom: ARC_SPACING,
  },
  node: {
    width: NODE_SIZE,
    height: NODE_SIZE,
    borderRadius: NODE_SIZE / 2,
    marginBottom: 20,
    shadowColor: '#7A00F3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 2,
  },
  arcContainer: {
    width: width * 0.85,
    height: ARC_HEIGHT,
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
    padding: 24,
    justifyContent: 'space-between',
  },
  arcHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  arcName: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 28,
    color: '#DCDCDC',
    letterSpacing: 2,
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
    opacity: 0.8,
    lineHeight: 24,
  },
  currentIndicator: {
    position: 'absolute',
    bottom: 24,
    right: 24,
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