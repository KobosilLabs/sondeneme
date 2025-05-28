import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Dimensions 
} from 'react-native';
import { Activity, BookOpen, Dumbbell, Coffee, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface HabitCardProps {
  id: string;
  name: string;
  category: 'training' | 'meditation' | 'diet' | 'reading' | 'other';
  completed: boolean;
  progress: number;
  streak: number;
  onToggle: (id: string) => void;
}

const { width } = Dimensions.get('window');

export default function HabitCard({
  id,
  name,
  category,
  completed,
  progress,
  streak,
  onToggle
}: HabitCardProps) {
  // Animation value for progress bar
  const progressAnim = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progress]);
  
  const renderIcon = () => {
    const iconProps = { 
      size: 24, 
      color: completed ? '#7A00F3' : '#DCDCDC',
      strokeWidth: 1.5 
    };
    
    switch (category) {
      case 'training':
        return <Dumbbell {...iconProps} />;
      case 'meditation':
        return <Activity {...iconProps} />;
      case 'diet':
        return <Coffee {...iconProps} />;
      case 'reading':
        return <BookOpen {...iconProps} />;
      default:
        return <Heart {...iconProps} />;
    }
  };
  
  const cardBgColor = completed 
    ? 'rgba(122, 0, 243, 0.08)' 
    : 'rgba(30, 30, 30, 0.8)';

  const borderColor = completed 
    ? 'rgba(122, 0, 243, 0.5)' 
    : 'rgba(90, 90, 90, 0.5)';

  return (
    <TouchableOpacity 
      style={[styles.container, { borderColor }]} 
      onPress={() => onToggle(id)}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={[cardBgColor, cardBgColor]}
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            {renderIcon()}
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.streakText}>
              {streak > 0 ? `${streak} DAY STREAK` : 'START STREAK'}
            </Text>
            
            <View style={styles.progressBarContainer}>
              <Animated.View 
                style={[
                  styles.progressBar, 
                  { 
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%']
                    }),
                    backgroundColor: completed ? '#7A00F3' : '#FF4E4E'
                  }
                ]} 
              />
            </View>
          </View>
          
          <View style={styles.statusContainer}>
            <Text style={[
              styles.statusText,
              { color: completed ? '#7A00F3' : '#5A5A5A' }
            ]}>
              {completed ? 'DONE' : 'TODO'}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    width: width - 40, // Full width minus padding
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  gradient: {
    borderRadius: 12,
  },
  contentContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(15, 15, 15, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 18,
    color: '#DCDCDC',
    marginBottom: 4,
  },
  streakText: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 10,
    color: '#FF4E4E',
    marginBottom: 8,
    letterSpacing: 1,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#1E1E1E',
    borderRadius: 2,
    overflow: 'hidden',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  statusContainer: {
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontFamily: 'SpaceMono-Bold',
    fontSize: 12,
    letterSpacing: 1,
  },
});