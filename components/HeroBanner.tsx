import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground,
  ImageSourcePropType,
  Platform,
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Arc } from '@/data/habitsData';
import Constants from 'expo-constants';

interface HeroBannerProps {
  arc: Arc;
  dayNumber: number;
  onPrevDay: () => void;
  onNextDay: () => void;
}

// Get the status bar height for iOS
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

export default function HeroBanner({
  arc,
  dayNumber,
  onPrevDay,
  onNextDay,
}: HeroBannerProps) {
  return (
    <View style={[styles.container, { marginTop: -STATUSBAR_HEIGHT }]}>
      <ImageBackground 
        source={arc.imageUrl as ImageSourcePropType}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            'rgba(15, 15, 15, 0.8)',
            'rgba(15, 15, 15, 0.4)',
            'rgba(15, 15, 15, 0.6)',
            'rgba(15, 15, 15, 0.8)',
          ]}
          locations={[0, 0.3, 0.6, 1]}
          style={styles.gradient}
        >
          <View style={[styles.content, { paddingTop: STATUSBAR_HEIGHT + 20 }]}>
            <Text style={styles.arcName}>REBORN</Text>
            <Text style={styles.arcTitle}>{arc.name}</Text>
            
            <View style={styles.dayContainer}>
              <TouchableOpacity 
                style={styles.dayArrow} 
                onPress={onPrevDay}
              >
                <ChevronLeft color="#DCDCDC" size={24} />
              </TouchableOpacity>
              
              <Text style={styles.dayText}>DAY {dayNumber}</Text>
              
              <TouchableOpacity 
                style={styles.dayArrow} 
                onPress={onNextDay}
              >
                <ChevronRight color="#DCDCDC" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 320,
    width: '100%',
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  arcName: {
    color: '#FFFFFF',
    fontFamily: 'Rajdhani-Bold',
    fontSize: 42,
    letterSpacing: 6,
    marginBottom: 12,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  arcTitle: {
    color: '#FF4E4E',
    fontFamily: 'SpaceMono-Regular',
    fontSize: 16,
    letterSpacing: 2,
    marginBottom: 24,
    textShadowColor: 'rgba(255, 78, 78, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayArrow: {
    padding: 8,
  },
  dayText: {
    color: '#DCDCDC',
    fontFamily: 'Rajdhani-Bold',
    fontSize: 24,
    marginHorizontal: 20,
    letterSpacing: 2,
    textShadowColor: 'rgba(220, 220, 220, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
});