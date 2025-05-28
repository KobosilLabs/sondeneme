import React, { useRef, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Dimensions, 
  Animated,
  TouchableOpacity,
  Text,
  Image,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { Arc } from '@/data/habitsData';

interface ActProgressionProps {
  arcs: Arc[];
  currentArcIndex: number;
  onSelectArc: (index: number) => void;
}

const { width, height } = Dimensions.get('window');
const ARC_HEIGHT = 200;
const ARC_SPACING = 80;
const SPINE_WIDTH = 4;
const NODE_SIZE = 20;
const TOTAL_ARC_HEIGHT = ARC_HEIGHT + ARC_SPACING;

export default function ActProgression({ 
  arcs, 
  currentArcIndex,
  onSelectArc 
}: ActProgressionProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const scaleAnims = useRef(arcs.map(() => new Animated.Value(1))).current;
  
  // Auto-scroll to current arc
  useEffect(() => {
    const yOffset = currentArcIndex * TOTAL_ARC_HEIGHT;
    scrollViewRef.current?.scrollTo({
      y: yOffset,
      animated: true,
    });
    
    // Animate scale of current arc
    scaleAnims.forEach((anim, index) => {
      Animated.spring(anim, {
        toValue: index === currentArcIndex ? 1.02 : 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
    });
  }, [currentArcIndex]);
  
  useEffect(() => {
    const animations = [
      // Spine pulse animation
      Animated.loop(
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
      ),
      
      // Node shimmer animation
      Animated.loop(
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
      ),
      
      // Arc glow animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: false,
          }),
        ])
      ),
    ];
    
    animations.forEach(anim => anim.start());
    return () => animations.forEach(anim => anim.stop());
  }, []);
  
  const spineColor = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#7A00F3', '#FF4E4E'],
  });
  
  const nodeGlow = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 12],
  });
  
  const arcGlow = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 15],
  });
  
  return (
    <ScrollView 
      ref={scrollViewRef}
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
      {arcs.map((arc, index) => {
        const isCurrentArc = index === currentArcIndex;
        const isPastArc = index < currentArcIndex;
        
        return (
          <View key={arc.id} style={styles.arcWrapper}>
            {/* Connection Node */}
            <Animated.View 
              style={[
                styles.nodeOuter,
                { 
                  borderColor: isCurrentArc ? '#FF4E4E' : isPastArc ? '#7A00F3' : '#5A5A5A',
                  shadowRadius: isCurrentArc ? nodeGlow : 4,
                  shadowColor: isCurrentArc ? '#FF4E4E' : '#7A00F3',
                }
              ]} 
            >
              <Animated.View 
                style={[
                  styles.nodeInner,
                  { 
                    backgroundColor: isCurrentArc ? '#FF4E4E' : isPastArc ? '#7A00F3' : '#5A5A5A',
                    shadowRadius: isCurrentArc ? nodeGlow : 4,
                    shadowColor: isCurrentArc ? '#FF4E4E' : '#7A00F3',
                  }
                ]} 
              />
            </Animated.View>
            
            <Animated.View
              style={[
                styles.arcContainer,
                {
                  shadowRadius: isCurrentArc ? arcGlow : 5,
                  shadowColor: isCurrentArc ? '#FF4E4E' : '#7A00F3',
                  transform: [{ scale: scaleAnims[index] }],
                }
              ]}
            >
              <TouchableOpacity
                onPress={() => onSelectArc(index)}
                activeOpacity={0.8}
                style={styles.arcTouchable}
              >
                <LinearGradient
                  colors={[
                    isCurrentArc 
                      ? 'rgba(255, 78, 78, 0.2)' 
                      : isPastArc
                        ? 'rgba(122, 0, 243, 0.2)'
                        : 'rgba(30, 30, 30, 0.95)',
                    'rgba(30, 30, 30, 0.95)',
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.arcContent}
                >
                  <View style={styles.arcImageContainer}>
                    <Image 
                      source={{ uri: arc.imageUrl }}
                      style={styles.arcImage}
                      resizeMode="cover"
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(30, 30, 30, 0.95)']}
                      style={styles.imageOverlay}
                    />
                  </View>
                  
                  <View style={styles.arcInfo}>
                    <View style={styles.arcHeader}>
                      <Text style={styles.arcName}>{arc.name}</Text>
                      <Text style={[
                        styles.arcProgress,
                        { color: isCurrentArc ? '#FF4E4E' : isPastArc ? '#7A00F3' : '#5A5A5A' }
                      ]}>
                        {arc.days.length} DAYS
                      </Text>
                    </View>
                    
                    <Text style={styles.arcDescription}>
                      {arc.description}
                    </Text>
                    
                    {isCurrentArc && (
                      <View style={styles.currentIndicator}>
                        <Text style={styles.currentText}>CURRENT ARC</Text>
                      </View>
                    )}
                    
                    {isPastArc && (
                      <View style={[styles.currentIndicator, styles.completedIndicator]}>
                        <Text style={[styles.currentText, styles.completedText]}>
                          COMPLETED
                        </Text>
                      </View>
                    )}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>
        );
      })}
      
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
  nodeOuter: {
    width: NODE_SIZE,
    height: NODE_SIZE,
    borderRadius: NODE_SIZE / 2,
    borderWidth: 2,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0F0F',
  },
  nodeInner: {
    width: NODE_SIZE - 8,
    height: NODE_SIZE - 8,
    borderRadius: (NODE_SIZE - 8) / 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  arcContainer: {
    width: width * 0.85,
    height: ARC_HEIGHT,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  arcTouchable: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#5A5A5A',
    overflow: 'hidden',
  },
  arcContent: {
    flex: 1,
    flexDirection: 'row',
  },
  arcImageContainer: {
    width: ARC_HEIGHT * 0.8,
    height: '100%',
    position: 'relative',
  },
  arcImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 60,
  },
  arcInfo: {
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
    backgroundColor: 'rgba(255, 78, 78, 0.2)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FF4E4E',
  },
  completedIndicator: {
    backgroundColor: 'rgba(122, 0, 243, 0.2)',
    borderColor: '#7A00F3',
  },
  currentText: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
    color: '#FF4E4E',
    letterSpacing: 1,
  },
  completedText: {
    color: '#7A00F3',
  },
  bottomSpace: {
    height: ARC_SPACING,
  },
});